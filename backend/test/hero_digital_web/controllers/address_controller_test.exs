defmodule HeroDigitalWeb.AddressControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity
  alias HeroDigital.UserData
  alias HeroDigital.Product.Motorcycle

  @create_attrs %{
    user_id: nil,
    complements: "some complements",
    number: "some number",
    postal_code: "some postal_code",
    street: "some street",
    telephone_number: "some telephone_number",
    town: "some town"
  }
  @invalid_attrs %{
    user_id: nil,
    complements: nil,
    number: nil,
    postal_code: nil,
    street: nil,
    telephone_number: nil,
    town: nil
  }

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    {:ok, user} = Identity.create_user(%{motorcycle_id: motorcycle.id})
    %{user: user}
  end

  def fixture(:address, user) do
    create_attrs = %{@create_attrs | "user_id": user.id}
    {:ok, address} = UserData.create_address(create_attrs)
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
    test "renders address when data is valid", %{user: user, conn: conn} do
      create_attrs = %{@create_attrs | "user_id": user.id}
      conn = post conn, address_path(conn, :create), address: create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, address_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "complements" => "some complements",
               "number" => "some number",
               "postal_code" => "some postal_code",
               "street" => "some street",
               "telephone_number" => "some telephone_number",
               "town" => "some town"
             }
    end

    test "renders address when complement is missing", %{user: user, conn: conn} do
      attrs_without_complement = Map.delete(@create_attrs, :complements)
      attrs_without_complement = %{attrs_without_complement | "user_id": user.id}
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
               "town" => "some town"
             }
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, address_path(conn, :create), address: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete address" do
    setup %{user: user} do
      address = fixture(:address, user)
      {:ok, address: address}
    end

    test "deletes chosen address", %{conn: conn, address: address} do
      conn = delete conn, address_path(conn, :delete, address)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, address_path(conn, :show, address)
      end
    end
  end
end
