defmodule HeroDigitalWeb.AddressView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.AddressView

  def render("index.json", %{addresses: addresses}) do
    %{data: render_many(addresses, AddressView, "address.json")}
  end

  def render("show.json", %{address: address}) do
    %{data: render_one(address, AddressView, "address.json")}
  end

  def render("address.json", %{address: address}) do
    %{id: address.id,
      street: address.street,
      number: address.number,
      complements: address.complements,
      town: address.town,
      postal_code: address.postal_code,
      telephone_number: address.telephone_number}
  end
end
