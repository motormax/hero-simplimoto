defmodule HeroDigitalWeb.InsuranceController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Insurance.QuoteEngine

  action_fallback HeroDigitalWeb.FallbackController

  require Logger

  def quote(conn, %{"motorcycle_id" => motorcycle_id, "postalCode" => postalCode, "age" => age}) do
    quotes = QuoteEngine.fetch_quotes_by(motorcycle_id, postalCode , age)
    render(conn, "quotes.json", quotes: quotes)
  end
end
