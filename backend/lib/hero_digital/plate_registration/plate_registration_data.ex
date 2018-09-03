defmodule HeroDigital.PlateRegistration.PlateRegistrationData do
  use Ecto.Schema
  import Ecto.Changeset

  alias HeroDigital.PlateRegistration.PlateRegistrationType

  schema "plate_registration_data" do
    field :opt_in_or_out, :string, virtual: true
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID
    belongs_to :personal_data, HeroDigital.UserData.PersonalData
    belongs_to :email, HeroDigital.UserData.Email
    belongs_to :phone, HeroDigital.UserData.Phone
    belongs_to :front_dni_image, HeroDigital.UserData.Image
    belongs_to :back_dni_image, HeroDigital.UserData.Image
    belongs_to :address, HeroDigital.UserData.Address
    belongs_to :plate_registration_type, PlateRegistrationType

    timestamps()
  end

  @doc false
  def changeset(plate_registration_data, attrs) do
    changeset = cast(plate_registration_data, attrs, ["opt_in_or_out"])
    cond do
      Map.has_key?(changeset.changes, :opt_in_or_out) and changeset.changes.opt_in_or_out == PlateRegistrationType.personal_plate_registration_tag ->
        create_personal_registration_data_changeset(plate_registration_data, attrs)
      true ->
        create_hero_registration_data_changeset(plate_registration_data, attrs)
    end
  end

  @doc false
  defp create_hero_registration_data_changeset(plate_registration_data, attrs) do
    attrs_names = [
      :lead_id,
      :personal_data_id,
      :email_id,
      :phone_id,
      :front_dni_image_id,
      :back_dni_image_id,
      :address_id,
      :plate_registration_type_id
    ]
    create_changeset_by_attrs(plate_registration_data, attrs, attrs_names)
  end

  @doc false
  defp create_personal_registration_data_changeset(plate_registration_data, attrs) do
    attrs_names = [:lead_id, :plate_registration_type_id]
    create_changeset_by_attrs(plate_registration_data, attrs, attrs_names)
  end

  @doc false
  defp create_changeset_by_attrs(plate_registration_data, attrs, attrs_names) do
    plate_registration_data
    |> cast(attrs, attrs_names)
    |> validate_required(attrs_names)
  end
end
