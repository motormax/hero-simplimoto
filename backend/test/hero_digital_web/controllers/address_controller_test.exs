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
    test "lists all addresses", %{conn: conn, user: user} do
      conn = get conn, user_address_path(conn, :index, user.id)
      assert json_response(conn, 200)["data"] == []
    end
  end
end
