defmodule HeroDigitalWeb.AccessoryView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.AccessoryView

  def render("index.json", %{accessories: accessories}) do
    %{data: render_many(accessories, AccessoryView, "accessory.json")}
  end

  def render("show.json", %{accessory: accessory}) do
    %{data: render_one(accessory, AccessoryView, "accessory.json")}
  end

  def render("accessory.json", %{accessory: accessory}) do
    %{
      id: accessory.id,
      name: accessory.name,
      price: accessory.price,
      description: accessory.description,
      logo_url: accessory.logo_url,
    }
  end
end
