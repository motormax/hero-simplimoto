defmodule HeroDigitalWeb.AccessoryController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Product
  alias HeroDigital.Product.Accessory

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    accessories = Product.list_accessories()
    render(conn, "index.json", accessories: accessories)
  end

  def create(conn, %{"lead_id" => lead_id, "accessory" => accessory_params}) do
    with {:ok, %Accessory{} = accessory} <- Product.create_accessory(Map.put(accessory_params, "lead_id", lead_id)) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", lead_accessory_path(conn, :show, lead_id, accessory.id))
      |> render("show.json", accessory: accessory)
    end
  end

  def show(conn, %{"lead_id" => lead_id, "id" => id}) do
    accessory = Product.get_accessory!(id)
    render(conn, "show.json", accessory: accessory)
  end

  def delete(conn, %{"lead_id" => lead_id, "id" => id}) do
    accessory = Product.get_accessory!(id)
    with {:ok, %Accessory{}} <- Product.delete_accessory(accessory) do
      send_resp(conn, :no_content, "")
    end
  end
end
