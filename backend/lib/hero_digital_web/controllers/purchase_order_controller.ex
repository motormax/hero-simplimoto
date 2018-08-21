defmodule HeroDigitalWeb.PurchaseOrderController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Fulfillment
  alias HeroDigital.Fulfillment.PurchaseOrder
  alias HeroDigital.Identity

  action_fallback HeroDigitalWeb.FallbackController

  def create(conn, %{"lead_id" => lead_id, "credit_card_token" => credit_card_token}) do
    with %Identity.Lead{} = lead <- Identity.get_lead(lead_id),
         {:ok, %PurchaseOrder{} = purchase_order} <- Fulfillment.create_purchase_order_from_lead(lead, credit_card_token) do
      conn
      |> put_status(:created)
      |> render("show.json", purchase_order: purchase_order)
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    purchase_order = Fulfillment.get_purchase_order_for_lead(lead_id)
    render(conn, "show.json", purchase_order: purchase_order)
  end
end
