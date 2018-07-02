defmodule HeroDigitalWeb.DeliveryDataController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.UserData
  alias HeroDigital.UserData.DeliveryData

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    delivery_data = UserData.list_delivery_data()
    render(conn, "index.json", delivery_data: delivery_data)
  end

  def create(conn, %{"delivery_data" => delivery_data_params}) do
    with {:ok, %DeliveryData{} = delivery_data} <- UserData.create_delivery_data(delivery_data_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", delivery_data_path(conn, :show, delivery_data))
      |> render("show.json", delivery_data: delivery_data)
    end
  end

  def show(conn, %{"id" => id}) do
    delivery_data = UserData.get_delivery_data!(id)
    render(conn, "show.json", delivery_data: delivery_data)
  end

  def update(conn, %{"id" => id, "delivery_data" => delivery_data_params}) do
    delivery_data = UserData.get_delivery_data!(id)

    with {:ok, %DeliveryData{} = delivery_data} <- UserData.update_delivery_data(delivery_data, delivery_data_params) do
      render(conn, "show.json", delivery_data: delivery_data)
    end
  end

  def delete(conn, %{"id" => id}) do
    delivery_data = UserData.get_delivery_data!(id)
    with {:ok, %DeliveryData{}} <- UserData.delete_delivery_data(delivery_data) do
      send_resp(conn, :no_content, "")
    end
  end
end
