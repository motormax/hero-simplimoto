defmodule HeroDigitalWeb.PlateRegistrationTypeController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.PlateRegistration
  alias HeroDigital.PlateRegistration.PlateRegistrationType

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    plate_registration_types = PlateRegistration.list_plate_registration_types()
    render(conn, "index.json", plate_registration_types: plate_registration_types)
  end

end
