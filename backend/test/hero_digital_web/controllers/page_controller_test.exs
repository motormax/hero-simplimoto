defmodule HeroDigitalWeb.PageControllerTest do
  use HeroDigitalWeb.ConnCase

  @username Application.get_env(:hero_digital, :basic_auth)[:username]
  @password Application.get_env(:hero_digital, :basic_auth)[:password]

  defp using_basic_auth(conn, username, password) do
    header_content = "Basic " <> Base.encode64("#{username}:#{password}")
    conn |> put_req_header("authorization", header_content)
  end

  test "GET /admin", %{conn: conn} do
    conn = conn
      |> using_basic_auth(@username, @password)
      |> get("/admin")

    assert html_response(conn, 200) =~ "Welcome to ExAdmin. This is the default dashboard page."
  end
end
