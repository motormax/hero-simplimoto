defmodule HeroDigital.Delivery.DeliveryChoice do
  use Ecto.Schema
  import Ecto.Changeset


  schema "delivery_choices" do
    field :pickup_location, :integer
    belongs_to :address, HeroDigital.UserData.Address

    timestamps()
  end

  @doc false
  def changeset(delivery_choice, attrs) do
    delivery_choice
    |> cast(attrs, [:pickup_location])
    |> validate_required([:pickup_location])
  end
end
