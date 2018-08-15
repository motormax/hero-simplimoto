defmodule HeroDigital.FulfillmentTest do
  use HeroDigital.DataCase

  alias HeroDigital.Fulfillment
  alias HeroDigital.Product.Motorcycle


  describe "purchase_orders" do
    alias HeroDigital.Fulfillment.PurchaseOrder

    @valid_attrs %{email: "some email", phone: "some phone", price: 42}
    @invalid_attrs %{email: nil, phone: nil, price: nil}


    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "DASH", price: 50000})
      %{motorcycle: motorcycle}
    end

    setup %{motorcycle: motorcycle} do
      with {:ok, lead} <- HeroDigital.Identity.create_lead(%{motorcycle_id: motorcycle.id}) do
        {:ok, %{lead: lead}}
      end
    end


    # test "get_purchase_order!/1 returns the purchase_order with given id", %{lead: lead} do

    #   assert Fulfillment.get_purchase_order!(purchase_order.id) == purchase_order
    # end

    test "create_purchase_order_for_lead/2 with valid data creates a purchase_order", %{lead: lead} do
      assert {:ok, %PurchaseOrder{} = purchase_order} = Fulfillment.create_purchase_order_from_lead(lead, @valid_attrs)

      assert purchase_order.email == "some email"
      assert purchase_order.lead_id == lead.id
      assert purchase_order.phone == "some phone"
      assert purchase_order.price == 42
    end

    test "create_purchase_order_for_lead/2 with valid data deletes the lead", %{lead: lead} do
      assert {:ok, %PurchaseOrder{} = purchase_order} = Fulfillment.create_purchase_order_from_lead(lead, @valid_attrs)

      assert HeroDigital.Identity.get_lead(lead.id) == nil
    end

    test "create_purchase_order_for_lead/2 with invalid does not delete the lead", %{lead: lead} do
      assert {:error, %Ecto.Changeset{}} = Fulfillment.create_purchase_order_from_lead(lead, @invalid_attrs)

      assert HeroDigital.Identity.get_lead(lead.id) != nil
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
