defmodule HeroDigitalWeb.PlateRegistrationDataView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.PlateRegistrationDataView

  def render("index.json", %{plate_registration_data: plate_registration_data}) do
    %{data: render_many(plate_registration_data, PlateRegistrationDataView, "plate_registration_data.json")}
  end

  def render("show.json", %{plate_registration_data: plate_registration_data}) do
    %{data: render_one(plate_registration_data, PlateRegistrationDataView, "plate_registration_data.json")}
  end

  def render("plate_registration_data.json", %{plate_registration_data: plate_registration_data}) do
    %{
      id: plate_registration_data.id,
      lead_id: plate_registration_data.lead_id,
      phone: render_one(plate_registration_data.phone, HeroDigitalWeb.PhoneView, "phone.json", as: :phone),
      email: render_one(plate_registration_data.email, HeroDigitalWeb.EmailView, "email.json", as: :email),
      personal_data: render_one(plate_registration_data.personal_data, HeroDigitalWeb.PersonalDataView, "personal_data.json", as: :personal_data),
      address: render_one(plate_registration_data.address, HeroDigitalWeb.AddressView, "address.json", as: :address),
      plate_registration_type: render_one(plate_registration_data.plate_registration_type, HeroDigitalWeb.PlateRegistrationTypeView, "plate_registration_type.json", as: :plate_registration_type)
    }
  end
end
