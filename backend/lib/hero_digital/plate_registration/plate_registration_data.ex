defmodule HeroDigital.PlateRegistration.PlateRegistrationData do
  use Ecto.Schema
  import Ecto.Changeset


  schema "plate_registration_data" do
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID
    belongs_to :personal_data, HeroDigital.UserData.PersonalData
    belongs_to :email, HeroDigital.UserData.Email
    belongs_to :phone, HeroDigital.UserData.Phone
    belongs_to :front_dni_image, HeroDigital.UserData.Image
    belongs_to :back_dni_image, HeroDigital.UserData.Image

    timestamps()
  end

  @doc false
  def changeset(plate_registration_data, attrs) do
    attributes = [:lead_id, :personal_data_id, :email_id, :phone_id, :front_dni_image_id, :back_dni_image_id]
    plate_registration_data
    |> cast(attrs, attributes)
    |> validate_required(attributes)
  end
end
