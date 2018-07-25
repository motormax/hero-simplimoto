defmodule HeroDigitalWeb.AddressControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity
  alias HeroDigital.UserData
  alias HeroDigital.Product.Motorcycle

  @create_attrs %{
    lead_id: nil,
    complements: "some complements",
    number: "some number",
    postal_code: "some postal_code",
    street: "some street",
    telephone_number: "some telephone_number",
    town: "some town"
  }

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
    %{lead: lead}
  end

  def fixture(:address, lead) do
    create_attrs = %{@create_attrs | "lead_id": lead.id}
    {:ok, address} = UserData.create_address(create_attrs)
    address
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all addresses", %{conn: conn, lead: lead} do
      conn = get conn, lead_address_path(conn, :index, lead.id)
      assert json_response(conn, 200)["data"] == []
    end
  end
end
