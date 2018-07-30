defmodule HeroDigitalWeb.PhoneView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.PhoneView

  def render("index.json", %{phones: phones}) do
    %{data: render_many(phones, PhoneView, "phone.json")}
  end

  def render("show.json", %{phone: phone}) do
    %{data: render_one(phone, PhoneView, "phone.json")}
  end

  def render("phone.json", %{phone: phone}) do
    %{
      id: phone.id,
      phone: phone.phone,
    }
  end
end
