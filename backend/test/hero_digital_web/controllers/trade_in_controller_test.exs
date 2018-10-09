defmodule HeroDigitalWeb.TradeInControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.TradeIn
  alias HeroDigital.TradeIn.TradeInData

  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  @create_attrs %{brand: "some brand", description: "some description", email: "some email", model: "some model", name: "some name", telephone: "some telephone", year: "some year", location: "some location", license_plate: "some license plate"}
  @update_attrs %{brand: "some updated brand", description: "some updated description", email: "some updated email", model: "some updated model", name: "some updated name", telephone: "some updated telephone", year: "some updated year", location: "some updated location", license_plate: "some updated license plate"}
  @invalid_attrs %{brand: nil, description: nil, email: nil, model: nil, name: nil, telephone: nil, year: nil, location: nil}

  def fixture(:trade_in_data) do
    {:ok, trade_in_data} = TradeIn.create_trade_in_data(@create_attrs)
    trade_in_data
  end

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

  describe "create trade_in_data" do
    test "renders trade_in_data when data is valid", %{lead: lead, conn: conn} do
      conn = post conn, lead_trade_in_path(conn, :create, lead.id), trade_in_data: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_trade_in_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "brand" => "some brand",
        "description" => "some description",
        "email" => "some email",
        "model" => "some model",
        "name" => "some name",
        "telephone" => "some telephone",
        "year" => "some year"}
    end

    test "renders errors when data is invalid", %{lead: lead, conn: conn} do
      conn = post conn, lead_trade_in_path(conn, :create, lead.id), trade_in_data: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  defp create_trade_in_data(_) do
    trade_in_data = fixture(:trade_in_data)
    {:ok, trade_in_data: trade_in_data}
  end
end
