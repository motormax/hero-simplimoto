defmodule HeroDigitalWeb.TradeInController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.TradeIn
  alias HeroDigital.TradeIn.TradeInData

  action_fallback HeroDigitalWeb.FallbackController

  def create(conn, %{"lead_id" => lead_id, "trade_in_data" => trade_in_data_params}) do
    trade_in_data_params = Map.put(trade_in_data_params, "lead_id", lead_id);
    with {:ok, %TradeInData{} = trade_in_data} <- TradeIn.create_trade_in_data(trade_in_data_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", lead_trade_in_path(conn, :show, lead_id))
      |> render("show.json", trade_in_data: trade_in_data)
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    trade_in_data = TradeIn.get_trade_for_lead!(lead_id)
    render(conn, "show.json", trade_in_data: trade_in_data)
  end

end
