defmodule HeroDigital.Product.Accessory do
  use Ecto.Schema
  import Ecto.Changeset


  schema "accessories" do
    field :description, :string
    field :logo_url, :string
    field :name, :string
    field :price, :decimal
    many_to_many :leads, HeroDigital.Identity.Lead, join_through: "leads_accessories", on_replace: :delete, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(accessory, attrs) do
    attr_names = [:name, :price, :description, :logo_url]
    accessory
    |> cast(attrs, attr_names)
    |> validate_required(attr_names)
  end

  def add_new_accessories_to_lead_changeset(lead, accessories) do
    put_accessories_assoc_to_lead_changeset(lead, lead.accessories ++ accessories)
  end

  def put_accessories_assoc_to_lead_changeset(lead, accessories) do
    lead
    |> change()
    |> put_assoc(:accessories, accessories)
  end
end
