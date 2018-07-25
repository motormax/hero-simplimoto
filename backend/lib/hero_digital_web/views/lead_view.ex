defmodule HeroDigitalWeb.LeadView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.LeadView

  def render("index.json", %{leads: leads}) do
    %{data: render_many(leads, LeadView, "lead.json")}
  end

  def render("show.json", %{lead: lead}) do
    %{data: render_one(lead, LeadView, "lead.json")}
  end

  def render("lead.json", %{lead: lead}) do
    %{
      id: lead.id,
      last_login: lead.last_login,
      motorcycle: render_one(lead.motorcycle, LeadView, "motorcycle.json", as: :motorcycle)
    }
  end

  def render("show.json", %{motorcycle: motorcycle}) do
    %{data: render_one(motorcycle, LeadView, "motorcycle.json")}
  end

  def render("motorcycle.json", %{motorcycle: motorcycle}) do
    %{
      id: motorcycle.id,
      name: motorcycle.name,
      price: motorcycle.price,
    }
  end
end
