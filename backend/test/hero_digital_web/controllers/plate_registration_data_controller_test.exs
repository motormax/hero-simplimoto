defmodule HeroDigitalWeb.PlateRegistrationDataControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.PlateRegistration
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle
  alias Decimal

  @personal_plate_registration "personalPlateRegistration"
  @hero_plate_registration "heroPlateRegistration"
  @email "some email"
  @phone "some phone"
  @personal_data %{:dni => "some dni", :last_name => "some last_name", :name => "some name"}
  @address %{
    complements: "some complements",
    number: "some number",
    postal_code: "some postal_code",
    street: "some street",
    telephone_number: "some telephone_number",
    town: "some town"
  }
  @front_dni_image %{
    name: "file.png",
    type: "image/png",
    data: "YW4gaW1hZ2U="
  }
  @back_dni_image %{
    name: "file.png",
    type: "image/png",
    data: "YW5vdGhlciBpbWFnZQ=="
  }
  @personal_plate_registration_type %{"name" => @personal_plate_registration, "price" => Decimal.new(0)}
  @hero_plate_registration_type %{"name" => @hero_plate_registration, "price" => Decimal.new(1000)}

  def personal_plate_registration_attrs() do
    %{opt_in_or_out: @personal_plate_registration}
  end

  def hero_plate_registration_attrs do
    %{
      opt_in_or_out: @hero_plate_registration,
      personal_data: @personal_data,
      email: @email,
      phone: @phone,
      front_dni_image: @front_dni_image,
      back_dni_image: @back_dni_image,
      address: @address
    }
  end

  def fixture(:plate_registration_data) do
    {:ok, plate_registration_data} = PlateRegistration.create_plate_registration_data()
    plate_registration_data
  end

  setup do
    {:ok, personal_plate_registration_type} = PlateRegistration.create_plate_registration_type(@personal_plate_registration_type)
    {:ok, hero_plate_registration_type} = PlateRegistration.create_plate_registration_type(@hero_plate_registration_type)
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
    %{lead: lead}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create or update plate_registration_data" do
    test "renders personal_plate_registration_data when data is valid", %{lead: lead, conn: conn} do
      attrs = personal_plate_registration_attrs()
      conn = post conn, lead_plate_registration_data_path(conn, :create, lead.id), plate_registration_data: attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_plate_registration_data_path(conn, :show, lead.id)
      response = json_response(conn, 200)["data"]

      assert response["id"] == id
      assert response["opt_in_or_out"] == @personal_plate_registration
      assert response["lead_id"] == lead.id
      assert response["plate_registration_type"]["name"] == @personal_plate_registration_type["name"]
      assert Decimal.new(response["plate_registration_type"]["price"]) == @personal_plate_registration_type["price"]
      assert is_nil(response["phone"])
      assert is_nil(response["email"])
      assert is_nil(response["personal_data"])
      assert is_nil(response["address"])
    end

    test "renders hero_plate_registration_data when data is valid", %{lead: lead, conn: conn} do
      attrs = hero_plate_registration_attrs()
      conn = post conn, lead_plate_registration_data_path(conn, :create, lead.id), plate_registration_data: attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_plate_registration_data_path(conn, :show, lead.id)
      response = json_response(conn, 200)["data"]
      assert response["id"] == id
      assert response["opt_in_or_out"] == @hero_plate_registration
      assert response["lead_id"] == lead.id
      assert response["plate_registration_type"]["name"] == @hero_plate_registration_type["name"]
      assert Decimal.new(response["plate_registration_type"]["price"]) == @hero_plate_registration_type["price"]
      assert response["phone"]["phone"] == @phone
      assert response["email"]["email"] == @email
      assert response["personal_data"]["dni"] == @personal_data.dni
      assert response["personal_data"]["name"] == @personal_data.name
      assert response["personal_data"]["last_name"] == @personal_data.last_name
      assert response["address"]["complements"] == @address.complements
      assert response["address"]["number"] == @address.number
      assert response["address"]["postal_code"] == @address.postal_code
      assert response["address"]["street"] == @address.street
      assert response["address"]["telephone_number"] == @address.telephone_number
      assert response["address"]["town"] == @address.town
    end

    test "renders errors when data is invalid", %{lead: lead, conn: conn} do
      invalid_attrs = %{lead_id: lead.id, opt_in_or_out: nil, personal_data: nil, email: nil, phone: nil, address: nil}
      conn = post conn, lead_plate_registration_data_path(conn, :create, lead.id), plate_registration_data: invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "renders the updated plate_registration_data when a new one is chosen and the data is valid", %{lead: lead, conn: conn} do
      conn = post conn, lead_plate_registration_data_path(conn, :create, lead.id), plate_registration_data: personal_plate_registration_attrs()
      personal_plate_registration_response = json_response(conn, 201)["data"]

      conn = post conn, lead_plate_registration_data_path(conn, :create, lead.id), plate_registration_data: hero_plate_registration_attrs()
      hero_plate_registration_response = json_response(conn, 201)["data"]

      refute personal_plate_registration_response["id"] == hero_plate_registration_response["id"]
      refute personal_plate_registration_response == hero_plate_registration_response
      assert hero_plate_registration_response["lead_id"] == lead.id
      assert hero_plate_registration_response["opt_in_or_out"] == @hero_plate_registration
      assert hero_plate_registration_response["plate_registration_type"]["name"] == @hero_plate_registration_type["name"]
      assert Decimal.new(hero_plate_registration_response["plate_registration_type"]["price"]) == @hero_plate_registration_type["price"]
      assert hero_plate_registration_response["phone"]["phone"] == @phone
      assert hero_plate_registration_response["email"]["email"] == @email
      assert hero_plate_registration_response["personal_data"]["dni"] == @personal_data.dni
      assert hero_plate_registration_response["personal_data"]["name"] == @personal_data.name
      assert hero_plate_registration_response["personal_data"]["last_name"] == @personal_data.last_name
      assert hero_plate_registration_response["address"]["complements"] == @address.complements
      assert hero_plate_registration_response["address"]["number"] == @address.number
      assert hero_plate_registration_response["address"]["postal_code"] == @address.postal_code
      assert hero_plate_registration_response["address"]["street"] == @address.street
      assert hero_plate_registration_response["address"]["telephone_number"] == @address.telephone_number
      assert hero_plate_registration_response["address"]["town"] == @address.town
    end
  end
end
