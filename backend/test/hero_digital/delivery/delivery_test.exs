defmodule HeroDigital.DeliveryTest do
  use HeroDigital.DataCase

  alias HeroDigital.Delivery
  alias HeroDigital.Identity

  describe "delivery_choices" do
    alias HeroDigital.Delivery.DeliveryChoice

    @valid_attrs %{pickup_location: 42, address: nil, user_id: nil}
    @invalid_attrs %{pickup_location: nil, address: nil, user_id: nil}

    setup do
      {:ok, user} = Identity.create_user()
      %{user: user}
    end

    def delivery_choice_fixture(attrs \\ %{}) do
      {:ok, user} = Identity.create_user()
      valid_attrs = %{@valid_attrs | "user_id": user.id}
      {:ok, delivery_choice} =
        attrs
        |> Enum.into(valid_attrs)
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

    test "create_delivery_choice/1 with valid data creates a delivery_choice", %{user: user} do
      valid_attrs = %{@valid_attrs | "user_id": user.id}
      assert {:ok, %DeliveryChoice{} = delivery_choice} = Delivery.create_delivery_choice(valid_attrs)
      assert delivery_choice.pickup_location == 42
    end

    test "create_delivery_choice/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Delivery.create_delivery_choice(@invalid_attrs)
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
