defmodule HeroDigital.ProductTest do
  use HeroDigital.DataCase

  alias HeroDigital.Product
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity
  alias HeroDigital.Factory

  @valid_accessory_attrs %{description: "some description", logo_url: "some logo_url", name: "some name", price: "120.5"}

  def accessory_attrs() do
    @valid_accessory_attrs
  end

  describe "accessories" do
    alias HeroDigital.Product.Accessory

    @invalid_accessory_attrs %{description: nil, logo_url: nil, name: nil, price: nil}

    def accessory_fixture(attrs \\ %{}) do
      {:ok, accessory} =
        attrs
        |> Product.create_accessory()

      accessory
    end

    test "list_accessories/0 returns all accessories" do
      accessory = accessory_fixture(@valid_accessory_attrs)
      assert Product.list_accessories() == [accessory]
    end

    test "get_accessory!/1 returns the accessory with given id" do
      accessory = accessory_fixture(@valid_accessory_attrs)
      assert Product.get_accessory!(accessory.id) == accessory
    end

    test "create_accessory/1 with valid data creates a accessory" do
      assert {:ok, %Accessory{} = accessory} = Product.create_accessory(@valid_accessory_attrs)
      assert accessory.description == "some description"
      assert accessory.logo_url == "some logo_url"
      assert accessory.name == "some name"
      assert accessory.price == Decimal.new("120.5")
    end

    test "create_accessory/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Product.create_accessory(@invalid_accessory_attrs)
    end

    test "delete_accessory/1 deletes the accessory" do
      accessory = accessory_fixture(@valid_accessory_attrs)
      assert {:ok, %Accessory{}} = Product.delete_accessory(accessory)
      assert_raise Ecto.NoResultsError, fn -> Product.get_accessory!(accessory.id) end
    end
  end

  describe "accessories and leads association" do

    def lead_fixture(attrs \\ %{}) do
      {:ok, lead} =
        attrs
        |> Identity.create_lead()

      lead
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      lead = lead_fixture(%{motorcycle_id: motorcycle.id})
      %{lead: lead}
    end

    setup do
      accessory = Factory.new_accessory()
      %{accessory: accessory}
    end

    test "leads with no accessories get and empty list", %{lead: lead} do

      assert Product.lead_accessories(lead.id) == []
    end

    test "leads can get an accessory", %{lead: lead, accessory: accessory} do

      Product.add_accessory_to_lead(lead, accessory)

      assert Product.lead_accessories(lead.id) == [accessory]
    end

    test "leads can get more than one accessory by once", %{lead: lead, accessory: accessory} do
      {:ok, second_accessory} = Product.create_accessory(%{description: "different description", logo_url: "different logo_url", name: "different name", price: "200.7"})

      Product.add_accessories_to_lead(lead, [accessory, second_accessory])

      assert Product.lead_accessories(lead.id) == [accessory, second_accessory]
    end

    test "leads trying to get the same accesory more than once raise exception", %{lead: lead, accessory: accessory} do
      assert_raise Postgrex.Error, fn ->
        Product.add_accessories_to_lead(lead, [accessory, accessory])
      end
    end

    test "leads can delete an accessory", %{lead: lead, accessory: accessory} do
      Product.add_accessory_to_lead(lead, accessory)

      {:ok, updated_lead} = Product.delete_accessory_from_lead(lead, accessory)

      # TODO: Reload lead from DB and assert the association has been deleted
      assert updated_lead.accessories == []
    end
  end
end
