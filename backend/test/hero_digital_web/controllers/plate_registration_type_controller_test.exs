defmodule HeroDigitalWeb.PlateRegistrationTypeControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.PlateRegistration
  alias Decimal

  @personal_plate_registration "personalPlateRegistration"
  @hero_plate_registration "heroPlateRegistration"

  @personal_plate_registration_type %{"name" => @personal_plate_registration, "price" => Decimal.new(0)}
  @hero_plate_registration_type %{"name" => @hero_plate_registration, "price" => Decimal.new(1000.2)}
  @json_personal_plate_registration_type %{"name" => @personal_plate_registration, "price" => "0"}
  @json_hero_plate_registration_type %{"name" => @hero_plate_registration, "price" => "1000.2"}


  defp create_plate_registration_types() do
    with {:ok, personal_plate_registration_type} <- PlateRegistration.create_plate_registration_type(@personal_plate_registration_type),
         {:ok, hero_plate_registration_type} <- PlateRegistration.create_plate_registration_type(@hero_plate_registration_type)
    do
      %{
          personal_plate_registration_type: personal_plate_registration_type,
          hero_plate_registration_type: hero_plate_registration_type
      }
    end
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index all plate_registration_types" do
    test "renders an empty json when there is none plate_registration_types in the db", %{conn: conn} do
      conn = get conn, plate_registration_type_path(conn, :index)

      assert length(json_response(conn, 200)["data"]) == 0
    end

    test "renders hero_plate_registration_data when data is valid", %{conn: conn} do
      types = create_plate_registration_types()
      conn = get conn, plate_registration_type_path(conn, :index)
      response = json_response(conn, 200)["data"]

      assert response == [@json_personal_plate_registration_type, @json_hero_plate_registration_type]
    end
  end
end
