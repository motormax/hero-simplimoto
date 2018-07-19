defmodule HeroDigitalWeb.DeliveryChoiceController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Delivery
  alias HeroDigital.Delivery.DeliveryChoice

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    delivery_choices = Delivery.list_delivery_choices()
    render(conn, "index.json", delivery_choices: delivery_choices)
  end

  def create(conn, %{"user_id" => user_id, "delivery_choice" => delivery_choice_params}) do
    IO.inspect(user_id)
    IO.inspect(delivery_choice_params)
    with {:ok, %DeliveryChoice{} = delivery_choice} <- Delivery.create_delivery_choice(Map.put(delivery_choice_params, "user_id", user_id)) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_delivery_choice_path(conn, :show, delivery_choice))
      |> render("show.json", delivery_choice: delivery_choice)
    end
  end

  def show(conn, %{"user_id" => user_id}) do
    delivery_choice = Delivery.get_delivery_choice_for_user(user_id)
    render(conn, "show.json", delivery_choice: delivery_choice)
  end

  def update(conn, %{"id" => id, "delivery_choice" => delivery_choice_params}) do
    delivery_choice = Delivery.get_delivery_choice!(id)

    with {:ok, %DeliveryChoice{} = delivery_choice} <- Delivery.update_delivery_choice(delivery_choice, delivery_choice_params) do
      render(conn, "show.json", delivery_choice: delivery_choice)
    end
  end

  def delete(conn, %{"id" => id}) do
    delivery_choice = Delivery.get_delivery_choice!(id)
    with {:ok, %DeliveryChoice{}} <- Delivery.delete_delivery_choice(delivery_choice) do
      send_resp(conn, :no_content, "")
    end
  end
end
