defmodule HeroDigital.CredicuotasClientTest do
  use HeroDigital.DataCase

  alias Http.Mock
  alias HeroDigital.CredicuotasClient

  import Mox

  setup :verify_on_exit!

  describe "installments" do
    @success_body ([
                    %{"amount" => 3087.34, "installments" => 6},
                    %{"amount" => 2325.67, "installments" => 9},
                    %{"amount" => 1988.92, "installments" => 12},
                    %{"amount" => 1781.63, "installments" => 15},
                    %{"amount" => 1652.5, "installments" => 18},
                    %{"amount" => 1560.7, "installments" => 21},
                    %{"amount" => 1502.2, "installments" => 24}
                  ])

    test "handles successful 200"  do
      Mock
      |> expect(:get, 1, fn _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @success_body}}
      end)

      response = CredicuotasClient.get_installments(10000)

      assert response == {:ok, @success_body}
    end

    test "handles error 5xx" do
      Mock
      |> expect(:get, 1, fn _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! %{}}}
      end)

      response = CredicuotasClient.get_installments(10000)

      assert response == {:error, 500, "Unexpected reply from server"}
    end
  end

  describe "verification code" do
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
end
