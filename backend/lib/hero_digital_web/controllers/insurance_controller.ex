defmodule HeroDigitalWeb.InsuranceController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Insurance.QuoteEngine

  action_fallback HeroDigitalWeb.FallbackController

  require Logger

  def quote(conn, %{"motorcycle_id" => motorcycle_id, "query_age" => query_age}) do
    quotes = QuoteEngine.fetch_quotes_by(motorcycle_id, query_age)
    render(conn, "quotes.json", quotes: quotes)
  end

  def quote_v2(conn, %{"query_postal_code" => cp, "motorcycle_id" => motorcycle_id, "query_age" => age}) do
    {:ok, quotes} = HeroDigital.Un23SeguroClient.cotizar(cp, age, motorcycle_id)
    render(conn, "quotes_v2.json", quotes: quotes)
  end
end
