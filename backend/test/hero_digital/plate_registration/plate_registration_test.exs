defmodule HeroDigital.PlateRegistrationTest do
  use HeroDigital.DataCase

  alias HeroDigital.PlateRegistration
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  describe "plate_registration_data" do
    alias HeroDigital.PlateRegistration.PlateRegistrationData

    def plate_registration_data_fixture(attrs \\ %{}) do
      {:ok, plate_registration_data} =
        attrs
        |> PlateRegistration.create_plate_registration_data()

      plate_registration_data
    end

    @personal_plate_registration "personalPlateRegistration"
    @hero_plate_registration "heroPlateRegistration"

    @personal_data %{"dni" => "some dni", "last_name" => "some last_name", "name" => "some name"}
    @dni_image %{
      "name" => "file.png",
      "type" => "image/png",
      "data" => "YW5vdGhlciBpbWFnZQ==",
    }
    @email "some email"
    @phone "some phone"
    @address %{
      "complements" => "some complements",
      "number" => "some number",
      "postal_code" => "some postal_code",
      "street" => "some street",
      "telephone_number" => "some telephone_number",
      "town" => "some town"
    }

    @valid_attrs %{
      "personal_data" => @personal_data,
      "email" => @email,
      "phone" => @phone,
      "front_dni_image" => @dni_image,
      "back_dni_image" => @dni_image,
      "address" => @address
    }

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    test "list_plate_registration_data/0 returns all plate_registration_data", %{lead: lead} do
      attrs = Map.put(@valid_attrs, "lead_id", lead.id)
      plate_registration_data = plate_registration_data_fixture(attrs)
      assert PlateRegistration.list_plate_registration_data() == [plate_registration_data]
    end

    test "get_plate_registration_data!/1 returns the plate_registration_data with given id", %{lead: lead} do
      attrs = Map.put(@valid_attrs, "lead_id", lead.id)
      plate_registration_data = plate_registration_data_fixture(attrs)
      assert PlateRegistration.get_plate_registration_data!(plate_registration_data.id) == plate_registration_data
    end

    test "create_plate_registration_data/1 with valid data and opt_in_ot_out as hero_insurance
    creates a plate_registration_data with all fields non nil", %{lead: lead} do
      attrs = Map.put(@valid_attrs, "lead_id", lead.id)
      attrs = Map.put(attrs, "opt_in_or_out", @hero_plate_registration)
      assert {:ok, %PlateRegistrationData{} = plate_registration_data} = PlateRegistration.create_plate_registration_data(attrs)
      assert plate_registration_data.opt_in_or_out == @hero_plate_registration
      assert plate_registration_data.lead_id == lead.id
      assert plate_registration_data.email.email == @email
      assert plate_registration_data.phone.phone == @phone
      assert plate_registration_data.personal_data.dni == @personal_data["dni"]
      assert plate_registration_data.personal_data.name == @personal_data["name"]
      assert plate_registration_data.personal_data.last_name == @personal_data["last_name"]
      assert plate_registration_data.address.complements == @address["complements"]
      assert plate_registration_data.address.number == @address["number"]
      assert plate_registration_data.address.postal_code == @address["postal_code"]
      assert plate_registration_data.address.street == @address["street"]
      assert plate_registration_data.address.telephone_number == @address["telephone_number"]
      assert plate_registration_data.address.town == @address["town"]
    end

    test "create_plate_registration_data/1 with valid data and opt_in_ot_out as personal_insurance
    creates a plate_registration_data with fields opt_in_or_out and lead_id as non nil", %{lead: lead} do
      attrs = Map.put(@valid_attrs, "lead_id", lead.id)
      attrs = Map.put(attrs, "opt_in_or_out", @personal_plate_registration)
      assert {:ok, %PlateRegistrationData{} = plate_registration_data} = PlateRegistration.create_plate_registration_data(attrs)
      IO.inspect(plate_registration_data)
      assert plate_registration_data.opt_in_or_out == @personal_plate_registration
      assert plate_registration_data.lead_id == lead.id
      assert plate_registration_data.email == nil
      assert plate_registration_data.phone == nil
      assert plate_registration_data.personal_data == nil
      assert plate_registration_data.personal_data == nil
      assert plate_registration_data.personal_data == nil
      assert plate_registration_data.address == nil
      assert plate_registration_data.address == nil
      assert plate_registration_data.address == nil
      assert plate_registration_data.address == nil
      assert plate_registration_data.address == nil
      assert plate_registration_data.address == nil
    end

    test "create_plate_registration_data/1 with invalid data returns error changeset" do
      invalid_attrs = %{
        "lead_id" => nil,
        "personal_data" => nil,
        "email" => nil,
        "phone" => nil,
        "front_dni_image" => nil,
        "back_dni_image" => nil,
        "address" => nil
      }
      assert {:error, %Ecto.Changeset{}} = PlateRegistration.create_plate_registration_data(invalid_attrs)
    end
  end
end
