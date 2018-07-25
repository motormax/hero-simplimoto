defmodule HeroDigitalWeb.UserControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity.User

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:user) do
    {:ok, user} = Identity.create_user(@create_attrs)
    user
  end


  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn, motorcycle: motorcycle} do
      body = @create_attrs
        |> Map.put(:motorcycle_id, motorcycle.id)

      conn = post conn, user_path(conn, :create), user: body
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, user_path(conn, :show, id)
      assert %{"id" => ^id, "motorcycle" => user_bike} = json_response(conn, 200)["data"]

      assert user_bike["id"] == motorcycle.id
    end
  end
end
