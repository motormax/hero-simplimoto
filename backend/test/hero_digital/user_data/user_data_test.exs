defmodule HeroDigital.UserDataTest do
  use HeroDigital.DataCase

  alias HeroDigital.UserData

  describe "delivery_data" do
    alias HeroDigital.UserData.DeliveryData

    @valid_attrs %{address: "some address", postal_code: "some postal_code", telephone_number: "some telephone_number", town: "some town"}
    @update_attrs %{address: "some updated address", postal_code: "some updated postal_code", telephone_number: "some updated telephone_number", town: "some updated town"}
    @invalid_attrs %{address: nil, postal_code: nil, telephone_number: nil, town: nil}

    def delivery_data_fixture(attrs \\ %{}) do
      {:ok, delivery_data} =
        attrs
        |> Enum.into(@valid_attrs)
        |> UserData.create_delivery_data()

      delivery_data
    end

    test "list_delivery_data/0 returns all delivery_data" do
      delivery_data = delivery_data_fixture()
      assert UserData.list_delivery_data() == [delivery_data]
    end

    test "get_delivery_data!/1 returns the delivery_data with given id" do
      delivery_data = delivery_data_fixture()
      assert UserData.get_delivery_data!(delivery_data.id) == delivery_data
    end

    test "create_delivery_data/1 with valid data creates a delivery_data" do
      assert {:ok, %DeliveryData{} = delivery_data} = UserData.create_delivery_data(@valid_attrs)
      assert delivery_data.address == "some address"
      assert delivery_data.postal_code == "some postal_code"
      assert delivery_data.telephone_number == "some telephone_number"
      assert delivery_data.town == "some town"
    end

    test "create_delivery_data/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = UserData.create_delivery_data(@invalid_attrs)
    end

    test "update_delivery_data/2 with valid data updates the delivery_data" do
      delivery_data = delivery_data_fixture()
      assert {:ok, delivery_data} = UserData.update_delivery_data(delivery_data, @update_attrs)
      assert %DeliveryData{} = delivery_data
      assert delivery_data.address == "some updated address"
      assert delivery_data.postal_code == "some updated postal_code"
      assert delivery_data.telephone_number == "some updated telephone_number"
      assert delivery_data.town == "some updated town"
    end

    test "update_delivery_data/2 with invalid data returns error changeset" do
      delivery_data = delivery_data_fixture()
      assert {:error, %Ecto.Changeset{}} = UserData.update_delivery_data(delivery_data, @invalid_attrs)
      assert delivery_data == UserData.get_delivery_data!(delivery_data.id)
    end

    test "delete_delivery_data/1 deletes the delivery_data" do
      delivery_data = delivery_data_fixture()
      assert {:ok, %DeliveryData{}} = UserData.delete_delivery_data(delivery_data)
      assert_raise Ecto.NoResultsError, fn -> UserData.get_delivery_data!(delivery_data.id) end
    end

    test "change_delivery_data/1 returns a delivery_data changeset" do
      delivery_data = delivery_data_fixture()
      assert %Ecto.Changeset{} = UserData.change_delivery_data(delivery_data)
    end
  end
end
