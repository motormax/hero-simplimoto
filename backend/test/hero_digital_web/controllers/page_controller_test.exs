defmodule HeroDigitalWeb.PageControllerTest do
  use HeroDigitalWeb.ConnCase

  test "GET /admin", %{conn: conn} do
    conn = get conn, "/admin"
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end
end
