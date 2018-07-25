defmodule HeroDigitalWeb.UserController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Identity
  alias HeroDigital.Identity.User

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    users = Identity.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user }) do
    with {:ok, %User{} = user} <- Identity.create_user(user) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Identity.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Identity.get_user!(id)

    with {:ok, %User{} = user} <- Identity.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Identity.get_user!(id)
    with {:ok, %User{}} <- Identity.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
