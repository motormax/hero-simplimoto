defmodule HeroDigitalWeb.AccessoryLeadControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Product
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity
  alias HeroDigital.Factory
  alias Decimal

  def fixture(attrs \\ %{}) do
    {:ok, accessory} = Product.create_accessory(attrs)
    accessory
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "lead accessory association" do

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    setup do
      accessory = Factory.new_accessory()
      %{accessory: accessory}
    end

    test "can add an accessory to lead", %{lead: lead, accessory: accessory, conn: conn} do
      post conn, lead_accessory_lead_path(conn, :create, lead.id, accessory.id)
      lead = Identity.get_lead!(lead.id)

      assert lead.accessories == [accessory]
    end

    test "adding an accessory more than one to a lead does not add it", %{lead: lead, accessory: accessory, conn: conn} do
      post conn, lead_accessory_lead_path(conn, :create, lead.id, accessory.id)
      post conn, lead_accessory_lead_path(conn, :create, lead.id, accessory.id)
      lead = Identity.get_lead!(lead.id)

      assert lead.accessories == [accessory]
      assert Product.lead_accessories(lead.id) == [accessory]
    end

    test "can delete accessory to lead", %{lead: lead, accessory: accessory, conn: conn} do
      post conn, lead_accessory_lead_path(conn, :create, lead.id, accessory.id)
      delete conn, lead_accessory_lead_path(conn, :delete, lead.id, accessory.id)

      assert Product.lead_accessories(lead.id) == []
    end

    test "delete accessory to lead that lead does not have does nothing", %{lead: lead, accessory: accessory, conn: conn} do
      delete conn, lead_accessory_lead_path(conn, :delete, lead.id, accessory.id)

      assert Product.lead_accessories(lead.id) == []
    end

    test "getting all accessories from a lead without accessories returns empty list", %{lead: lead, conn: conn} do
      conn = get conn, lead_accessory_lead_path(conn, :show, lead.id)
      lead_accessories = json_response(conn, 200)["data"]

      assert lead_accessories == []
    end

    test "getting all accessories from a lead with accessories returns them list", %{lead: lead, accessory: accessory, conn: conn} do
      post conn, lead_accessory_lead_path(conn, :create, lead.id, accessory.id)
      conn = get conn, lead_accessory_lead_path(conn, :show, lead.id)
      lead_accessories = json_response(conn, 200)["data"]
      json_accessory = Enum.at(lead_accessories, 0)

      assert length(lead_accessories) == 1
      assert json_accessory["id"] == accessory.id
      assert json_accessory["description"] == accessory.description
      assert json_accessory["logo_url"] == accessory.logo_url
      assert json_accessory["name"] == accessory.name
      assert Decimal.new(json_accessory["price"]) == accessory.price
    end
  end
end
