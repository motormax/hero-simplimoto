defmodule HeroDigital.ProductTest do
  use HeroDigital.DataCase

  alias HeroDigital.Product
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity

  describe "accessories" do
    alias HeroDigital.Product.Accessory

    @valid_attrs %{description: "some description", logo_url: "some logo_url", name: "some name", price: "120.5"}
    @update_attrs %{description: "some updated description", logo_url: "some updated logo_url", name: "some updated name", price: "456.7"}
    @invalid_attrs %{description: nil, logo_url: nil, name: nil, price: nil}

    def accessory_fixture(attrs \\ %{}) do
      {:ok, accessory} =
        attrs
        |> Product.create_accessory()

      accessory
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
      %{lead: lead}
    end

    test "list_accessories/0 returns all accessories", %{lead: lead} do
      accessory = accessory_fixture(Map.put(@valid_attrs, :lead_id, lead.id))
      assert Product.list_accessories() == [accessory]
    end

    test "get_accessory!/1 returns the accessory with given id", %{lead: lead} do
      accessory = accessory_fixture(Map.put(@valid_attrs, :lead_id, lead.id))
      assert Product.get_accessory!(accessory.id) == accessory
    end

    test "create_accessory/1 with valid data creates a accessory", %{lead: lead} do
      assert {:ok, %Accessory{} = accessory} = Product.create_accessory(Map.put(@valid_attrs, :lead_id, lead.id))
      assert accessory.description == "some description"
      assert accessory.logo_url == "some logo_url"
      assert accessory.name == "some name"
      assert accessory.price == Decimal.new("120.5")
    end

    test "create_accessory/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Product.create_accessory(@invalid_attrs)
    end

    test "delete_accessory/1 deletes the accessory", %{lead: lead} do
      accessory = accessory_fixture(Map.put(@valid_attrs, :lead_id, lead.id))
      assert {:ok, %Accessory{}} = Product.delete_accessory(accessory)
      assert_raise Ecto.NoResultsError, fn -> Product.get_accessory!(accessory.id) end
    end
  end
end
