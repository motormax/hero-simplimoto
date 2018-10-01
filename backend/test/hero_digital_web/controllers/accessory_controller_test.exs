defmodule HeroDigitalWeb.AccessoryControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Product

  def fixture(attrs \\ %{}) do
    {:ok, accessory} = Product.create_accessory(attrs)
    accessory
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all accessories", %{conn: conn} do
      conn = get conn, accessory_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end
end
