defmodule HeroDigitalWeb.DeliveryChoiceView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.DeliveryChoiceView

  def render("index.json", %{delivery_choices: delivery_choices}) do
    %{data: render_many(delivery_choices, DeliveryChoiceView, "delivery_choice.json")}
  end

  def render("show.json", %{delivery_choice: delivery_choice}) do
    %{data: render_one(delivery_choice, DeliveryChoiceView, "delivery_choice.json")}
  end

  def render("delivery_choice.json", %{delivery_choice: delivery_choice}) do
    if !delivery_choice.address do
      %{
        id: delivery_choice.id,
        pickup_location: delivery_choice.pickup_location,
        address: nil
      }
    else
      %{
        id: delivery_choice.id,
        pickup_location: nil,
        address: HeroDigitalWeb.AddressView.render("address_without_id.json", %{address: delivery_choice.address})
      }
    end
  end
end
