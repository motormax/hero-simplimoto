defmodule HeroDigital.IdentityTest do
  use HeroDigital.DataCase

  alias HeroDigital.Identity

  describe "leads" do

    def lead_fixture(attrs \\ %{}) do
      {:ok, lead} =
        attrs
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
