defmodule HeroDigital.Fulfillment do
  @moduledoc """
  The Fulfillment context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Identity.Lead
  alias HeroDigital.Fulfillment.PurchaseOrder

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
  def create_purchase_order_from_lead(%Lead{} = lead, attrs \\ %{}) do
    changeset = %PurchaseOrder{}
      |> PurchaseOrder.changeset(lead, attrs)

    if changeset.valid? do
      Repo.delete!(lead)
      changeset |> Repo.insert()
    else
      {:error, changeset}
    end
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
