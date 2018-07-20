defmodule HeroDigital.PlateRegistrationTest do
  use HeroDigital.DataCase

  alias HeroDigital.PlateRegistration
  alias HeroDigital.Identity

  describe "plate_registration_data" do
    alias HeroDigital.PlateRegistration.PlateRegistrationData

    def plate_registration_data_fixture(attrs \\ %{}) do
      {:ok, plate_registration_data} =
        attrs
        |> PlateRegistration.create_plate_registration_data()

      plate_registration_data
    end

    @personal_data %{"dni" => "some dni", "last_name" => "some last_name", "name" => "some name"}
    @email "some email"
    @phone "some phone"

    setup do
      {:ok, lead} = Identity.create_lead()
      %{lead: lead, personal_data: @personal_data, email: @email, phone: @phone}
    end

    test "list_plate_registration_data/0 returns all plate_registration_data", %{lead: lead, personal_data: personal_data, email: email, phone: phone} do
      attrs = %{"lead_id" => lead.id, "personal_data" => personal_data, "email" => email, "phone" => phone}
      plate_registration_data = plate_registration_data_fixture(attrs)
      assert PlateRegistration.list_plate_registration_data() == [plate_registration_data]
    end

    test "get_plate_registration_data!/1 returns the plate_registration_data with given id", %{lead: lead, personal_data: personal_data, email: email, phone: phone} do
      attrs = %{"lead_id" => lead.id, "personal_data" => personal_data, "email" => email, "phone" => phone}
      plate_registration_data = plate_registration_data_fixture(attrs)
      assert PlateRegistration.get_plate_registration_data!(plate_registration_data.id) == plate_registration_data
    end

    test "create_plate_registration_data/1 with valid data creates a plate_registration_data", %{lead: lead, personal_data: personal_data, email: email, phone: phone} do
      attrs = %{"lead_id" => lead.id, "personal_data" => personal_data, "email" => email, "phone" => phone}
      assert {:ok, %PlateRegistrationData{} = plate_registration_data} = PlateRegistration.create_plate_registration_data(attrs)
      assert plate_registration_data.email.email == email
      assert plate_registration_data.phone.phone == phone
      assert plate_registration_data.personal_data.dni == personal_data["dni"]
      assert plate_registration_data.personal_data.name == personal_data["name"]
      assert plate_registration_data.personal_data.last_name == personal_data["last_name"]
    end

    test "create_plate_registration_data/1 with invalid data returns error changeset" do
      invalid_attrs = %{"lead_id" => nil, "personal_data" => nil, "email" => nil, "phone" => nil}
      assert {:error, %Ecto.Changeset{}} = PlateRegistration.create_plate_registration_data(invalid_attrs)
    end
  end
end
