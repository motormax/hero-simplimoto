defmodule HeroDigital.DateYourBike.DateAppointment do
  use Ecto.Schema
  import Ecto.Changeset


  schema "date_appointments" do
    field :date, :date
    field :shift, :string
    belongs_to :address, HeroDigital.UserData.Address
    belongs_to :user, HeroDigital.Identity.User, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(date_appointment, attrs) do
    date_appointment
    |> cast(attrs, [:date, :shift, :address_id, :user_id])
    |> validate_required([:date, :shift, :user_id, :address_id])
  end
end
