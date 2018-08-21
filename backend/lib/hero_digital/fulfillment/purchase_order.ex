defmodule HeroDigital.Fulfillment.PurchaseOrder do
  use Ecto.Schema
  import Ecto.Changeset


  schema "purchase_orders" do
    field :email, :string
    field :lead_id, Ecto.UUID
    field :phone, :string
    field :price, :integer

    timestamps()
  end

  @doc false
  def changeset(purchase_order, lead, attrs) do
    purchase_order
    |> cast(attrs, [:price, :phone, :email])
    # |> validate_required([:price, :phone, :email])
    |> put_change(:lead_id, lead.id)
  end
end
