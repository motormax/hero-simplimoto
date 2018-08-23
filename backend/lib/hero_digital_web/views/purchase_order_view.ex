defmodule HeroDigitalWeb.PurchaseOrderView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.PurchaseOrderView

  require Logger

  def render("index.json", %{purchase_orders: purchase_orders}) do
    %{data: render_many(purchase_orders, PurchaseOrderView, "purchase_order.json")}
  end

  def render("show.json", %{purchase_order: purchase_order}) do
    %{data: render_one(purchase_order, PurchaseOrderView, "purchase_order.json")}
  end

  def render("purchase_order.json", %{purchase_order: purchase_order}) do
    Logger.debug "view po is #{inspect(purchase_order.payment.status)}"
    %{id: purchase_order.id,
      status: purchase_order.payment.status,
      status_detail: purchase_order.payment.status_detail,
      user_message: purchase_order.payment.user_message,
      lead_id: purchase_order.lead_id,
    }
  end

  def render("purchase_order_error.json", %{purchase_order: purchase_order}) do
    %{
      status: purchase_order.payment.status,
      status_detail: purchase_order.payment.status_detail,
      user_message: purchase_order.payment.user_message,
    }
  end

end
