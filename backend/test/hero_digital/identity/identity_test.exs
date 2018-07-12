defmodule HeroDigital.IdentityTest do
  use HeroDigital.DataCase

  alias HeroDigital.Identity

  describe "leads" do
    alias HeroDigital.Identity.User

    @valid_attrs %{id: "7488a646-e31f-11e4-aace-600308960662"}
    @update_attrs %{id: "7488a646-e31f-11e4-aace-600308960668"}
    @invalid_attrs %{}

    def lead_fixture(attrs \\ %{}) do
      {:ok, lead} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Identity.create_lead()

      lead
    end

    test "list_leads/0 returns all leads" do
      lead = lead_fixture()
      assert Identity.list_leads() == [lead]
    end

    test "get_lead!/1 returns the lead with given id" do
      lead = lead_fixture()
      assert Identity.get_lead!(lead.id) == lead
    end
  end
end
