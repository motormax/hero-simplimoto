defmodule HeroDigitalWeb.PageController do
  use HeroDigitalWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
