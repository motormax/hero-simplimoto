defmodule HeroDigitalWeb.DeliveryChoiceControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Delivery
  alias HeroDigital.Delivery.DeliveryChoice

  @create_attrs %{pickup_location: 42}
  @update_attrs %{pickup_location: 43}
  @invalid_attrs %{pickup_location: nil}

  def fixture(:delivery_choice) do
    {:ok, delivery_choice} = Delivery.create_delivery_choice(@create_attrs)
    delivery_choice
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all delivery_choices", %{conn: conn} do
      conn = get conn, delivery_choice_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create delivery_choice" do
    test "renders delivery_choice when data is valid", %{conn: conn} do
      conn = post conn, delivery_choice_path(conn, :create), delivery_choice: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, delivery_choice_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "pickup_location" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, delivery_choice_path(conn, :create), delivery_choice: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update delivery_choice" do
    setup [:create_delivery_choice]

    test "renders delivery_choice when data is valid", %{conn: conn, delivery_choice: %DeliveryChoice{id: id} = delivery_choice} do
      conn = put conn, delivery_choice_path(conn, :update, delivery_choice), delivery_choice: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, delivery_choice_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "pickup_location" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, delivery_choice: delivery_choice} do
      conn = put conn, delivery_choice_path(conn, :update, delivery_choice), delivery_choice: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete delivery_choice" do
    setup [:create_delivery_choice]

    test "deletes chosen delivery_choice", %{conn: conn, delivery_choice: delivery_choice} do
      conn = delete conn, delivery_choice_path(conn, :delete, delivery_choice)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, delivery_choice_path(conn, :show, delivery_choice)
      end
    end
  end

  defp create_delivery_choice(_) do
    delivery_choice = fixture(:delivery_choice)
    {:ok, delivery_choice: delivery_choice}
  end
end
