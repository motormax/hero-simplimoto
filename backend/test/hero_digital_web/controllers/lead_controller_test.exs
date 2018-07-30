defmodule HeroDigitalWeb.LeadControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Product.Motorcycle

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create lead" do
    test "renders lead when data is valid", %{motorcycle: motorcycle, conn: conn} do
      attrs = %{"motorcycle_id": motorcycle.id}
      conn = post conn, lead_path(conn, :create), lead: attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_path(conn, :show, id)
      assert %{"id" => _aRandomId} = json_response(conn, 200)["data"]
    end
  end
end
