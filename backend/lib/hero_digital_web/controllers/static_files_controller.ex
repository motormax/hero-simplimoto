defmodule HeroDigitalWeb.StaticFilesController do
  use HeroDigitalWeb, :controller

  def static(conn, _params) do
    send_file(conn, 200, "priv/static/index.html")
  end

  def not_found(conn, _params) do
    conn
      |> send_resp(:not_found, "")
  end
end
