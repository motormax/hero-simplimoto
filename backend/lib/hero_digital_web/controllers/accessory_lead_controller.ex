defmodule HeroDigitalWeb.AccessoryLeadController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Product
  alias HeroDigital.Identity

  action_fallback HeroDigitalWeb.FallbackController

  def create(conn, %{"lead_id" => lead_id, "accessory_id" => accessory_id}) do
    lead = Identity.get_lead!(lead_id)
    accessory = Product.get_accessory!(accessory_id)
    with {:ok, _lead} <- Product.add_accessory_to_lead(lead, accessory) do
      conn
      |> send_resp(:created, "")
    end
  end

  def delete(conn, %{"lead_id" => lead_id, "accessory_id" => accessory_id}) do
    lead = Identity.get_lead!(lead_id)
    accessory = Product.get_accessory!(accessory_id)
    with {:ok, _lead} <- Product.delete_accessory_from_lead(lead, accessory) do
      conn
      |> send_resp(:ok, "")
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    lead = Identity.get_lead!(lead_id)
    render(conn, "index.json", accessories: lead.accessories)
  end
end
