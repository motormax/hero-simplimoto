defmodule HeroDigital.DeliveryTest do
  use HeroDigital.DataCase

  alias HeroDigital.Delivery

  describe "delivery_choices" do
    alias HeroDigital.Delivery.DeliveryChoice

    @valid_attrs %{pickup_location: 42}
    @update_attrs %{pickup_location: 43}
    @invalid_attrs %{pickup_location: nil}

    def delivery_choice_fixture(attrs \\ %{}) do
      {:ok, delivery_choice} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Delivery.create_delivery_choice()

      delivery_choice
    end

    test "list_delivery_choices/0 returns all delivery_choices" do
      delivery_choice = delivery_choice_fixture()
      assert Delivery.list_delivery_choices() == [delivery_choice]
    end

    test "get_delivery_choice!/1 returns the delivery_choice with given id" do
      delivery_choice = delivery_choice_fixture()
      assert Delivery.get_delivery_choice!(delivery_choice.id) == delivery_choice
    end

    test "create_delivery_choice/1 with valid data creates a delivery_choice" do
      assert {:ok, %DeliveryChoice{} = delivery_choice} = Delivery.create_delivery_choice(@valid_attrs)
      assert delivery_choice.pickup_location == 42
    end

    test "create_delivery_choice/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Delivery.create_delivery_choice(@invalid_attrs)
    end

    test "update_delivery_choice/2 with valid data updates the delivery_choice" do
      delivery_choice = delivery_choice_fixture()
      assert {:ok, delivery_choice} = Delivery.update_delivery_choice(delivery_choice, @update_attrs)
      assert %DeliveryChoice{} = delivery_choice
      assert delivery_choice.pickup_location == 43
    end

    test "update_delivery_choice/2 with invalid data returns error changeset" do
      delivery_choice = delivery_choice_fixture()
      assert {:error, %Ecto.Changeset{}} = Delivery.update_delivery_choice(delivery_choice, @invalid_attrs)
      assert delivery_choice == Delivery.get_delivery_choice!(delivery_choice.id)
    end

    test "delete_delivery_choice/1 deletes the delivery_choice" do
      delivery_choice = delivery_choice_fixture()
      assert {:ok, %DeliveryChoice{}} = Delivery.delete_delivery_choice(delivery_choice)
      assert_raise Ecto.NoResultsError, fn -> Delivery.get_delivery_choice!(delivery_choice.id) end
    end

    test "change_delivery_choice/1 returns a delivery_choice changeset" do
      delivery_choice = delivery_choice_fixture()
      assert %Ecto.Changeset{} = Delivery.change_delivery_choice(delivery_choice)
    end
  end
end
