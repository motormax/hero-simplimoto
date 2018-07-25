defmodule HeroDigitalWeb.DateAppointmentView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.DateAppointmentView
  alias HeroDigitalWeb.AddressView

  def render("index.json", %{date_appointments: date_appointments}) do
    %{data: render_many(date_appointments, DateAppointmentView, "date_appointment.json")}
  end

  def render("show.json", %{date_appointment: date_appointment}) do
    %{data: render_one(date_appointment, DateAppointmentView, "date_appointment.json")}
  end

  def render("date_appointment.json", %{date_appointment: date_appointment}) do
    %{id: date_appointment.id,
      date: date_appointment.date,
      shift: date_appointment.shift,
      address: render_one(date_appointment.address, AddressView, "address_without_id.json")}
  end
end
