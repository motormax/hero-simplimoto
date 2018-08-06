defmodule HeroDigitalWeb.InsuranceQuoteChosenControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Insurance
  alias HeroDigital.Insurance.InsuranceQuoteChosen

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:insurance_quote_chosen) do
    {:ok, insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(@create_attrs)
    insurance_quote_chosen
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all insuarnce_quotes_chosen", %{conn: conn} do
      conn = get conn, insurance_quote_chosen_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create insurance_quote_chosen" do
    test "renders insurance_quote_chosen when data is valid", %{conn: conn} do
      conn = post conn, insurance_quote_chosen_path(conn, :create), insurance_quote_chosen: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, insurance_quote_chosen_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, insurance_quote_chosen_path(conn, :create), insurance_quote_chosen: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update insurance_quote_chosen" do
    setup [:create_insurance_quote_chosen]

    test "renders insurance_quote_chosen when data is valid", %{conn: conn, insurance_quote_chosen: %InsuranceQuoteChosen{id: id} = insurance_quote_chosen} do
      conn = put conn, insurance_quote_chosen_path(conn, :update, insurance_quote_chosen), insurance_quote_chosen: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, insurance_quote_chosen_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, insurance_quote_chosen: insurance_quote_chosen} do
      conn = put conn, insurance_quote_chosen_path(conn, :update, insurance_quote_chosen), insurance_quote_chosen: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete insurance_quote_chosen" do
    setup [:create_insurance_quote_chosen]

    test "deletes chosen insurance_quote_chosen", %{conn: conn, insurance_quote_chosen: insurance_quote_chosen} do
      conn = delete conn, insurance_quote_chosen_path(conn, :delete, insurance_quote_chosen)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, insurance_quote_chosen_path(conn, :show, insurance_quote_chosen)
      end
    end
  end

  defp create_insurance_quote_chosen(_) do
    insurance_quote_chosen = fixture(:insurance_quote_chosen)
    {:ok, insurance_quote_chosen: insurance_quote_chosen}
  end
end
