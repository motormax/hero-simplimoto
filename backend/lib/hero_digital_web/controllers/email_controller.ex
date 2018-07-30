defmodule HeroDigitalWeb.EmailController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.UserData
  alias HeroDigital.UserData.Email

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    email = UserData.list_email()
    render(conn, "index.json", email: email)
  end

  def create(conn, %{"email" => email_params}) do
    with {:ok, %Email{} = email} <- UserData.create_email(email_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", email_path(conn, :show, email))
      |> render("show.json", email: email)
    end
  end

  def show(conn, %{"id" => id}) do
    email = UserData.get_email!(id)
    render(conn, "show.json", email: email)
  end
end
