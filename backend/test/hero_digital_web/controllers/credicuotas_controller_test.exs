defmodule HeroDigitalWeb.CredicuotasControllerTest do
  use HeroDigitalWeb.ConnCase

  alias Http.Mock

  import Mox

  @installments_body ([
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

  describe "installments" do
    test "render installments", %{conn: conn} do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @installments_body}}
      end)

      conn = get conn, credicuotas_path(conn, :installments), %{amount: "10000"}

      assert json_response(conn, 200)["data"] == @installments_body
    end
    test "renders an error when the amount is invalid", %{conn: conn} do
      conn = get conn, credicuotas_path(conn, :installments), %{amount: "some invalid value"}

      assert json_response(conn, 422)["error"] == "Invalid amount given"
    end

    test "renders an error when the remote server fails", %{conn: conn} do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      conn = get conn, credicuotas_path(conn, :installments), %{amount: "10000"}

      assert json_response(conn, 500)["error"] == "Unexpected reply from server"
    end
  end

  describe "personal installments" do
    @valid_params (%{
                     amount: "100000",
                     dni: "11234234",
                     verification_id: "1112341234",
                     verification_code: "1984"
                   })

    @invalid_params (%{
                       amount: "some invalid value",
                       dni: "11234234",
                       verification_id: "1112341234",
                       verification_code: "1984"
                     })

    test "render installments", %{conn: conn} do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @installments_body}}
      end)

      conn = get conn, credicuotas_path(conn, :personal_installments), @valid_params

      assert json_response(conn, 200)["data"] == @installments_body
    end

    test "renders an appropiate error when there is more than one customer with the same dni", %{conn: conn} do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{body: "{\"httpStatusCode\":\"CONFLICT\",\"code\":\"ONE_OR_MORE_CUSTOMERS_WHIT_THE_SAME_ID\",\"errorCode\":\"ONE_OR_MORE_CUSTOMERS_WHIT_THE_SAME_ID\",\"cause\":\"ONE_OR_MORE_CUSTOMERS_WHIT_THE_SAME_ID\",\"properties\":{\"customerList\":[{\"cuit\":\"27628729595\",\"nombrecompleto\":\"LOPEZ ROJO MARIA ANGELES\",\"dni\":\"38067869\",\"fechanacimiento\":\"1960-10-02\",\"sexo\":\"F\",\"dni_calculado\":\"62872959\"},{\"cuit\":\"20380678692\",\"nombrecompleto\":\"BERNAL LUCIANO\",\"dni\":\"38067869\",\"fechanacimiento\":\"1994-03-04\",\"sexo\":\"M\",\"dni_calculado\":\"38067869\"}]},\"validationErrors\":[]}", headers: [{"Date", "Fri, 18 Jan 2019 02:27:12 GMT"}, {"Server", "Apache-Coyote/1.1"}, {"Access-Control-Allow-Origin", "https://uat-origination-selfie.credicuotas.com.ar"}, {"Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"}, {"Access-Control-Allow-Headers", "Content-Type, Authorization, x-requested-with"}, {"Access-Control-Allow-Credentials", "true"}, {"Access-Control-Max-Age", "3600"}, {"X-Content-Type-Options", "nosniff"}, {"X-XSS-Protection", "1; mode=block"}, {"Cache-Control", "no-cache, no-store, max-age=0, must-revalidate"}, {"Pragma", "no-cache"}, {"Expires", "0"}, {"X-Frame-Options", "DENY"}, {"X-Frame-Options", "ALLOW-FROM DENY"}, {"X-RateLimit-Limit", "100"}, {"X-RateLimit-Remaining", "99"}, {"X-RateLimit-Reset", "1547864827"}, {"Cache-Control", "no-store"}, {"Pragma", "no-cache"}, {"Content-Type", "application/json;charset=UTF-8"}, {"Set-Cookie", "JSESSIONID=F00836F6C2E032A8F8593D98FD131FD4; Path=/; HttpOnly"}, {"Transfer-Encoding", "chunked"}], request_url: "http://INT-cc-origination-api.zg4yhpqwwm.sa-east-1.elasticbeanstalk.com/v1/apirest/offer/38067869/max?verificationId=1168915184&verificationCode=2430", status_code: 409}}
      end)

      conn = get conn, credicuotas_path(conn, :personal_installments), @valid_params

      assert json_response(conn, 409)["error"] == %{"customerList" => [%{"sexo" => "F","nombrecompleto" => "LOPEZ ROJO MARIA ANGELES","fechanacimiento" => "1960-10-02","dni_calculado" => "62872959","dni" => "38067869","cuit" => "27628729595"},%{"sexo" => "M","nombrecompleto" => "BERNAL LUCIANO","fechanacimiento" => "1994-03-04","dni_calculado" => "38067869","dni" => "38067869","cuit" => "20380678692"}]}
    end

    test "renders an error when the amount is invalid", %{conn: conn} do
      conn = get conn, credicuotas_path(conn, :personal_installments), @invalid_params

      assert json_response(conn, 422)["error"] == "Invalid amount given"
    end

    test "renders an error when the remote server fails", %{conn: conn} do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      conn = get conn, credicuotas_path(conn, :personal_installments), @valid_params

      assert json_response(conn, 500)["error"] == "Unexpected reply from server"
    end
  end

  describe "personal installments - cuit" do
    @valid_params (%{
                     amount: "100000",
                     cuit: "20112342340",
                     verification_id: "1112341234",
                     verification_code: "1984"
                   })

    @invalid_params (%{
                       amount: "some invalid value",
                       cuit: "20112342340",
                       verification_id: "1112341234",
                       verification_code: "1984"
                     })

    test "render installments", %{conn: conn} do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @installments_body}}
      end)

      conn = get conn, credicuotas_path(conn, :personal_installments_cuit), @valid_params

      assert json_response(conn, 200)["data"] == @installments_body
    end

    test "renders an error when the amount is invalid", %{conn: conn} do
      conn = get conn, credicuotas_path(conn, :personal_installments_cuit), @invalid_params

      assert json_response(conn, 422)["error"] == "Invalid amount given"
    end

    test "renders an error when the remote server fails", %{conn: conn} do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      conn = get conn, credicuotas_path(conn, :personal_installments_cuit), @valid_params

      assert json_response(conn, 500)["error"] == "Unexpected reply from server"
    end
  end

  describe "send code" do
    @success_body (%{"verificationId" => "1112341234"})

    test "renders verification_id when everything is ok", %{conn: conn} do
      Mock
      |> expect(:post, 1, fn _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body}}
      end)

      conn = post conn, credicuotas_path(conn, :send_code), %{phone_number: "1234-5678"}

      assert json_response(conn, 200)["data"] == %{"verification_id" => "1112341234"}
    end

    test "renders an error when the remote server fails", %{conn: conn} do
      Mock
      |> expect(:post, 1, fn _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      conn = post conn, credicuotas_path(conn, :send_code), %{phone_number: "1234-5678"}

      assert json_response(conn, 500)["error"] == "Unexpected reply from server"
    end
  end
end
