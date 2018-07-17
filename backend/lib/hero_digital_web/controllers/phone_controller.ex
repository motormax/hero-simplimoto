defmodule HeroDigitalWeb.PhoneController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.UserData
  alias HeroDigital.UserData.Phone

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    phones = UserData.list_phones()
    render(conn, "index.json", phones: phones)
  end

  def create(conn, %{"phone" => phone_params}) do
    with {:ok, %Phone{} = phone} <- UserData.create_phone(phone_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", phone_path(conn, :show, phone))
      |> render("show.json", phone: phone)
    end
  end

  def show(conn, %{"id" => id}) do
    phone = UserData.get_phone!(id)
    render(conn, "show.json", phone: phone)
  end

  def update(conn, %{"id" => id, "phone" => phone_params}) do
    phone = UserData.get_phone!(id)

    with {:ok, %Phone{} = phone} <- UserData.update_phone(phone, phone_params) do
      render(conn, "show.json", phone: phone)
    end
  end

  def delete(conn, %{"id" => id}) do
    phone = UserData.get_phone!(id)
    with {:ok, %Phone{}} <- UserData.delete_phone(phone) do
      send_resp(conn, :no_content, "")
    end
  end
end
