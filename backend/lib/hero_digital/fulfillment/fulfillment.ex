defmodule HeroDigital.Fulfillment do
  @moduledoc """
  The Fulfillment context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Identity.Lead
  alias HeroDigital.Identity
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
    Repo.one(from p in PurchaseOrder, where: p.lead_id == ^lead_id, order_by: [desc: p.inserted_at], limit: 1)
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

      # case PaymentGateway.process_payment(purchase_order) do
      #   {:payment_error, response} ->
      #     #  crear un payment con la response fallido
      #   {:ok, mp_response} ->
      #     # crear un payment success
      #   {:payment_error, }
      # end
      with {:ok, mp_response} <- PaymentGateway.process_payment(purchase_order),
           {:ok, payment} <- create_payment_for(purchase_order, mp_response),
           {:ok, lead} <- Identity.deactivate_lead(lead) do
            {:ok, load_purchase_order_with_payment(purchase_order)}
      else
        {:payment_error, mp_response} ->
           create_failed_payment_for(purchase_order, mp_response)
          {:payment_error, load_purchase_order_with_payment(purchase_order)}
      end
    else
      {:error, changeset}
    end
  end

  def load_purchase_order_with_payment(purchase_order) do
    po = Repo.preload(purchase_order, :payment)
    Logger.debug "purchase order to return #{inspect(po.payment.status)}"
    po
  end

  def create_purchase_order(changeset) do
    Logger.info "Processing Purchase Order"
    {:ok, purchase_order} = Repo.insert(changeset)
    purchase_order |> Repo.preload(lead: :motorcycle)
  end

  defp build_purchase_order_changeset(lead, payment_params) do
    Logger.info "Creating Purchase Order"

    purchase_order_data = %{
      email: payment_params["email"],
      payment_method: "credit_card",
      payment_method_token: payment_params["credit_card_token"],
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
