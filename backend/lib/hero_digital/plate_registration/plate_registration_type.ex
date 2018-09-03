defmodule HeroDigital.PlateRegistration.PlateRegistrationType do
  use Ecto.Schema
  import Ecto.Changeset

  schema "plate_registration_types" do
    field :name, :string
    field :price, :decimal

    timestamps()
  end

  def changeset(plate_registration_type, attrs) do
    attributes = [:name, :price]
    plate_registration_type
    |> cast(attrs, attributes)
    |> validate_required(attributes)
    |> validate_positive_price()
  end

  defp validate_positive_price(changeset) do
    if changeset.valid? and Decimal.cmp(get_field(changeset, :price), 0) == :lt do
      add_error(changeset, :price, "Price should be greater or equal than zero.")
    else
      changeset
    end
  end

  def personal_plate_registration_tag() do
    "personalPlateRegistration"
  end

  def hero_plate_registration_tag() do
    "heroPlateRegistration"
  end
end
