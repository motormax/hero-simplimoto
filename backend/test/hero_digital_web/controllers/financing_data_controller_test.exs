defmodule HeroDigitalWeb.FinancingDataControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Financing
  alias HeroDigital.Financing.FinancingData
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  @create_attrs %{provider: "MERCADOPAGO", costs: "some costs", installments: 42, issuer_id: "some issuer_id", issuer_logo: "some issuer_logo", issuer_name: "some issuer_name", message: "some message", monthly_amount: 120.5, payment_method_id: "some payment_method_id", payment_method_logo: "some payment_method_logo", payment_method_name: "some payment_method_name", price: 42}
  @update_attrs %{costs: "some updated costs", installments: 43, issuer_id: "some updated issuer_id", issuer_logo: "some updated issuer_logo", issuer_name: "some updated issuer_name", message: "some updated message", monthly_amount: 456.7, payment_method_id: "some updated payment_method_id", payment_method_logo: "some updated payment_method_logo", payment_method_name: "some updated payment_method_name", price: 43}
  @invalid_attrs %{provider: "MERCADOPAGO", costs: nil, installments: nil, issuer_id: nil, issuer_logo: nil, issuer_name: nil, message: nil, monthly_amount: nil, payment_method_id: nil, payment_method_logo: nil, payment_method_name: nil, price: nil}

  def fixture(%{lead: lead}, :financing_data) do
    {:ok, financing_data} = Financing.set_financing_data(lead.id, @create_attrs)
    financing_data
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
    %{lead: lead}
  end

  describe "create financing_data" do
    test "renders financing_data when data is valid", %{conn: conn, lead: lead} do
      conn = post conn, lead_financing_data_path(conn, :create, lead.id), financing_data: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_financing_data_path(conn, :show, lead.id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "costs" => "some costs",
        "installments" => 42,
        "issuer_id" => "some issuer_id",
        "issuer_logo" => "some issuer_logo",
        "issuer_name" => "some issuer_name",
        "message" => "some message",
        "monthly_amount" => 120.5,
        "payment_method_id" => "some payment_method_id",
        "payment_method_logo" => "some payment_method_logo",
        "payment_method_name" => "some payment_method_name",
        "cash_amount" => "0"}
    end

    test "renders errors when data is invalid", %{conn: conn, lead: lead} do
      conn = post conn, lead_financing_data_path(conn, :create, lead.id), financing_data: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update financing_data" do
    setup [:create_financing_data]

    test "renders financing_data when data is valid", %{conn: conn, lead: lead, financing_data: %FinancingData{id: id} = financing_data} do
      conn = post conn, lead_financing_data_path(conn, :create, lead.id), financing_data: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 201)["data"]

      conn = get conn, lead_financing_data_path(conn, :show, lead.id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "costs" => "some updated costs",
        "installments" => 43,
        "issuer_id" => "some updated issuer_id",
        "issuer_logo" => "some updated issuer_logo",
        "issuer_name" => "some updated issuer_name",
        "message" => "some updated message",
        "monthly_amount" => 456.7,
        "payment_method_id" => "some updated payment_method_id",
        "payment_method_logo" => "some updated payment_method_logo",
        "payment_method_name" => "some updated payment_method_name",
        "cash_amount" => "0" }
    end

    test "renders errors when data is invalid", %{conn: conn, lead: lead, financing_data: financing_data} do
      conn = post conn, lead_financing_data_path(conn, :create, lead.id), financing_data: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  defp create_financing_data(ctx) do
    financing_data = fixture(ctx, :financing_data)
    {:ok, financing_data: financing_data}
  end
end
