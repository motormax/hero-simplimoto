defmodule HeroDigital.Product.Motorcycle do
  use Ecto.Schema
  import Ecto.Changeset


  schema "motorcycles" do
    field :name, :string
    field :price, :integer

    timestamps()
  end

  @doc false
  def changeset(motorcycle, attrs) do
    motorcycle
    |> cast(attrs, [:name, :price])
    |> validate_required([:name, :price])
  end
end
