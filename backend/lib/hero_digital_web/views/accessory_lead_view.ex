defmodule HeroDigitalWeb.AccessoryLeadView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.LeadView
  alias HeroDigitalWeb.AccessoryView


  def render("index.json", %{accessories: accessories}) do
    %{data: render_many(accessories, AccessoryView, "accessory.json")}
  end

  def render("show.json", %{lead: lead}) do
    %{data: render_one(lead, LeadView, "lead.json")}
  end
end
