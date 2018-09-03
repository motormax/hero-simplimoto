defmodule HeroDigitalWeb.PlateRegistrationTypeView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.PlateRegistrationTypeView

  def render("index.json", %{plate_registration_types: plate_registration_types}) do
    %{data: render_many(plate_registration_types, PlateRegistrationTypeView, "plate_registration_type.json")}
  end

  def render("show.json", %{plate_registration_type: plate_registration_type}) do
    %{data: render_one(plate_registration_type, PlateRegistrationTypeView, "plate_registration_type.json")}
  end

  def render("plate_registration_type.json", %{plate_registration_type: plate_registration_type}) do
    %{
      name: plate_registration_type.name,
      price: plate_registration_type.price,
    }
  end
end
