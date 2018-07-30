defmodule HeroDigitalWeb.DateAppointmentController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.DateYourBike
  alias HeroDigital.DateYourBike.DateAppointment

  action_fallback HeroDigitalWeb.FallbackController

  def create(conn, %{"lead_id" => lead_id, "date_appointment" => date_appointment_params}) do
    date_appointment_params = Map.put(date_appointment_params, "lead_id", lead_id);
    with {:ok, %DateAppointment{} = date_appointment} <- DateYourBike.create_date_appointment(date_appointment_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", lead_date_appointment_path(conn, :show, lead_id))
      |> render("show.json", date_appointment: date_appointment)
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    date_appointment = DateYourBike.get_date_appointment_for_lead!(lead_id)
    render(conn, "show.json", date_appointment: date_appointment)
  end
end
