defmodule HeroDigitalWeb.PurchaseOrderControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Fulfillment
  alias HeroDigital.Fulfillment.PurchaseOrder
  alias HeroDigital.Product.Motorcycle

  @create_attrs %{email: "some email", phone: "some phone", price: 42}
  @invalid_attrs %{email: nil, lead_id: nil, phone: nil, price: nil}

  def purchase_order(attrs \\ %{}) do
    attrs |> Enum.into(@create_attrs)
  end

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "DASH", price: 50000})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    with {:ok, lead} <- HeroDigital.Identity.create_lead(%{motorcycle_id: motorcycle.id}) do
      {:ok, %{lead: lead}}
    end
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create purchase_order" do
    test "renders purchase_order when data is valid", %{conn: conn, lead: lead} do
      conn = post conn, lead_purchase_order_path(conn, :create, lead.id), purchase_order: @create_attrs
      assert other = json_response(conn, 201)["data"]

      conn = get conn, lead_purchase_order_path(conn, :show, lead.id)
      lead_id = lead.id
      assert %{"id" => _id,
               "lead_id" => ^lead_id,
               "email" => "some email",
               "phone" => "some phone",
               "price" => 42} = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, lead: lead} do
      conn = post conn, lead_purchase_order_path(conn, :create, lead.id), purchase_order: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
