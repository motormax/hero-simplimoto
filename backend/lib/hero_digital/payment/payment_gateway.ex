defmodule HeroDigital.Payment.PaymentGateway do

  @access_token Application.get_env(:hero_digital, HeroDigital.Payment.PaymentGateway)[:access_token]

  @base_uri "https://api.mercadopago.com"

  require Logger

  def process_payment() do
    url = @base_uri <> "/v1/payments?access_token=" <> @access_token

    Logger.info "Processing payment with MercadoPago"
    Logger.debug "Payment data: #{inspect(payment_data())}"

    HTTPoison.start
    HTTPoison.post(url, payment_data(), headers())
      |> handle_response()
    end

    defp handle_response(response) do
      case response do
        {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          handle_success_response(body)
        {:ok, %HTTPoison.Response{status_code: 201, body: body}} ->
          handle_success_response(body)
        {:ok, %HTTPoison.Response{status_code: error_status_code, body: body}} ->
          handle_failed_response(error_status_code, body)
        {:error, %HTTPoison.Error{reason: reason}} ->
          handle_error_response(reason)
      end
  end

  defp headers do
    [
      "User-Agent": "MercadoPago Ruby SDK v0.3.5",
      "Content-Type": "application/json",
      "Accept": "application/json"
    ]
  end

  defp payment_data do
    %{
      "transaction_amount" => 100,
      "token" => "179416f3eb522c2e58191cf9623af976",
      "description" => "Title of what you are paying for",
      "payer" => %{
        "email" => "example@email.com"
      },
      "installments" => 3,
      "payment_method_id" => "visa",
      # "issuer_id" => 338
    }
    |> Poison.encode!
  end

  defp handle_success_response(body) do
    success_response = Poison.decode! body
    Logger.info "Payment approved with ID: #{success_response["id"]}"
    {:ok, success_response}
  end

  defp handle_failed_response(code, body) do
    Logger.error "Payment failed with code: #{code}"
    error_response = Poison.decode! body
    Logger.error "Response body: #{inspect(error_response)}"
    {:error, error_response}
  end

  defp handle_error_response(reason) do
    Logger.error "Payment failed with reason: [#{reason}]"
    {:error, %{"message" => reason}}
  end

end
