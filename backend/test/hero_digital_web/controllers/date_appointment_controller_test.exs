defmodule HeroDigitalWeb.DateAppointmentControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity

  @create_attrs %{
    date: ~D[2010-04-17],
    shift: "some shift",
    address: %{
      complements: "some complements",
      number: "some number",
      postal_code: "some postal_code",
      street: "some street",
      telephone_number: "some telephone_number",
      town: "some town"
    },
    user_id: nil
  }
  @invalid_attrs %{date: nil, shift: nil, user_id: nil, address: nil}

  setup do
    {:ok, user} = Identity.create_user()
    %{user: user}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all date_appointments", %{conn: conn} do
      conn = get conn, date_appointment_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create date_appointment" do
    test "renders date_appointment when data is valid", %{user: user, conn: conn} do
      create_attrs = %{@create_attrs | "user_id": user.id}
      conn = post conn, date_appointment_path(conn, :create), date_appointment: create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, date_appointment_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "date" => "2010-04-17",
               "shift" => "some shift",
               "address" => %{
                 "complements" => "some complements",
                 "number" => "some number",
                 "postal_code" => "some postal_code",
                 "street" => "some street",
                 "telephone_number" => "some telephone_number",
                 "town" => "some town"
               }
             }
    end

    test "renders errors when data is invalid", %{user: user, conn: conn} do
      invalid_attrs = %{@invalid_attrs | "user_id": user.id}
      conn = post conn, date_appointment_path(conn, :create), date_appointment: invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete date_appointment" do
    setup %{user: user, conn: conn} do
      create_attrs = %{@create_attrs | "user_id": user.id}
      conn = post conn, date_appointment_path(conn, :create), date_appointment: create_attrs
      %{"id" => id} = json_response(conn, 201)["data"]
      %{date_appointment: id}
    end

    test "deletes chosen date_appointment", %{conn: conn, date_appointment: date_appointment} do
      conn = delete conn, date_appointment_path(conn, :delete, date_appointment)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, date_appointment_path(conn, :show, date_appointment)
      end
    end
  end
end
