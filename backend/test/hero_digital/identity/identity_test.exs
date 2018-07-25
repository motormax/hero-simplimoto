defmodule HeroDigital.IdentityTest do
  use HeroDigital.DataCase

  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  describe "leads" do
    alias HeroDigital.Identity.Lead

    @valid_attrs %{}
    @invalid_attrs %{}

    def lead_fixture(attrs \\ %{}) do
      {:ok, lead} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Identity.create_lead()

      lead
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      %{motorcycle: motorcycle}
    end

    test "create_lead/1 with valid data creates a lead", %{motorcycle: motorcycle} do
      assert {:ok, %Lead{} = lead} = Identity.create_lead(Map.put(@valid_attrs, :motorcycle_id, motorcycle.id))
      assert lead.motorcycle.id == motorcycle.id
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
