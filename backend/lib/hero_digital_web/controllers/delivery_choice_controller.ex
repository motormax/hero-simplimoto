defmodule HeroDigitalWeb.DeliveryChoiceController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Delivery
  alias HeroDigital.Delivery.DeliveryChoice

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    delivery_choices = Delivery.list_delivery_choices()
    render(conn, "index.json", delivery_choices: delivery_choices)
  end

  def create(conn, %{"lead_id" => lead_id, "delivery_choice" => delivery_choice_params}) do
    with {:ok, %DeliveryChoice{} = delivery_choice} <- Delivery.create_delivery_choice(Map.put(delivery_choice_params, "lead_id", lead_id)) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", lead_delivery_choice_path(conn, :show, delivery_choice))
      |> render("show.json", delivery_choice: delivery_choice)
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    delivery_choice = Delivery.get_delivery_choice_for_lead(lead_id)
    render(conn, "show.json", delivery_choice: delivery_choice)
  end
end
