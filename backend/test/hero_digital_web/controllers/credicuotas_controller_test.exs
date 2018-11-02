defmodule HeroDigitalWeb.CredicuotasControllerTest do
  use HeroDigitalWeb.ConnCase

  alias Http.Mock

  import Mox

  describe "installments" do
    @success_body ([
                     %{
                       "amount" => 3087.34,
                       "installments" => 6,
                       "message" => "6 cuotas de $3087.34 ($18524.04)"
                     },
                     %{
                       "amount" => 2325.67,
                       "installments" => 9,
                       "message" => "9 cuotas de $2325.67 ($20931.03)"
                     },
                     %{
                       "amount" => 1988.92,
                       "installments" => 12,
                       "message" => "12 cuotas de $1988.92 ($23867.04)"
                     },
                     %{
                       "amount" => 1781.63,
                       "installments" => 15,
                       "message" => "15 cuotas de $1781.63 ($26724.45)"
                     },
                     %{
                       "amount" => 1652.5,
                       "installments" => 18,
                       "message" => "18 cuotas de $1652.50 ($29745.00)"
                     },
                     %{
                       "amount" => 1560.7,
                       "installments" => 21,
                       "message" => "21 cuotas de $1560.70 ($32774.70)"
                     },
                     %{
                       "amount" => 1502.2,
                       "installments" => 24,
                       "message" => "24 cuotas de $1502.20 ($36052.80)"
                     }
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

  describe "send code" do
    @success_body (%{"verificationId" => "1112341234"})

    test "renders verification_id when everything is ok", %{conn: conn} do
      Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body}}
      end)

      conn = post conn, credicuotas_path(conn, :send_code), %{phone_number: "1234-5678"}

      assert json_response(conn, 200)["data"] == %{"verification_id" => "1112341234"}
    end

    test "renders an error when the remote server fails", %{conn: conn} do
      Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      conn = post conn, credicuotas_path(conn, :send_code), %{phone_number: "1234-5678"}

      assert json_response(conn, 500)["error"] == "Unexpected reply from server"
    end
  end
end
