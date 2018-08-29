defmodule HeroDigital.Identity.Lead do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}

  schema "leads" do
    field :last_login, :utc_datetime
    field :is_active, :boolean
    belongs_to(:motorcycle, HeroDigital.Product.Motorcycle)

    has_one :financing_data, HeroDigital.Financing.FinancingData
    has_one :insurance_choice, HeroDigital.Insurance.InsuranceChoice
    has_one :delivery_choice, HeroDigital.Delivery.DeliveryChoice
    has_one :plate_registration_data, HeroDigital.PlateRegistration.PlateRegistrationData

    timestamps()
  end

  def deactivation_changeset(lead) do
    lead
    |> changeset(%{})
    |> put_change(:is_active, false)
  end

  @doc false
  def changeset(lead, attrs) do
    lead
    |> cast(attrs, [:motorcycle_id])
    |> assoc_constraint(:motorcycle)
    |> validate_required([:motorcycle_id])
    |> put_change(:last_login, DateTime.utc_now)
    |> put_change(:is_active, true)
  end
end
