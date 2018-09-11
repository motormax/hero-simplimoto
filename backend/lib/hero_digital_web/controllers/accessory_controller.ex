defmodule HeroDigitalWeb.AccessoryController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Product
  alias HeroDigital.Product.Accessory

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    accessories = Product.list_accessories()
    render(conn, "index.json", accessories: accessories)
  end

  def show(conn, %{"id" => id}) do
    accessory = Product.get_accessory!(id)
    render(conn, "show.json", accessory: accessory)
  end
end
