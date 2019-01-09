defmodule HeroDigital.Fulfillment do
  @moduledoc """
  The Fulfillment context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Identity.Lead
  alias HeroDigital.Identity
  alias HeroDigital.Financing
  alias HeroDigital.Fulfillment.PurchaseOrder
  alias HeroDigital.Payment.PaymentGateway
  alias HeroDigital.Payment.Payment

  require Logger

  @doc """
  Gets a single purchase_order.

  Raises `Ecto.NoResultsError` if the Purchase order does not exist.

  ## Examples

      iex> get_purchase_order!(123)
      %PurchaseOrder{}

      iex> get_purchase_order!(456)
      ** (Ecto.NoResultsError)

  """
  def get_purchase_order_for_lead(lead_id) do
    purchase_order = Repo.one(from p in PurchaseOrder, where: p.lead_id == ^lead_id, order_by: [desc: p.inserted_at], limit: 1)
    Repo.preload(purchase_order, [:payment])
  end

  @doc """
  Creates a purchase_order.

  ## Examples

      iex> create_purchase_order(%{field: value})
      {:ok, %PurchaseOrder{}}

      iex> create_purchase_order(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_purchase_order_from_lead(%Lead{} = lead, payment_params) do
    changeset = build_purchase_order_changeset(lead, payment_params)

    if changeset.valid? do
      purchase_order = create_purchase_order(changeset)

      case purchase_order.provider do
        "MERCADOPAGO" -> handle_payment(lead, purchase_order)
        _ -> send_confirmation_email(purchase_order)
      end
    else
      {:error, changeset}
    end
  end

  def load_purchase_order_with_lead_and_associations(purchase_order) do
    Repo.preload(purchase_order, lead: [accessories: [], motorcycle: [], plate_registration_data: [], insurance_choice: [], delivery_choice: [address: []]])
  end

  def load_purchase_order_with_payment(purchase_order) do
    if purchase_order.provider == "MERCADOPAGO" do
      po = Repo.preload(purchase_order, :payment)
      Logger.debug "purchase order to return #{inspect(po.payment.status)}"
      po
    else
      purchase_order
    end
  end

  def create_purchase_order(changeset) do
    Logger.info "Processing Purchase Order"
    {:ok, purchase_order} = Repo.insert(changeset)
    purchase_order |> Repo.preload(lead: :motorcycle)
  end

  defp send_confirmation_email(purchase_order) do
    order_with_associations = load_purchase_order_with_payment(purchase_order)
    |> load_purchase_order_with_lead_and_associations

    HeroDigital.Mailer.send_successful_purcharse_mail(order_with_associations)

    {:ok, order_with_associations}
  end

  defp handle_payment(lead, purchase_order) do
    with {:ok, mp_response} <- PaymentGateway.process_payment(purchase_order),
         {:ok, payment} <- create_payment_for(purchase_order, mp_response),
         {:ok, lead} <- Identity.deactivate_lead(lead) do
      send_confirmation_email(purchase_order)
    else
      {:payment_error, mp_response} ->
        create_failed_payment_for(purchase_order, mp_response)
        {:payment_error, load_purchase_order_with_payment(purchase_order)}
    end
  end

  defp build_purchase_order_changeset(lead, payment_params) do
    Logger.info "Creating Purchase Order"
    financing_data = Financing.get_financing_data_by_lead_id(lead.id)

    purchase_order_data = %{
      email: payment_params["email"],
      full_name: payment_params["full_name"],
      phone: payment_params["phone"],
      payment_method: "credit_card",
      payment_method_token: payment_params["credit_card_token"],
      provider: financing_data.provider
    }

    changeset = %PurchaseOrder{}
      |> PurchaseOrder.changeset(lead, purchase_order_data)

    Logger.debug "Purchase Order changeset #{inspect(changeset)}"
    changeset
  end

  defp create_payment_for(%PurchaseOrder{} = purchase_order, mp_response) do
    %Payment{}
    |> Payment.changeset(%{
      status: mp_response["status"],
      status_detail: mp_response["status_detail"],
      purchase_order_id: purchase_order.id,
      transaction_id: inspect(mp_response["id"]),
      user_message: mp_response["success_message"],
      raw_body: Poison.encode!(mp_response)
    })
    |> Repo.insert()
  end

  defp create_failed_payment_for(%PurchaseOrder{} = purchase_order, mp_response) do
    %Payment{}
    |> Payment.changeset(%{
      status: mp_response["status"],
      status_detail: mp_response["status_detail"],
      purchase_order_id: purchase_order.id,
      transaction_id: inspect(mp_response["id"]),
      user_message: mp_response["error_message"],
      raw_body: Poison.encode!(mp_response)
    })
    |> Repo.insert!()
    {:payment_error, purchase_order}
  end

  @doc """
  Deletes a PurchaseOrder.

  ## Examples

      iex> delete_purchase_order(purchase_order)
      {:ok, %PurchaseOrder{}}

      iex> delete_purchase_order(purchase_order)
      {:error, %Ecto.Changeset{}}

  """
  defp delete_purchase_order(%PurchaseOrder{} = purchase_order) do
    Repo.delete(purchase_order)
  end
end
