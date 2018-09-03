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

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
    %{lead: lead}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all accessories", %{conn: conn, lead: lead} do
      conn = get conn, lead_accessory_path(conn, :index, lead.id)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create accessory" do
    test "renders accessory when data is valid", %{conn: conn, lead: lead} do
      conn = post conn, lead_accessory_path(conn, :create, lead.id), accessory: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_accessory_path(conn, :show, lead.id, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some description",
        "logo_url" => "some logo_url",
        "name" => "some name",
        "price" => "120.5",
        "lead_id" => lead.id
      }
    end

    test "renders errors when data is invalid", %{conn: conn, lead: lead} do
      conn = post conn, lead_accessory_path(conn, :create, lead.id), accessory: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete accessory" do

    test "deletes chosen accessory", %{conn: conn, lead: lead} do
      conn = post conn, lead_accessory_path(conn, :create, lead.id), accessory: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = delete conn, lead_accessory_path(conn, :delete, lead.id, id)

      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, lead_accessory_path(conn, :show, lead.id, id)
      end
    end
  end
end
