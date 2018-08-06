defmodule HeroDigitalWeb.InsuranceQuoteChosenView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.InsuranceQuoteChosenView

  def render("index.json", %{insuarnce_quotes_chosen: insuarnce_quotes_chosen}) do
    %{data: render_many(insuarnce_quotes_chosen, InsuranceQuoteChosenView, "insurance_quote_chosen.json")}
  end

  def render("show.json", %{insurance_quote_chosen: insurance_quote_chosen}) do
    %{data: render_one(insurance_quote_chosen, InsuranceQuoteChosenView, "insurance_quote_chosen.json")}
  end

  def render("insurance_quote_chosen.json", %{insurance_quote_chosen: insurance_quote_chosen}) do
    %{id: insurance_quote_chosen.id}
  end
end
