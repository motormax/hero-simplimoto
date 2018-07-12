defmodule HeroDigital.UserDataTest do
  use HeroDigital.DataCase

  alias HeroDigital.UserData
  alias HeroDigital.Identity

  describe "addresses" do
    alias HeroDigital.UserData.Address

    @valid_attrs %{
      user_id: nil,
      complements: "some complements",
      number: "some number",
      postal_code: "some postal_code",
      street: "some street",
      telephone_number: "some telephone_number",
      town: "some town"
    }
    @invalid_attrs %{
      user_id: nil,
      complements: nil,
      number: nil,
      postal_code: nil,
      street: nil,
      telephone_number: nil,
      town: nil
    }

    setup do
      {:ok, user} = Identity.create_user()
      %{user: user}
    end

    def address_fixture(attrs \\ %{}) do
      {:ok, user} = Identity.create_user()
      valid_attrs = %{@valid_attrs | "user_id": user.id}
      {:ok, address} =
        attrs
        |> Enum.into(valid_attrs)
        |> UserData.create_address()

      address
    end

    test "list_addresses/0 returns all addresses" do
      address = address_fixture()
      assert UserData.list_addresses() == [address]
    end

    test "get_address!/1 returns the address with given id" do
      address = address_fixture()
      assert UserData.get_address!(address.id) == address
    end

    test "create_address/1 with valid data creates a address", %{user: user} do
      valid_attrs = %{@valid_attrs | "user_id": user.id}
      assert {:ok, %Address{} = address} = UserData.create_address(valid_attrs)
      assert address.complements == "some complements"
      assert address.number == "some number"
      assert address.postal_code == "some postal_code"
      assert address.street == "some street"
      assert address.telephone_number == "some telephone_number"
      assert address.town == "some town"
    end

    test "create_address/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = UserData.create_address(@invalid_attrs)
    end

    test "delete_address/1 deletes the address" do
      address = address_fixture()
      assert {:ok, %Address{}} = UserData.delete_address(address)
      assert_raise Ecto.NoResultsError, fn -> UserData.get_address!(address.id) end
    end

    test "change_address/1 returns a address changeset" do
      address = address_fixture()
      assert %Ecto.Changeset{} = UserData.change_address(address)
    end
  end
end
