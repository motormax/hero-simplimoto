defmodule HeroDigitalWeb.InsuranceChoiceController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Insurance
  alias HeroDigital.Insurance.InsuranceChoice

  action_fallback HeroDigitalWeb.FallbackController

  require Logger

  def create_or_update(conn, %{"lead_id" => lead_id, "insurance_choice" => insurance_choice_params}) do
    with {:ok, %InsuranceChoice{} = insurance_choice} <- Insurance.create_insurance_choice(Map.put(insurance_choice_params, "lead_id", lead_id)) do
      conn
      |> put_status(:created)
      |> render("show.json", insurance_choice: insurance_choice)
    end
  end
end
