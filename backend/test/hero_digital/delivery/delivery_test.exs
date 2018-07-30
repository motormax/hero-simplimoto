defmodule HeroDigital.DeliveryTest do
  use HeroDigital.DataCase

  alias HeroDigital.Delivery
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  describe "delivery_choices" do
    alias HeroDigital.Delivery.DeliveryChoice

    @valid_attrs %{pickup_location: "some pickup_location", address: nil, lead_id: nil}
    @invalid_attrs %{pickup_location: nil, address: nil, lead_id: nil}

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      %{motorcycle: motorcycle}
    end

    setup %{motorcycle: motorcycle} do
      {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
      %{lead: lead}
    end

    def delivery_choice_fixture(attrs \\ %{}) do
      {:ok, delivery_choice} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Delivery.create_delivery_choice()
      delivery_choice
    end

    test "list_delivery_choices/0 returns all delivery_choices", %{lead: lead} do
      delivery_choice = delivery_choice_fixture(%{lead_id: lead.id})
      assert Delivery.list_delivery_choices() == [delivery_choice]
    end

    test "get_delivery_choice!/1 returns the delivery_choice with given id", %{lead: lead} do
      delivery_choice = delivery_choice_fixture(%{lead_id: lead.id})
      assert Delivery.get_delivery_choice!(delivery_choice.id) == delivery_choice
    end

    test "create_delivery_choice/1 with valid data creates a delivery_choice", %{lead: lead} do
      valid_attrs = %{@valid_attrs | "lead_id": lead.id}
      assert {:ok, %DeliveryChoice{} = delivery_choice} = Delivery.create_delivery_choice(valid_attrs)
      assert delivery_choice.pickup_location == "some pickup_location"
    end

    test "create_delivery_choice/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Delivery.create_delivery_choice(@invalid_attrs)
    end

    test "delete_delivery_choice/1 deletes the delivery_choice", %{lead: lead} do
      delivery_choice = delivery_choice_fixture(%{lead_id: lead.id})
      assert {:ok, %DeliveryChoice{}} = Delivery.delete_delivery_choice(delivery_choice)
      assert_raise Ecto.NoResultsError, fn -> Delivery.get_delivery_choice!(delivery_choice.id) end
    end

    test "change_delivery_choice/1 returns a delivery_choice changeset", %{lead: lead} do
      delivery_choice = delivery_choice_fixture(%{lead_id: lead.id})
      assert %Ecto.Changeset{} = Delivery.change_delivery_choice(delivery_choice)
    end
  end
end
