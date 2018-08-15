defmodule HeroDigitalWeb.InsuranceQuoteChosenController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Insurance
  alias HeroDigital.Insurance.InsuranceQuoteChosen

  action_fallback HeroDigitalWeb.FallbackController

  require Logger

  def create_or_update(conn, %{"lead_id" => lead_id, "insurance_quote_chosen" => insurance_quote_chosen_params}) do
    with {:ok, %InsuranceQuoteChosen{} = insurance_quote_chosen} <- Insurance.create_insurance_quote_chosen(Map.put(insurance_quote_chosen_params, "lead_id", lead_id)) do
      conn
      |> put_status(:created)
      |> render("show.json", insurance_quote_chosen: insurance_quote_chosen)
    end
  end
end
