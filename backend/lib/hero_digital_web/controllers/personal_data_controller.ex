defmodule HeroDigitalWeb.PersonalDataController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.UserData
  alias HeroDigital.UserData.PersonalData

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    personal_data = UserData.list_personal_data()
    render(conn, "index.json", personal_data: personal_data)
  end

  def create(conn, %{"personal_data" => personal_data_params}) do
    with {:ok, %PersonalData{} = personal_data} <- UserData.create_personal_data(personal_data_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", personal_data_path(conn, :show, personal_data))
      |> render("show.json", personal_data: personal_data)
    end
  end

  def show(conn, %{"id" => id}) do
    personal_data = UserData.get_personal_data!(id)
    render(conn, "show.json", personal_data: personal_data)
  end

  def update(conn, %{"id" => id, "personal_data" => personal_data_params}) do
    personal_data = UserData.get_personal_data!(id)

    with {:ok, %PersonalData{} = personal_data} <- UserData.update_personal_data(personal_data, personal_data_params) do
      render(conn, "show.json", personal_data: personal_data)
    end
  end

  def delete(conn, %{"id" => id}) do
    personal_data = UserData.get_personal_data!(id)
    with {:ok, %PersonalData{}} <- UserData.delete_personal_data(personal_data) do
      send_resp(conn, :no_content, "")
    end
  end
end
