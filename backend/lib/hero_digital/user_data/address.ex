defmodule HeroDigital.UserData.Address do
  use Ecto.Schema
  import Ecto.Changeset


  schema "addresses" do
    field :complements, :string
    field :number, :string
    field :postal_code, :string
    field :street, :string
    field :telephone_number, :string
    field :town, :string
    belongs_to :user, HeroDigital.Identity.User

    timestamps()
  end

  @doc false
  def changeset(address, attrs) do
    address
    |> cast(attrs, [:street, :number, :complements, :town, :postal_code, :telephone_number])
    |> validate_required([:street, :number, :town, :postal_code, :telephone_number])
  end
end
