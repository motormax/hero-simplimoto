defmodule HeroDigitalWeb.PurchaseOrderView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.PurchaseOrderView

  def render("index.json", %{purchase_orders: purchase_orders}) do
    %{data: render_many(purchase_orders, PurchaseOrderView, "purchase_order.json")}
  end

  def render("show.json", %{purchase_order: purchase_order}) do
    %{data: render_one(purchase_order, PurchaseOrderView, "purchase_order.json")}
  end

  def render("purchase_order.json", %{purchase_order: purchase_order}) do
    %{id: purchase_order.id,
      price: purchase_order.price,
      lead_id: purchase_order.lead_id,
      phone: purchase_order.phone,
      email: purchase_order.email}
  end
end
