defmodule HeroDigitalWeb.AddressControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.UserData
  alias HeroDigital.UserData.Address

  @create_attrs %{complements: "some complements", number: "some number", postal_code: "some postal_code", street: "some street", telephone_number: "some telephone_number", town: "some town"}
  @update_attrs %{complements: "some updated complements", number: "some updated number", postal_code: "some updated postal_code", street: "some updated street", telephone_number: "some updated telephone_number", town: "some updated town"}
  @invalid_attrs %{complements: nil, number: nil, postal_code: nil, street: nil, telephone_number: nil, town: nil}

  def fixture(:address) do
    {:ok, address} = UserData.create_address(@create_attrs)
    address
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all addresses", %{conn: conn} do
      conn = get conn, address_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create address" do
    test "renders address when data is valid", %{conn: conn} do
      conn = post conn, address_path(conn, :create), address: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, address_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "complements" => "some complements",
        "number" => "some number",
        "postal_code" => "some postal_code",
        "street" => "some street",
        "telephone_number" => "some telephone_number",
        "town" => "some town"}
    end

    test "renders address when complement is missing", %{conn: conn} do
      attrs_without_complement = Map.delete(@create_attrs, :complements)
      conn = post conn, address_path(conn, :create), address: attrs_without_complement
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, address_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "complements" => nil,
        "number" => "some number",
        "postal_code" => "some postal_code",
        "street" => "some street",
        "telephone_number" => "some telephone_number",
        "town" => "some town"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, address_path(conn, :create), address: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update address" do
    setup [:create_address]

    test "renders address when data is valid", %{conn: conn, address: %Address{id: id} = address} do
      conn = put conn, address_path(conn, :update, address), address: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, address_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "complements" => "some updated complements",
        "number" => "some updated number",
        "postal_code" => "some updated postal_code",
        "street" => "some updated street",
        "telephone_number" => "some updated telephone_number",
        "town" => "some updated town"}
    end

    test "renders errors when data is invalid", %{conn: conn, address: address} do
      conn = put conn, address_path(conn, :update, address), address: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete address" do
    setup [:create_address]

    test "deletes chosen address", %{conn: conn, address: address} do
      conn = delete conn, address_path(conn, :delete, address)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, address_path(conn, :show, address)
      end
    end
  end

  defp create_address(_) do
    address = fixture(:address)
    {:ok, address: address}
  end
end
