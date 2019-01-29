defmodule HeroDigitalWeb.InsuranceView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.InsuranceView

  def render("quotes.json", %{quotes: quotes}) do
    %{data: render_many(quotes, InsuranceView, "quote.json")}
  end

  def render("quotes_v2.json", %{quotes: quotes}) do
    %{data: render_one(quotes, InsuranceView, "quote_v2.json")}
  end

  def render("show.json", %{quote: a_quote}) do
    %{data: render_one(a_quote, InsuranceView, "quote.json")}
  end

  def render("quote.json", %{insurance: a_quote}) do
    a_quote
  end

  def render("quote_v2.json", %{insurance: insurance}) do
    insurance
  end
end
