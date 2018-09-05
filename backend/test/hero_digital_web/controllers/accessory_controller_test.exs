defmodule HeroDigitalWeb.AccessoryControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Product
  alias HeroDigital.Product.Accessory
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity

  @create_attrs %{description: "some description", logo_url: "some logo_url", name: "some name", price: "120.5"}
  @update_attrs %{description: "some updated description", logo_url: "some updated logo_url", name: "some updated name", price: "456.7"}
  @invalid_attrs %{description: nil, logo_url: nil, name: nil, price: nil}

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
