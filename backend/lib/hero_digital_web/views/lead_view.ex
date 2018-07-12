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
    %{id: lead.id, last_login: lead.last_login}
  end
end
