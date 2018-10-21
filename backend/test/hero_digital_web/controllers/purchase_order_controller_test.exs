defmodule HeroDigitalWeb.PurchaseOrderControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Fulfillment.PurchaseOrder
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Financing
  alias HeroDigital.Delivery
  alias HeroDigital.Insurance
  alias HeroDigital.PlateRegistration
  alias HeroDigital.PlateRegistrationTest
  alias Http.Mock

  import Mox

  @transaction_approved_body Poison.encode!(%{"id" => 123, "status" => "approved", "status_detail" => "accredited"})

  @create_attrs %{email: "some email", credit_card_token: "some token"}
  @invalid_attrs %{email: nil, lead_id: nil, phone: nil, price: nil}

  @financing_data_params %{costs: "some costs", installments: 42, issuer_id: "some issuer_id", issuer_logo: "some issuer_logo", issuer_name: "some issuer_name", message: "some message", monthly_amount: 120.5, payment_method_id: "some payment_method_id", payment_method_logo: "some payment_method_logo", payment_method_name: "some payment_method_name", price: 42}

  def purchase_order(attrs \\ %{}) do
    attrs |> Enum.into(@create_attrs)
  end

  setup do
    Mock
    |> stub(:post, fn _, _, _ -> {:ok, %HTTPoison.Response{status_code: 200, body: @transaction_approved_body}} end)

    {:ok, personal_plate_registration_type} = PlateRegistration.create_plate_registration_type(PlateRegistrationTest.personal_plate_registration_type)
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "DASH", price: 50000})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    with {:ok, lead} <- HeroDigital.Identity.create_lead(%{motorcycle_id: motorcycle.id}) do
      {:ok, %{lead: lead}}
    end
  end

  setup %{lead: lead} do
    with {:ok, financing_data} <- Financing.set_financing_data(lead.id, @financing_data_params) do
      %{financing_data: financing_data}
    end
  end

  setup %{lead: lead, motorcycle: motorcycle} do
    with {:ok, financing_data} <- Financing.set_financing_data(lead.id, @financing_data_params),
         {:ok, delivery_choice} <- Delivery.create_delivery_choice(%{pickup_location: "some pickup_location", lead_id: lead.id}),
         {:ok, delivery_choice} <- PlateRegistration.create_plate_registration_data(
            Map.put(HeroDigital.PlateRegistrationTest.personal_plate_registration, "lead_id", lead.id)),
         {:ok, delivery_choice} <- Insurance.create_insurance_choice(%{
           opt_in_or_out: Insurance.InsuranceChoice.personal_insurance_type,
           lead_id: lead.id,
           motorcycle_id: motorcycle.id,
         }) do
      %{financing_data: financing_data}
    end
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create purchase_order" do
    test "renders purchase_order when data is valid", %{conn: conn, lead: lead} do
      conn = post conn, lead_purchase_order_path(conn, :create, lead.id), @create_attrs

      lead_id = lead.id
      assert %{"id" => _id,
               "lead_id" => ^lead_id,
               "status" => "approved",
               "status_detail" => "accredited",
               "user_message" => "El pago fue procesado con éxito."} = json_response(conn, 201)["data"]
    end

    test "renders purchase_order when payment gateway failed", %{conn: conn, lead: lead} do
      conn = post conn, lead_purchase_order_path(conn, :create, lead.id), @create_attrs

      lead_id = lead.id
      assert %{"id" => _id,
               "lead_id" => ^lead_id,
               "status" => "approved",
               "status_detail" => "accredited",
               "user_message" => "El pago fue procesado con éxito."} = json_response(conn, 201)["data"]
    end

    test "takes phone and full_name as params", %{conn: conn, lead: lead} do
      conn = post conn, lead_purchase_order_path(conn, :create, lead.id), Map.merge(@create_attrs, %{phone: "1234-5678", full_name: "Pepe Argento"})

      lead_id = lead.id
      assert %{"id" => _id,
               "lead_id" => ^lead_id,
               "status" => "approved",
               "status_detail" => "accredited",
               "user_message" => "El pago fue procesado con éxito."} = json_response(conn, 201)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, lead: lead} do
      conn = post conn, lead_purchase_order_path(conn, :create, lead.id), @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
