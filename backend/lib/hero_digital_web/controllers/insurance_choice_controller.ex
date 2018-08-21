defmodule HeroDigitalWeb.InsuranceChoiceController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Insurance
  alias HeroDigital.Insurance.InsuranceChoice

  action_fallback HeroDigitalWeb.FallbackController

  require Logger

  def create(conn, %{"lead_id" => lead_id, "insurance_choice" => insurance_choice_params}) do
    with {:ok, %InsuranceChoice{} = insurance_choice} <- Insurance.create_insurance_choice(Map.put(insurance_choice_params, "lead_id", lead_id)) do
      conn
      |> put_status(:created)
      |> render("show.json", insurance_choice: insurance_choice)
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    insurance_choice = Insurance.get_insurance_choice_by_lead_id(lead_id)
    render(conn, "show.json", insurance_choice: insurance_choice)
  end
end
