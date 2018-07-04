defmodule HeroDigitalWeb.UserControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity
  alias HeroDigital.Identity.User

  @create_attrs %{}
  @update_attrs %{id: "7488a646-e31f-11e4-aace-600308960668"}
  @invalid_attrs %{id: nil}

  def fixture(:user) do
    {:ok, user} = Identity.create_user(@create_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), user: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, user_path(conn, :show, id)
      assert %{"id" => _aRandomId} = json_response(conn, 200)["data"]
    end
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
