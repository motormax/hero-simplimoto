defmodule HeroDigital.DateYourBike.DateAppointment do
  use Ecto.Schema
  import Ecto.Changeset


  schema "date_appointments" do
    field :date, :date
    field :shift, :string
    field :name, :string
    field :email, :string
    belongs_to :address, HeroDigital.UserData.Address
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(date_appointment, attrs) do
    date_appointment
    |> cast(attrs, [:date, :shift, :name, :email, :address_id, :lead_id])
    |> validate_required([:date, :shift, :name, :email, :address_id, :lead_id])
  end
end
