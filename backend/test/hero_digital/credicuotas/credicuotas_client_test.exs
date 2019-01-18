defmodule HeroDigital.CredicuotasClientTest do
  use HeroDigital.DataCase

  alias Http.Mock
  alias HeroDigital.CredicuotasClient

  import Mox

  setup :verify_on_exit!

  describe "get installments" do
    @success_body ([
                     %{"amount" => 3087.34, "installments" => 6},
                     %{"amount" => 2325.67, "installments" => 9},
                     %{"amount" => 1988.92, "installments" => 12},
                     %{"amount" => 1781.63, "installments" => 15},
                     %{"amount" => 1652.5, "installments" => 18},
                     %{"amount" => 1560.7, "installments" => 21},
                     %{"amount" => 1502.2, "installments" => 24}
                   ])

    test "successful 200"  do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body}}
      end)

      response = CredicuotasClient.get_installments(10000)

      assert response == {:ok, @success_body}
    end

    test "error 5xx" do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      response = CredicuotasClient.get_installments(10000)

      assert response == {:error, 500, "Unexpected reply from server"}
    end
  end

  describe "send verification code" do
    @success_body (%{"verificationId" => "1112341234"})

    test "handles successful 200" do
      Mock
      |> expect(:post, 1, fn _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body}}
      end)

      response = CredicuotasClient.request_verification_code("1234-5678")

      assert response == {:ok, @success_body}
    end

    test "handles error 500" do
      Mock
      |> expect(:post, 1, fn _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      response = CredicuotasClient.request_verification_code("1234-5678")

      assert response == {:error, 500, "Unexpected reply from server"}
    end
  end

  @success_body (%{
                   offer_by_dni: %{
                     "hashKey" => "orig_bbf3de90-169e-4a55-a814-cd560facb58d",
                     "maxAmount" => 50000,
                     "maxInstallments" => 24,
                     "installmentAmount" => 24140
                   },
                   installments_by_hash: [
                     %{
                       "installments" => 9,
                       "amount" => 1058.71,
                       "idLinea" => 729
                     },
                     %{
                       "installments" => 12,
                       "amount" => 880.09,
                       "idLinea" => 729
                     },
                     %{
                       "installments" => 18,
                       "amount" => 710.37,
                       "idLinea" => 729
                     },
                     %{
                       "installments" => 24,
                       "amount" => 640.84,
                       "idLinea" => 729
                     }
                   ]
                 })

  describe "offer by dni" do
    test "handles successful 200" do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.offer_by_dni}}
      end)

      response = CredicuotasClient.offer_by_dni("11234234", "1112341234", "1984")

      assert response == {:ok, @success_body.offer_by_dni}
    end

    test "handles error 500" do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      response = CredicuotasClient.offer_by_dni("11234234", "1112341234", "1984")

      assert response == {:error, 500, "Unexpected reply from server"}
    end
  end

  describe "installments by hash" do
    test "handles successful 200" do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.installments_by_hash}}
      end)

      response = CredicuotasClient.installments_by_hash("orig_bbf3de90-169e-4a55-a814-cd560facb58d", 30000)

      assert response == {:ok, @success_body.installments_by_hash}
    end

    test "handles error 500" do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      response = CredicuotasClient.installments_by_hash("orig_bbf3de90-169e-4a55-a814-cd560facb58d", 30000)

      assert response == {:error, 500, "Unexpected reply from server"}
    end
  end

  describe "installments by dni" do
    test "handles successful 200" do
      Mock
      |> expect(:get, 2, fn url, _, _ ->
        case url do
          "https://uat-origination-sandbox.credicuotas.com.ar/v1/apirest/offer/11234234/max?verificationId=1112341234&verificationCode=1984" ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.offer_by_dni}}
          _ ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.installments_by_hash}}
        end
      end)

      response = CredicuotasClient.get_installments_by_dni("11234234", "1112341234", "1984", 30000)

      assert response == {:ok, @success_body.installments_by_hash}
    end

    test "handles conflict with same id" do
      Mock
      |> expect(:get, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{body: "{\"httpStatusCode\":\"CONFLICT\",\"code\":\"ONE_OR_MORE_CUSTOMERS_WHIT_THE_SAME_ID\",\"errorCode\":\"ONE_OR_MORE_CUSTOMERS_WHIT_THE_SAME_ID\",\"cause\":\"ONE_OR_MORE_CUSTOMERS_WHIT_THE_SAME_ID\",\"properties\":{\"customerList\":[{\"cuit\":\"27628729595\",\"nombrecompleto\":\"LOPEZ ROJO MARIA ANGELES\",\"dni\":\"38067869\",\"fechanacimiento\":\"1960-10-02\",\"sexo\":\"F\",\"dni_calculado\":\"62872959\"},{\"cuit\":\"20380678692\",\"nombrecompleto\":\"BERNAL LUCIANO\",\"dni\":\"38067869\",\"fechanacimiento\":\"1994-03-04\",\"sexo\":\"M\",\"dni_calculado\":\"38067869\"}]},\"validationErrors\":[]}", headers: [{"Date", "Fri, 18 Jan 2019 02:27:12 GMT"}, {"Server", "Apache-Coyote/1.1"}, {"Access-Control-Allow-Origin", "https://uat-origination-selfie.credicuotas.com.ar"}, {"Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"}, {"Access-Control-Allow-Headers", "Content-Type, Authorization, x-requested-with"}, {"Access-Control-Allow-Credentials", "true"}, {"Access-Control-Max-Age", "3600"}, {"X-Content-Type-Options", "nosniff"}, {"X-XSS-Protection", "1; mode=block"}, {"Cache-Control", "no-cache, no-store, max-age=0, must-revalidate"}, {"Pragma", "no-cache"}, {"Expires", "0"}, {"X-Frame-Options", "DENY"}, {"X-Frame-Options", "ALLOW-FROM DENY"}, {"X-RateLimit-Limit", "100"}, {"X-RateLimit-Remaining", "99"}, {"X-RateLimit-Reset", "1547864827"}, {"Cache-Control", "no-store"}, {"Pragma", "no-cache"}, {"Content-Type", "application/json;charset=UTF-8"}, {"Set-Cookie", "JSESSIONID=F00836F6C2E032A8F8593D98FD131FD4; Path=/; HttpOnly"}, {"Transfer-Encoding", "chunked"}], request_url: "http://INT-cc-origination-api.zg4yhpqwwm.sa-east-1.elasticbeanstalk.com/v1/apirest/offer/38067869/max?verificationId=1168915184&verificationCode=2430", status_code: 409}}
      end)

      response = CredicuotasClient.get_installments_by_dni("11234234", "1112341234", "1984", 30000)

      assert response == {:error, 409, %{"customerList" => [%{"cuit" => "27628729595","nombrecompleto" => "LOPEZ ROJO MARIA ANGELES","dni" => "38067869","fechanacimiento" => "1960-10-02","sexo" => "F","dni_calculado" => "62872959"},%{"cuit" => "20380678692","nombrecompleto" => "BERNAL LUCIANO","dni" => "38067869","fechanacimiento" => "1994-03-04","sexo" => "M","dni_calculado" => "38067869"}]}}
    end
  end

  describe "installments by cuit" do
    test "handles successful 200" do
      Mock
      |> expect(:get, 2, fn url, _, _ ->
        case url do
          "https://uat-origination-sandbox.credicuotas.com.ar/v1/apirest/offer/taxid/11234234/max?verificationId=1112341234&verificationCode=1984" ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.offer_by_dni}}
          _ ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.installments_by_hash}}
        end
      end)

      response = CredicuotasClient.get_installments_by_cuit("11234234", "1112341234", "1984", 30000)

      assert response == {:ok, @success_body.installments_by_hash}
    end
  end
end
