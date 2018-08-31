defmodule HeroDigital.FulfillmentTest do
  use HeroDigital.DataCase
  use Bamboo.Test

  alias HeroDigital.Fulfillment
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Financing
  alias HeroDigital.Delivery
  alias HeroDigital.Insurance
  alias HeroDigital.PlateRegistration
  alias HeroDigital.PlateRegistrationTest
  alias Decimal

  alias Http.Mock

  import Mox

  describe "purchase_orders" do
    alias HeroDigital.Fulfillment.PurchaseOrder

    @transaction_approved_body Poison.encode!(%{"id" => 123, "status" => "approved", "status_detail" => "accredited"})
    @financing_data_params %{costs: "some costs", installments: 42, issuer_id: "some issuer_id", issuer_logo: "some issuer_logo", issuer_name: "some issuer_name", message: "some message", monthly_amount: 120.5, payment_method_id: "some payment_method_id", payment_method_logo: "some payment_method_logo", payment_method_name: "some payment_method_name", price: 42}

    @valid_attrs %{"email" => "some email", "credit_card_token" => "a cc token"}
    @invalid_attrs %{"email" => nil}

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

    setup %{lead: lead, motorcycle: motorcycle} do
      with {:ok, financing_data} <- Financing.set_financing_data(lead.id, @financing_data_params),
           {:ok, delivery_choice} <- Delivery.create_delivery_choice(%{pickup_location: "some pickup_location", lead_id: lead.id}),
           {:ok, delivery_choice} <- PlateRegistration.create_plate_registration_data(
              Map.put(PlateRegistrationTest.personal_plate_registration, "lead_id", lead.id)),
           {:ok, delivery_choice} <- Insurance.create_insurance_choice(%{
             opt_in_or_out: Insurance.InsuranceChoice.personal_insurance_type,
             lead_id: lead.id,
             motorcycle_id: motorcycle.id,
           }) do
        %{financing_data: financing_data}
      end
    end

    # test "get_purchase_order!/1 returns the purchase_order with given id", %{lead: lead} do

    #   assert Fulfillment.get_purchase_order!(purchase_order.id) == purchase_order
    # end

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

  #   test "create_purchase_order/1 with invalid data returns error changeset" do
  #     assert {:error, %Ecto.Changeset{}} = Fulfillment.create_purchase_order(@invalid_attrs)
  #   end

  #   test "update_purchase_order/2 with valid data updates the purchase_order" do
  #     purchase_order = purchase_order_fixture()
  #     assert {:ok, purchase_order} = Fulfillment.update_purchase_order(purchase_order, @update_attrs)
  #     assert %PurchaseOrder{} = purchase_order
  #     assert purchase_order.email == "some updated email"
  #     assert purchase_order.lead_id == "7488a646-e31f-11e4-aace-600308960668"
  #     assert purchase_order.phone == "some updated phone"
  #     assert purchase_order.price == 43
  #   end

  #   test "update_purchase_order/2 with invalid data returns error changeset" do
  #     purchase_order = purchase_order_fixture()
  #     assert {:error, %Ecto.Changeset{}} = Fulfillment.update_purchase_order(purchase_order, @invalid_attrs)
  #     assert purchase_order == Fulfillment.get_purchase_order!(purchase_order.id)
  #   end
  end
end
