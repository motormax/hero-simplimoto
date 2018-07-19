defmodule HeroDigitalWeb.DateAppointmentController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.DateYourBike
  alias HeroDigital.DateYourBike.DateAppointment

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    date_appointments = DateYourBike.list_date_appointments()
    render(conn, "index.json", date_appointments: date_appointments)
  end

  def create(conn, %{"date_appointment" => date_appointment_params}) do
    with {:ok, %DateAppointment{} = date_appointment} <- DateYourBike.create_date_appointment(date_appointment_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", date_appointment_path(conn, :show, date_appointment))
      |> render("show.json", date_appointment: date_appointment)
    end
  end

  def show(conn, %{"id" => id}) do
    date_appointment = DateYourBike.get_date_appointment!(id)
    render(conn, "show.json", date_appointment: date_appointment)
  end

  def update(conn, %{"id" => id, "date_appointment" => date_appointment_params}) do
    date_appointment = DateYourBike.get_date_appointment!(id)

    with {:ok, %DateAppointment{} = date_appointment} <- DateYourBike.update_date_appointment(date_appointment, date_appointment_params) do
      render(conn, "show.json", date_appointment: date_appointment)
    end
  end

  def delete(conn, %{"id" => id}) do
    date_appointment = DateYourBike.get_date_appointment!(id)
    with {:ok, %DateAppointment{}} <- DateYourBike.delete_date_appointment(date_appointment) do
      send_resp(conn, :no_content, "")
    end
  end
end
