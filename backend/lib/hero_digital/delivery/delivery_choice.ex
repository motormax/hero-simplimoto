defmodule HeroDigital.Delivery.DeliveryChoice do
  use Ecto.Schema
  import Ecto.Changeset


  schema "delivery_choices" do
    field :pickup_location, :string
    belongs_to :address, HeroDigital.UserData.Address
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(delivery_choice, attrs) do
    changeset = delivery_choice
                |> cast(attrs, [:pickup_location, :address_id, :lead_id])
                |> validate_required([:lead_id])
    cond do
      !get_field(changeset, :address_id) && !get_field(changeset, :pickup_location) ->
        changeset
        |> add_error(:delivery_choice, "Delivery choice without address and without pickup location")
      get_field(changeset, :address_id) && get_field(changeset, :pickup_location) ->
        changeset
        |> add_error(:delivery_choice, "Delivery choice with both address and pickup location")
      true ->
        changeset
    end
  end
end
