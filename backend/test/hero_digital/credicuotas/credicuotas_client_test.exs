defmodule HeroDigital.CredicuotasClientTest do
  use HeroDigital.DataCase

  alias Http.Mock
  alias HeroDigital.CredicuotasClient

  import Mox

  setup :verify_on_exit!

  describe "send verification code" do
    @success_body (%{"verificationId" => "1112341234"})

    test "handles successful 200" do
      Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body}}
      end)

      response = CredicuotasClient.request_verification_code("1234-5678")

      assert response == {:ok, @success_body}
    end

    test "handles error 500" do
      Mock
      |> expect(:post, 1, fn _, _, _ ->
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
      |> expect(:get, 1, fn _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.offer_by_dni}}
      end)

      response = CredicuotasClient.offer_by_dni("11234234", "1112341234", "1984")

      assert response = {:ok, @success_body.offer_by_dni}
    end

    test "handles error 500" do
      Mock
      |> expect(:get, 1, fn _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      response = CredicuotasClient.offer_by_dni("11234234", "1112341234", "1984")

      assert response = {:error, 500, "Unexpected reply from server"}
    end
  end

  describe "installments by hash" do
    test "handles successful 200" do
      Mock
      |> expect(:get, 1, fn _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.installments_by_hash}}
      end)

      response = CredicuotasClient.installments_by_hash("orig_bbf3de90-169e-4a55-a814-cd560facb58d", 30000)

      assert response = {:ok, @success_body.installments_by_hash}
    end

    test "handles error 500" do
      Mock
      |> expect(:get, 1, fn _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      response = CredicuotasClient.installments_by_hash("orig_bbf3de90-169e-4a55-a814-cd560facb58d", 30000)

      assert response = {:error, 500, "Unexpected reply from server"}
    end
  end

  describe "installments by dni" do
    test "handles successful 200" do
      Mock
      |> expect(:get, 2, fn url, _ ->
        case url do
          "https://uat-origination-sandbox.credicuotas.com.ar/v1/apirest/offer/11234234/max?verificationId=1112341234&verificationCode=1984" ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.offer_by_dni}}
          _ ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body.installments_by_hash}}
        end
      end)

      response = CredicuotasClient.get_installments("11234234", "1112341234", "1984", 30000)

      assert response = {:ok, @success_body.installments_by_hash}
    end
  end
end
