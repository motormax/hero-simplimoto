defmodule HeroDigital.PlateRegistrationTest do
  use HeroDigital.DataCase

  alias HeroDigital.PlateRegistration
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle
  alias Decimal

  @personal_plate_registration "personalPlateRegistration"
  @hero_plate_registration "heroPlateRegistration"

  describe "plate_registration_data" do
    alias HeroDigital.PlateRegistration.PlateRegistrationData

    def plate_registration_data_fixture(attrs \\ %{}) do
      {:ok, plate_registration_data} =
        attrs
        |> PlateRegistration.create_plate_registration_data()

      plate_registration_data
    end

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
    @personal_plate_registration_type %{"name" => @personal_plate_registration, "price" => Decimal.new(0)}
    @hero_plate_registration_type %{"name" => @hero_plate_registration, "price" => Decimal.new(1000)}

    @valid_hero_plate_registration_attrs %{
      "personal_data" => @personal_data,
      "email" => @email,
      "phone" => @phone,
      "front_dni_image" => @dni_image,
      "back_dni_image" => @dni_image,
      "address" => @address,
      "opt_in_or_out" => @hero_plate_registration,
    }

    @valid_personal_plate_registration_attrs %{ "opt_in_or_out" => @personal_plate_registration }

    def personal_plate_registration do
      @valid_hero_plate_registration_attrs
    end

    setup do
      {:ok, personal_plate_registration_type} = PlateRegistration.create_plate_registration_type(@personal_plate_registration_type)
      {:ok, hero_plate_registration_type} = PlateRegistration.create_plate_registration_type(@hero_plate_registration_type)
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    test "list_plate_registration_data/0 returns all plate_registration_data", %{lead: lead} do
      attrs = Map.put(@valid_hero_plate_registration_attrs, "lead_id", lead.id)
      plate_registration_data = plate_registration_data_fixture(attrs)
      assert PlateRegistration.list_plate_registration_data() == [plate_registration_data]
    end

    test "get_plate_registration_data!/1 returns the plate_registration_data with given id", %{lead: lead} do
      attrs = Map.put(@valid_hero_plate_registration_attrs, "lead_id", lead.id)
      plate_registration_data = plate_registration_data_fixture(attrs)
      assert PlateRegistration.get_plate_registration_data!(plate_registration_data.id) == plate_registration_data
    end

    test "create_plate_registration_data/1 with valid data and opt_in_ot_out as hero_insurance
    creates a plate_registration_data with all fields non nil", %{lead: lead} do
      attrs = Map.put(@valid_hero_plate_registration_attrs, "lead_id", lead.id)
      assert {:ok, %PlateRegistrationData{} = plate_registration_data} = PlateRegistration.create_plate_registration_data(attrs)
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
      assert plate_registration_data.plate_registration_type.name == @hero_plate_registration_type["name"]
      assert plate_registration_data.plate_registration_type.price == @hero_plate_registration_type["price"]
    end

    test "create_plate_registration_data/1 with valid data and opt_in_ot_out as personal_insurance
    creates a plate_registration_data with fields opt_in_or_out and lead_id as non nil", %{lead: lead} do
      attrs = Map.put(@valid_personal_plate_registration_attrs, "lead_id", lead.id)
      assert {:ok, %PlateRegistrationData{} = plate_registration_data} = PlateRegistration.create_plate_registration_data(attrs)
      assert plate_registration_data.lead_id == lead.id
      assert plate_registration_data.email_id == nil
      assert plate_registration_data.phone_id == nil
      assert plate_registration_data.personal_data_id == nil
      assert plate_registration_data.address_id == nil
      assert plate_registration_data.plate_registration_type.name == @personal_plate_registration_type["name"]
      assert plate_registration_data.plate_registration_type.price == @personal_plate_registration_type["price"]
    end

    test "when a lead choose a hero plate registration option and then chooses a personal plate registratrion option,
    the first one gets erased and the last one is in the db", %{lead: lead} do
      hero_plate_registration_attrs = Map.put(@valid_hero_plate_registration_attrs, "lead_id", lead.id)
      assert {:ok, %PlateRegistrationData{} = hero_plate_registration_data} = PlateRegistration.create_plate_registration_data(hero_plate_registration_attrs)

      personal_plate_registration_attrs = Map.put(@valid_personal_plate_registration_attrs, "lead_id", lead.id)
      assert {:ok, %PlateRegistrationData{} = personal_plate_registration_data} = PlateRegistration.create_plate_registration_data(personal_plate_registration_attrs)

      refute personal_plate_registration_data.id == hero_plate_registration_data.id
      assert PlateRegistration.get_plate_registration_data!(personal_plate_registration_data.id) == personal_plate_registration_data
      assert_raise(Ecto.NoResultsError, fn -> PlateRegistration.get_plate_registration_data!(hero_plate_registration_data.id) end)
      assert PlateRegistration.list_plate_registration_data() == [personal_plate_registration_data]
    end

    test "when a lead choose a personal plate registration option and then chooses a hero plate registratrion option,
    the first one gets erased and the last one is in the db", %{lead: lead} do
      personal_plate_registration_attrs = Map.put(@valid_personal_plate_registration_attrs, "lead_id", lead.id)
      assert {:ok, %PlateRegistrationData{} = personal_plate_registration_data} = PlateRegistration.create_plate_registration_data(personal_plate_registration_attrs)

      hero_plate_registration_attrs = Map.put(@valid_hero_plate_registration_attrs, "lead_id", lead.id)
      assert {:ok, %PlateRegistrationData{} = hero_plate_registration_data} = PlateRegistration.create_plate_registration_data(hero_plate_registration_attrs)

      refute personal_plate_registration_data.id == hero_plate_registration_data.id
      assert PlateRegistration.get_plate_registration_data!(hero_plate_registration_data.id) == hero_plate_registration_data
      assert_raise(Ecto.NoResultsError, fn -> PlateRegistration.get_plate_registration_data!(personal_plate_registration_data.id) end)
      assert PlateRegistration.list_plate_registration_data() == [hero_plate_registration_data]
    end

    test "create_plate_registration_data/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = PlateRegistration.create_plate_registration_data()
    end
  end

  describe "plate_registration_types" do
    alias HeroDigital.PlateRegistration.PlateRegistrationType

    def plate_registration_type_fixture(attrs \\ %{}) do
      {:ok, plate_registration_type} =
        attrs
        |> PlateRegistration.create_plate_registration_type()

      plate_registration_type
    end

    @valid_price Decimal.new(1000)
    @valid_plate_registration_type %{
      "name" => @hero_plate_registration,
      "price" => @valid_price
    }
    @invalid_price Decimal.new(-1)
    @invalid_plate_registration_type %{
      "name" => @hero_plate_registration,
      "price" => @invalid_price
    }

    test "list_plate_registration_types/0 returns all plate_registration_types" do
      plate_registration_type = plate_registration_type_fixture(@valid_plate_registration_type)
      assert PlateRegistration.list_plate_registration_types() == [plate_registration_type]
    end

    test "get_plate_registration_type!/1 returns the plate_registration_type with given id" do
      plate_registration_type = plate_registration_type_fixture(@valid_plate_registration_type)
      assert PlateRegistration.get_plate_registration_type!(plate_registration_type.id) == plate_registration_type
    end

    test "create_plate_registration_type/1 with valid data creates a plate_registration_type" do
      assert {:ok, %PlateRegistrationType{} = plate_registration_type} = PlateRegistration.create_plate_registration_type(@valid_plate_registration_type)

      assert plate_registration_type.name == @hero_plate_registration
      assert plate_registration_type.price == @valid_price
    end

    test "create_plate_registration_type/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = PlateRegistration.create_plate_registration_type(@invalid_plate_registration_type)
    end

    test "update_plate_registration_type/2 with valid data updates the plate_registration_type" do
      valid_updated_price = %{"price" => Decimal.new(2000)}
      plate_registration_type = plate_registration_type_fixture(@valid_plate_registration_type)
      assert {:ok, plate_registration_type} = PlateRegistration.update_plate_registration_type(plate_registration_type, valid_updated_price)

      assert %PlateRegistrationType{} = plate_registration_type
      assert plate_registration_type.price == valid_updated_price["price"]
      assert plate_registration_type.name == @valid_plate_registration_type["name"]
    end

    test "update_plate_registration_type/2 with invalid data returns error changeset" do
      invalid_updated_price = %{"price" => @invalid_price}
      plate_registration_type = plate_registration_type_fixture(@valid_plate_registration_type)
      assert {:error, %Ecto.Changeset{}} = PlateRegistration.update_plate_registration_type(plate_registration_type, invalid_updated_price)

      assert plate_registration_type == PlateRegistration.get_plate_registration_type!(plate_registration_type.id)
    end

    test "delete_plate_registration_type/1 deletes the plate_registration_type" do
      plate_registration_type = plate_registration_type_fixture(@valid_plate_registration_type)
      assert {:ok, %PlateRegistrationType{}} = PlateRegistration.delete_plate_registration_type(plate_registration_type)
      assert_raise Ecto.NoResultsError, fn -> PlateRegistration.get_plate_registration_type!(plate_registration_type.id) end
    end
  end
end
