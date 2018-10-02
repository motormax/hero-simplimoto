defmodule HeroDigitalWeb.TradeInView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.TradeInView

  def render("index.json", %{trade_ins: trade_ins}) do
    %{data: render_many(trade_ins, TradeInView, "trade_in_data.json")}
  end

  def render("show.json", %{trade_in_data: trade_in_data}) do
    %{data: render_one(trade_in_data, TradeInView, "trade_in_data.json")}
  end

  def render("trade_in_data.json", %{trade_in: trade_in_data}) do
    %{id: trade_in_data.id,
      name: trade_in_data.name,
      email: trade_in_data.email,
      telephone: trade_in_data.telephone,
      brand: trade_in_data.brand,
      model: trade_in_data.model,
      year: trade_in_data.year,
      description: trade_in_data.description}
  end
end
