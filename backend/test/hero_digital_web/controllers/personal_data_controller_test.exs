defmodule HeroDigitalWeb.PersonalDataControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.UserData
  alias HeroDigital.UserData.PersonalData

  @create_attrs %{dni: "some dni", last_name: "some last_name", name: "some name", lead_id: "7488a646-e31f-11e4-aace-600308960662"}
  @update_attrs %{dni: "some updated dni", last_name: "some updated last_name", name: "some updated name", lead_id: "7488a646-e31f-11e4-aace-600308960662"}
  @invalid_attrs %{dni: nil, last_name: nil, name: nil}

  def fixture(:personal_data) do
    {:ok, personal_data} = UserData.create_personal_data(@create_attrs)
    personal_data
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create personal_data" do
    test "renders personal_data when data is valid", %{conn: conn} do
      conn = post conn, personal_data_path(conn, :create), personal_data: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, personal_data_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "dni" => "some dni",
        "last_name" => "some last_name",
        "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, personal_data_path(conn, :create), personal_data: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  defp create_personal_data(_) do
    personal_data = fixture(:personal_data)
    {:ok, personal_data: personal_data}
  end
end
