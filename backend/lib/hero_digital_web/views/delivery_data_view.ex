defmodule HeroDigitalWeb.DeliveryDataView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.DeliveryDataView

  def render("index.json", %{delivery_data: delivery_data}) do
    %{data: render_many(delivery_data, DeliveryDataView, "delivery_data.json")}
  end

  def render("show.json", %{delivery_data: delivery_data}) do
    %{data: render_one(delivery_data, DeliveryDataView, "delivery_data.json")}
  end

  def render("delivery_data.json", %{delivery_data: delivery_data}) do
    %{id: delivery_data.id,
      address: delivery_data.address,
      town: delivery_data.town,
      postal_code: delivery_data.postal_code,
      telephone_number: delivery_data.telephone_number}
  end
end
