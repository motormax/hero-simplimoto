defmodule HeroDigital.Product.Accessory do
  use Ecto.Schema
  import Ecto.Changeset


  schema "accessories" do
    field :description, :string
    field :logo_url, :string
    field :name, :string
    field :price, :decimal
    many_to_many :leads, HeroDigital.Identity.Lead, join_through: "leads_accessories"

    timestamps()
  end

  @doc false
  def changeset(accessory, attrs) do
    attr_names = [:name, :price, :description, :logo_url]
    accessory
    |> cast(attrs, attr_names)
    |> validate_required(attr_names)
  end
end
