defmodule HeroDigitalWeb.InsuranceController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Insurance.QuoteEngine

  action_fallback HeroDigitalWeb.FallbackController

  require Logger

  def quote(conn, %{"motorcycle_id" => motorcycle_id, "query_age" => query_age}) do
    quotes = QuoteEngine.fetch_quotes_by(motorcycle_id, query_age)
    render(conn, "quotes.json", quotes: quotes)
  end
end
