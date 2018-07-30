defmodule HeroDigitalWeb.PlateRegistrationDataController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.PlateRegistration
  alias HeroDigital.PlateRegistration.PlateRegistrationData

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    plate_registration_data = PlateRegistration.list_plate_registration_data()
    render(conn, "index.json", plate_registration_data: plate_registration_data)
  end

  def create(conn, %{"lead_id" => lead_id ,"plate_registration_data" => plate_registration_data_params}) do
    with {:ok, %PlateRegistrationData{} = plate_registration_data} <- PlateRegistration.create_plate_registration_data(plate_registration_data_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", lead_plate_registration_data_path(conn, :show, lead_id))
      |> render("show.json", plate_registration_data: plate_registration_data)
    end
  end

  def show(conn, %{"lead_id" => lead_id}) do
    plate_registration_data = PlateRegistration.get_plate_registration_data_for_lead!(lead_id)
    render(conn, "show.json", plate_registration_data: plate_registration_data)
  end
end
