defmodule HeroDigitalWeb.DateAppointmentControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  @create_attrs %{
    date: ~D[2010-04-17],
    shift: "some shift",
    name: "some name",
    email: "some@email.com",
    address: %{
      complements: "some complements",
      number: "some number",
      postal_code: "some postal_code",
      street: "some street",
      telephone_number: "some telephone_number",
      town: "some town"
    },
    lead_id: nil
  }
  @invalid_attrs %{date: nil, shift: nil, lead_id: nil, address: nil}

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
    %{lead: lead}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create date_appointment" do
    test "renders date_appointment when data is valid", %{lead: lead, conn: conn} do
      conn = post conn, lead_date_appointment_path(conn, :create, lead.id), date_appointment: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_date_appointment_path(conn, :show, lead.id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "date" => "2010-04-17",
               "shift" => "some shift",
               "name" => "some name",
               "email" => "some@email.com",
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

    test "renders errors when data is invalid", %{lead: lead, conn: conn} do
      conn = post conn, lead_date_appointment_path(conn, :create, lead.id), date_appointment: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
