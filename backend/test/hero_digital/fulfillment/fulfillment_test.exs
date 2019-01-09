defmodule HeroDigital.FulfillmentTest do
  use HeroDigital.DataCase
  use Bamboo.Test

  alias HeroDigital.Fulfillment
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Financing
  alias HeroDigital.Delivery
  alias HeroDigital.Insurance
  alias HeroDigital.PlateRegistration.PlateRegistrationType
  alias HeroDigital.PlateRegistration
  alias HeroDigital.PlateRegistrationTest
  alias Decimal
  alias HeroDigital.Factory
  alias HeroDigital.Product

  alias Http.Mock

  import Mox

  describe "purchase_orders" do
    alias HeroDigital.Fulfillment.PurchaseOrder

    @transaction_approved_body Poison.encode!(%{"id" => 123, "status" => "approved", "status_detail" => "accredited"})
    @financing_data_params %{provider: "MERCADOPAGO", costs: "some costs", installments: 42, issuer_id: "some issuer_id", issuer_logo: "some issuer_logo", issuer_name: "some issuer_name", message: "some message", monthly_amount: 120.5, payment_method_id: "some payment_method_id", payment_method_logo: "some payment_method_logo", payment_method_name: "some payment_method_name", price: 42}

    @valid_attrs %{"email" => "some email", "credit_card_token" => "a cc token"}
    @invalid_attrs %{"email" => nil}

    setup do
      Mock
      |> stub(:post, fn _, _, _ -> {:ok, %HTTPoison.Response{status_code: 200, body: @transaction_approved_body}} end)
      {:ok, personal_plate_registration_type} = PlateRegistration.create_plate_registration_type(PlateRegistrationTest.personal_plate_registration_type)

      an_accessory = Factory.new_accessory()
      another_accessory = Factory.new_different_accessory()

      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "DASH", price: 50000})
      %{motorcycle: motorcycle, an_accessory: an_accessory, another_accessory: another_accessory}
    end

    setup %{motorcycle: motorcycle} do
      with {:ok, lead} <- HeroDigital.Identity.create_lead(%{motorcycle_id: motorcycle.id}) do
        {:ok, %{lead: lead}}
      end
    end

    setup %{lead: lead, motorcycle: motorcycle, an_accessory: an_accessory, another_accessory: another_accessory} do
      with {:ok, financing_data} <- Financing.set_financing_data(lead.id, @financing_data_params),
           {:ok, delivery_choice} <- Delivery.create_delivery_choice(%{pickup_location: "some pickup_location", lead_id: lead.id}),
           {:ok, plate_registration_data} <- PlateRegistration.create_plate_registration_data(
              Map.put(PlateRegistrationTest.personal_plate_registration, "lead_id", lead.id)),
           {:ok, lead} <- Product.add_accessories_to_lead(lead, [an_accessory, another_accessory]),
           {:ok, insurance_choice} <- Insurance.create_insurance_choice(%{
             opt_in_or_out: Insurance.InsuranceChoice.personal_insurance_type,
             lead_id: lead.id,
             motorcycle_id: motorcycle.id,
           }) do
        %{financing_data: financing_data}
      end
    end

    test "create_purchase_order_for_lead/2 with valid data creates a purchase_order", %{lead: lead} do
      assert {:ok, %PurchaseOrder{} = purchase_order} = Fulfillment.create_purchase_order_from_lead(lead, @valid_attrs)

      assert purchase_order.email == "some email"
      assert purchase_order.lead_id == lead.id
      assert purchase_order.payment_method_token == "a cc token"
    end

    test "create_purchase_order_for_lead/2 sends an email to the user", %{lead: lead} do
      assert {:ok, %PurchaseOrder{} = purchase_order} = Fulfillment.create_purchase_order_from_lead(lead, @valid_attrs)

      assert_email_delivered_with(to: [nil: purchase_order.email])
    end

    test "create_purchase_order_for_lead/2 with valid data deactivates the lead", %{lead: lead} do
      assert {:ok, %PurchaseOrder{}} = Fulfillment.create_purchase_order_from_lead(lead, @valid_attrs)

      assert HeroDigital.Identity.get_lead(lead.id).is_active == false
    end

    test "create_purchase_order_for_lead/2 with invalid does not deactivate the lead", %{lead: lead} do
      assert {:error, %Ecto.Changeset{}} = Fulfillment.create_purchase_order_from_lead(lead, @invalid_attrs)

      assert HeroDigital.Identity.get_lead(lead.id).is_active == true
    end

    test "when creating purchase order for lead with no plate registration data throws exception and leads keeps active", %{motorcycle: motorcycle} do
      {:ok, lead} = HeroDigital.Identity.create_lead(%{motorcycle_id: motorcycle.id})
      Financing.set_financing_data(lead.id, @financing_data_params)
      Delivery.create_delivery_choice(%{pickup_location: "some pickup_location", lead_id: lead.id})
      Insurance.create_insurance_choice(%{
        opt_in_or_out: Insurance.InsuranceChoice.personal_insurance_type,
        lead_id: lead.id,
        motorcycle_id: motorcycle.id,
      })

      assert_raise RuntimeError, fn -> Fulfillment.create_purchase_order_from_lead(lead, @valid_attrs) end
      assert HeroDigital.Identity.get_lead(lead.id).is_active == true
    end
  end
end
