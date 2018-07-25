defmodule HeroDigitalWeb.DateAppointmentController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.DateYourBike
  alias HeroDigital.DateYourBike.DateAppointment

  action_fallback HeroDigitalWeb.FallbackController

  def create(conn, %{"user_id" => user_id, "date_appointment" => date_appointment_params}) do
    date_appointment_params = Map.put(date_appointment_params, "user_id", user_id);
    with {:ok, %DateAppointment{} = date_appointment} <- DateYourBike.create_date_appointment(date_appointment_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_date_appointment_path(conn, :show, user_id))
      |> render("show.json", date_appointment: date_appointment)
    end
  end

  def show(conn, %{"user_id" => user_id}) do
    date_appointment = DateYourBike.get_date_appointment_for_user!(user_id)
    render(conn, "show.json", date_appointment: date_appointment)
  end
end
