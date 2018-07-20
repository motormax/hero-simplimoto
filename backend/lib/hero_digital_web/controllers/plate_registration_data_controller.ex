defmodule HeroDigitalWeb.PlateRegistrationDataController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.PlateRegistration
  alias HeroDigital.PlateRegistration.PlateRegistrationData

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    plate_registration_data = PlateRegistration.list_plate_registration_data()
    render(conn, "index.json", plate_registration_data: plate_registration_data)
  end

  def create(conn, %{"plate_registration_data" => plate_registration_data_params}) do
    with {:ok, %PlateRegistrationData{} = plate_registration_data} <- PlateRegistration.create_plate_registration_data(plate_registration_data_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", plate_registration_data_path(conn, :show, plate_registration_data))
      |> render("show.json", plate_registration_data: plate_registration_data)
    end
  end

  def show(conn, %{"id" => id}) do
    plate_registration_data = PlateRegistration.get_plate_registration_data!(id)
    render(conn, "show.json", plate_registration_data: plate_registration_data)
  end

  def update(conn, %{"id" => id, "plate_registration_data" => plate_registration_data_params}) do
    plate_registration_data = PlateRegistration.get_plate_registration_data!(id)
    with {:ok, %PlateRegistrationData{} = plate_registration_data} <- PlateRegistration.update_plate_registration_data(plate_registration_data, plate_registration_data_params) do
      render(conn, "show.json", plate_registration_data: plate_registration_data)
    end
  end

  def delete(conn, %{"id" => id}) do
    plate_registration_data = PlateRegistration.get_plate_registration_data!(id)
    with {:ok, %PlateRegistrationData{}} <- PlateRegistration.delete_plate_registration_data(plate_registration_data) do
      send_resp(conn, :no_content, "")
    end
  end
end
