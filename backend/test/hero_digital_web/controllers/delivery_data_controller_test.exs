defmodule HeroDigitalWeb.DeliveryDataControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.UserData
  alias HeroDigital.UserData.DeliveryData

  @create_attrs %{address: "some address", postal_code: "some postal_code", telephone_number: "some telephone_number", town: "some town"}
  @update_attrs %{address: "some updated address", postal_code: "some updated postal_code", telephone_number: "some updated telephone_number", town: "some updated town"}
  @invalid_attrs %{address: nil, postal_code: nil, telephone_number: nil, town: nil}

  def fixture(:delivery_data) do
    {:ok, delivery_data} = UserData.create_delivery_data(@create_attrs)
    delivery_data
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all delivery_data", %{conn: conn} do
      conn = get conn, delivery_data_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create delivery_data" do
    test "renders delivery_data when data is valid", %{conn: conn} do
      conn = post conn, delivery_data_path(conn, :create), delivery_data: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, delivery_data_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "address" => "some address",
        "postal_code" => "some postal_code",
        "telephone_number" => "some telephone_number",
        "town" => "some town"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, delivery_data_path(conn, :create), delivery_data: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update delivery_data" do
    setup [:create_delivery_data]

    test "renders delivery_data when data is valid", %{conn: conn, delivery_data: %DeliveryData{id: id} = delivery_data} do
      conn = put conn, delivery_data_path(conn, :update, delivery_data), delivery_data: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, delivery_data_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "address" => "some updated address",
        "postal_code" => "some updated postal_code",
        "telephone_number" => "some updated telephone_number",
        "town" => "some updated town"}
    end

    test "renders errors when data is invalid", %{conn: conn, delivery_data: delivery_data} do
      conn = put conn, delivery_data_path(conn, :update, delivery_data), delivery_data: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete delivery_data" do
    setup [:create_delivery_data]

    test "deletes chosen delivery_data", %{conn: conn, delivery_data: delivery_data} do
      conn = delete conn, delivery_data_path(conn, :delete, delivery_data)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, delivery_data_path(conn, :show, delivery_data)
      end
    end
  end

  defp create_delivery_data(_) do
    delivery_data = fixture(:delivery_data)
    {:ok, delivery_data: delivery_data}
  end
end
