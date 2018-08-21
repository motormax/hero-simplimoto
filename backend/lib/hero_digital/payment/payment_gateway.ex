defmodule HeroDigital.Payment.PaymentGateway do

  @access_token Application.get_env(:hero_digital, HeroDigital.Payment.PaymentGateway)[:access_token]

  @base_uri "https://api.mercadopago.com"

  require Logger

  def process_payment(purchase_order) do
    url = @base_uri <> "/v1/payments?access_token=" <> @access_token

    payment_data = build_payment_data(purchase_order)

    Logger.info "Processing payment with MercadoPago"
    Logger.debug "Payment data: #{inspect(payment_data)}"

    HTTPoison.post(url, payment_data, headers())
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

  defp build_payment_data(credit_card_token) do
    %{
      "transaction_amount" => 100,
      "token" => credit_card_token,
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
    Logger.debug "Payment response: #{inspect(success_response)}"
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
