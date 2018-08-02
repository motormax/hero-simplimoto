defmodule HeroDigitalWeb.InsuranceController do
  use HeroDigitalWeb, :controller

  action_fallback HeroDigitalWeb.FallbackController

  alias HeroDigital.Insurance.QuoteEngine

  require Logger

  def update(conn, params) do
    json conn, %{status: "success"}
  end

  def opt_out(conn, params) do
    json conn, %{status: "success"}
  end

  def quote(conn, %{"motorcycle_id" => motorcycle_id, "postalCode" => postalCode, "age" => age}) do

    quotes = QuoteEngine.fetch_quotes_by(motorcycle_id, postalCode , age)

    render(conn, "quotes.json", quotes: quotes)
  end
end
