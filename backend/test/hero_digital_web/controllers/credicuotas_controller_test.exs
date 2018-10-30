defmodule HeroDigitalWeb.CredicuotasControllerTest do
  use HeroDigitalWeb.ConnCase

  alias Http.Mock

  import Mox

  @success_body ([
                   %{"amount" => 3087.34, "installments" => 6},
                   %{"amount" => 2325.67, "installments" => 9},
                   %{"amount" => 1988.92, "installments" => 12},
                   %{"amount" => 1781.63, "installments" => 15},
                   %{"amount" => 1652.5, "installments" => 18},
                   %{"amount" => 1560.7, "installments" => 21},
                   %{"amount" => 1502.2, "installments" => 24}
                 ])

  test "render installments", %{conn: conn} do
    Mock
    |> expect(:get, 1, fn _, _ ->
         {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body}}
       end)

    conn = get conn, credicuotas_path(conn, :installments), %{amount: "10000"}

    assert json_response(conn, 200)["data"] == @success_body
  end

  test "renders an error when the amount is invalid", %{conn: conn} do
    conn = get conn, credicuotas_path(conn, :installments), %{amount: "some invalid value"}

    assert json_response(conn, 422)["error"] == "Invalid amount given"
  end

  test "renders an error when the remote server fails", %{conn: conn} do
    Mock
    |> expect(:get, 1, fn _, _ ->
      {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
    end)

    conn = get conn, credicuotas_path(conn, :installments), %{amount: "10000"}

    assert json_response(conn, 500)["error"] == "Unexpected reply from server"
  end
end
