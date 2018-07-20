defmodule HeroDigitalWeb.PlateRegistrationDataControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.PlateRegistration
  alias HeroDigital.Identity

  @valid_email "some email"
  @valid_phone "some phone"
  @valid_personal_data %{:dni => "some dni", :last_name => "some last_name", :name => "some name"}

  def fixture(:plate_registration_data) do
    {:ok, plate_registration_data} = PlateRegistration.create_plate_registration_data()
    plate_registration_data
  end

  setup do
    with {:ok, lead} = Identity.create_lead()
    do
      %{attrs: %{lead_id: lead.id, email: @valid_email, personal_data: @valid_personal_data, phone: @valid_phone}}
    end
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create plate_registration_data" do
    test "renders plate_registration_data when data is valid", %{attrs: attrs, conn: conn} do
      conn = post conn, plate_registration_data_path(conn, :create), plate_registration_data: attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, plate_registration_data_path(conn, :show, id)
      response = json_response(conn, 200)["data"]
      assert response["id"] == id
      assert response["phone"]["phone"] == attrs.phone
      assert response["email"]["email"] == attrs.email
      assert response["personal_data"]["dni"] == attrs.personal_data.dni
      assert response["personal_data"]["name"] == attrs.personal_data.name
      assert response["personal_data"]["last_name"] == attrs.personal_data.last_name
    end

    test "renders errors when data is invalid", %{conn: conn} do
      invalid_attrs = %{lead_id: nil, personal_data_id: nil, email: nil, phone: nil}
      conn = post conn, plate_registration_data_path(conn, :create), plate_registration_data: invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
