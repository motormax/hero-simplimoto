defmodule HeroDigital.UserData.DeliveryData do
  use Ecto.Schema
  import Ecto.Changeset


  schema "delivery_data" do
    field :address, :string
    field :postal_code, :string
    field :telephone_number, :string
    field :town, :string

    timestamps()
  end

  @doc false
  def changeset(delivery_data, attrs) do
    delivery_data
    |> cast(attrs, [:address, :town, :postal_code, :telephone_number])
    |> validate_required([:address, :town, :postal_code, :telephone_number])
  end
end
