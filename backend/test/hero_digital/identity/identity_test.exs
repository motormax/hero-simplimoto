defmodule HeroDigital.IdentityTest do
  use HeroDigital.DataCase

  alias HeroDigital.Identity
  alias HeroDigital.Product
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Factory

  describe "leads" do
    alias HeroDigital.Identity.Lead

    @invalid_attrs %{}

    def lead_fixture(attrs \\ %{}) do
      {:ok, lead} =
        attrs
        |> Identity.create_lead()

      lead
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      %{motorcycle: motorcycle}
    end

    test "create_lead/1 with valid data creates a lead", %{motorcycle: motorcycle} do
      assert {:ok, %Lead{} = lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
      assert lead.motorcycle.id == motorcycle.id
    end

    test "create_lead/1 with valid data creates a lead and if the db has non accessories,
    lead has none", %{motorcycle: motorcycle} do
      {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})

      lead_accessories = Product.lead_accessories(lead.id)

      assert length(lead_accessories) == 0
    end

    test "create_lead/1 with valid data creates a lead and if the db has one or more accessories,
    the new lead has all of them", %{motorcycle: motorcycle} do
      an_accessory = Factory.new_accessory()
      another_accessory = Factory.new_different_accessory()
      {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})

      lead_accessories = Product.lead_accessories(lead.id)

      assert lead_accessories == [an_accessory, another_accessory]
    end

    test "create_lead/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Identity.create_lead(@invalid_attrs)
    end

    test "get_lead!/1 returns the lead with given id", %{motorcycle: motorcycle}  do
      lead = lead_fixture(%{motorcycle_id: motorcycle.id})
      assert Identity.get_lead!(lead.id) == %{lead | motorcycle: motorcycle}
    end
  end
end
