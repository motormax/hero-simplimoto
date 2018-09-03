defmodule HeroDigital.Product.Accessory do
  use Ecto.Schema
  import Ecto.Changeset


  schema "accessories" do
    field :description, :string
    field :logo_url, :string
    field :name, :string
    field :price, :decimal
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(accessory, attrs) do
    attr_names = [:name, :price, :description, :logo_url, :lead_id]
    accessory
    |> cast(attrs, attr_names)
    |> validate_required(attr_names)
  end
end
