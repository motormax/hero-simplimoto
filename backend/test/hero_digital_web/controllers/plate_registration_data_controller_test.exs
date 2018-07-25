defmodule HeroDigitalWeb.PlateRegistrationDataControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.PlateRegistration
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  @valid_email "some email"
  @valid_phone "some phone"
  @valid_personal_data %{:dni => "some dni", :last_name => "some last_name", :name => "some name"}
  @address %{
    complements: "some complements",
    number: "some number",
    postal_code: "some postal_code",
    street: "some street",
    telephone_number: "some telephone_number",
    town: "some town"
  }

  def fixture(:plate_registration_data) do
    {:ok, plate_registration_data} = PlateRegistration.create_plate_registration_data()
    plate_registration_data
  end

  setup do
    with motorcycle <- HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200}),
        {:ok, lead} <- Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      do
      %{
        attrs: %{
          lead_id: lead.id,
          email: @valid_email,
          personal_data: @valid_personal_data,
          phone: @valid_phone,
          front_dni_image: %{
            name: "file.png",
            type: "image/png",
            data: "YW4gaW1hZ2U="
          },
          back_dni_image: %{
            name: "file.png",
            type: "image/png",
            data: "YW5vdGhlciBpbWFnZQ=="
          },
          address: @address
        }
      }
    end
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create plate_registration_data" do
    test "renders plate_registration_data when data is valid", %{attrs: attrs, conn: conn} do
      conn = post conn, lead_plate_registration_data_path(conn, :create, attrs.lead_id), plate_registration_data: attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_plate_registration_data_path(conn, :show, attrs.lead_id)
      response = json_response(conn, 200)["data"]
      assert response["id"] == id
      assert response["phone"]["phone"] == attrs.phone
      assert response["email"]["email"] == attrs.email
      assert response["personal_data"]["dni"] == attrs.personal_data.dni
      assert response["personal_data"]["name"] == attrs.personal_data.name
      assert response["personal_data"]["last_name"] == attrs.personal_data.last_name
      assert response["address"]["complements"] == attrs.address.complements
      assert response["address"]["number"] == attrs.address.number
      assert response["address"]["postal_code"] == attrs.address.postal_code
      assert response["address"]["street"] == attrs.address.street
      assert response["address"]["telephone_number"] == attrs.address.telephone_number
      assert response["address"]["town"] == attrs.address.town
    end

    test "renders errors when data is invalid", %{attrs: attrs, conn: conn} do
      invalid_attrs = %{lead_id: attrs.lead_id, personal_data: nil, email: nil, phone: nil, address: nil}
      conn = post conn, lead_plate_registration_data_path(conn, :create, attrs.lead_id), plate_registration_data: invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
