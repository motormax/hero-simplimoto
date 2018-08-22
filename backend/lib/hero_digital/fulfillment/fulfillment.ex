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
  def create_purchase_order_from_lead(%Lead{} = lead, credit_card_token) do
    Logger.info "Creating Purchase Order"

    changeset = %PurchaseOrder{}
      |> PurchaseOrder.changeset(lead, %{})

    Logger.debug "Purchase Order changeset #{inspect(changeset)}"

    if changeset.valid? do
      Logger.info "Delete Lead"
      {:ok, lead} = Identity.deactivate_lead(lead)

      Logger.info "Insert Purchase Order"
      with {:ok, purchase_order} <- Repo.insert(changeset),
           {:ok, mp_response} <- PaymentGateway.process_payment(credit_card_token),
           {:ok, payment} <- create_payment_for(purchase_order, mp_response) do
          {:ok, purchase_order}
      end
    else
      {:error, changeset}
    end
  end

  def create_payment_for(%PurchaseOrder{} = purchase_order, mp_response) do
    %Payment{}
    |> Payment.changeset(%{
      status: mp_response["status"],
      status_detail: mp_response["status_detail"],
      purchase_order_id: purchase_order.id,
      transaction_id: mp_response["id"],
      raw_body: Poison.encode!(mp_response)
    })
    |> Repo.insert()
  end

  @doc """
  Deletes a PurchaseOrder.

  ## Examples

      iex> delete_purchase_order(purchase_order)
      {:ok, %PurchaseOrder{}}

      iex> delete_purchase_order(purchase_order)
      {:error, %Ecto.Changeset{}}

  """
  def delete_purchase_order(%PurchaseOrder{} = purchase_order) do
    Repo.delete(purchase_order)
  end
end
