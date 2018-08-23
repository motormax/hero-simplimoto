defmodule HeroDigitalWeb.FinancingDataController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Financing
  alias HeroDigital.Financing.FinancingData

  action_fallback HeroDigitalWeb.FallbackController

  def create(conn, %{"lead_id" => lead_id, "financing_data" => financing_data_params}) do
    with {:ok, %FinancingData{} = financing_data} <- Financing.set_financing_data(lead_id, financing_data_params) do
      conn
      |> put_status(:created)
      |> render("show.json", financing_data: financing_data)
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    financing_data = Financing.get_financing_data_by_lead_id(lead_id)
    render(conn, "show.json", financing_data: financing_data)
  end
end
