defmodule HeroDigital.Payment.PaymentGateway do

  @access_token Application.get_env(:hero_digital, HeroDigital.Payment.PaymentGateway)[:access_token]
  @http_adapter Application.get_env(:hero_digital, HeroDigital.Payment.PaymentGateway)[:http_adapter]

  @base_uri "https://api.mercadopago.com"

  @success_default_message "El pago fue procesado con éxito."

  @success_responses %{
    "accredited" => "El pago fue procesado con éxito.",
    "pending_contingency" => "El pago esta siendo procesado. En poco tiempo recibiras la confirmación por mail.",
    "pending_review_manual" => "El pago esta siendo procesado. En unos días hábiles recibiras la confirmación por mail.",
  }
  @error_responses %{
    "cc_rejected_insufficient_amount" => "El medio de pago ingresado no tiene fondos suficientes. Por favor elige otro de los medios de pago.",
    "cc_rejected_high_risk" => "El medio de pago ingresado fue rechazado. Por favor elige otro de los medios de pago.",
    "cc_rejected_bad_filled_card_number" => "Revisa el número de tarjeta.",
    "cc_rejected_bad_filled_date" => "Revisa la fecha de vencimiento.",
    "cc_rejected_bad_filled_other" => "Revisa los datos.",
    "cc_rejected_bad_filled_security_code" => "Revisa el código de seguridad.",
    "cc_rejected_blacklist" => "El medio de pago ingresado fue rechazado. Por favor elige otro de los medios de pago.",
    "cc_rejected_call_for_authorize" => "El medio de pago requiere de autorización. Por favor llama al emisor para autorizarlo o elige otro de los medios de pago.",
    "cc_rejected_card_disabled" => "El medio de pago requiere activación. Por favor llama al emisor para activarlo o elige otro de los medios de pago.",
    "cc_rejected_card_error" => "No se pudo procesar el pago. Por favor elige otro de los medios de pago.",
    "cc_rejected_duplicated_payment" => "Ya hiciste un pago por ese valor. Si necesitas volver a pagar usa otro medio de pago.",
    "cc_rejected_invalid_installments" => "El medio de pago elegido no acepta la cantidad de cuotas seleccionada. Por favor elige otra cantidad de cuotas u otro medio de pago.",
    "cc_rejected_max_attempts" => "Llegaste al límite de intentos permitidos. Elige otro medio de pago.",
    "cc_rejected_other_reason" => "No se pudo procesar el pago. Por favor elige otro de los medios de pago.",
  }

  @error_default_message "Hubo un error al procesar el pago. Por favor intente nuevamente o pruebe con otro medio de pago."

  require Logger

  def process_payment(purchase_order) do
    url = @base_uri <> "/v1/payments?access_token=" <> @access_token

    payment_data = build_payment_data(purchase_order)

    Logger.info "Processing payment with MercadoPago"

    post_url(url, payment_data, headers())
      |> handle_response()
    end

    defp handle_response(response) do
      case response do
        {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          handle_success_response(Poison.decode!(body))
        {:ok, %HTTPoison.Response{status_code: 201, body: body}} ->
          handle_success_response(Poison.decode!(body))
        {:ok, %HTTPoison.Response{status_code: error_status_code, body: body}} ->
          handle_failed_response(error_status_code, Poison.decode!(body))
        {:error, %HTTPoison.Error{reason: reason}} ->
          handle_error_response(reason)
      end
  end

  defp post_url(url, body, options) do
    Logger.debug "Payment data: #{inspect(body)}"
    @http_adapter.post(url, body, options)
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

  defp handle_success_response(approved_response = %{"status" => "approved"}) do
    Logger.info "Payment approved with ID: #{approved_response["id"]}"
    Logger.debug "Payment response: #{inspect(approved_response)}"

    {:ok, Map.put(approved_response, :success_message, fetch_success_message(approved_response))}
  end

  defp handle_success_response(inprog_response = %{"status" => "in_process"}) do
    Logger.info "Payment in_process with ID: #{inprog_response["id"]}"
    Logger.debug "Payment response: #{inspect(inprog_response)}"

    {:ok, Map.put(inprog_response, :success_message, fetch_success_message(inprog_response))}
  end

  defp handle_success_response(rejected_response = %{"status" => "rejected"}) do
    Logger.info "Payment rejected with ID: #{rejected_response["id"]}"
    Logger.debug "Payment response: #{inspect(rejected_response)}"

    {:error, Map.put(rejected_response, :error_message, fetch_error_message(rejected_response))}
  end

  defp fetch_error_message(response) do
    @error_responses |> Map.get(response["status_detail"], @error_default_message)
  end

  defp fetch_success_message(response) do
    @success_responses |> Map.get(response["status_detail"], @success_default_message)
  end

  defp handle_failed_response(code, error_response) do
    Logger.error "Payment failed with code: #{code}"
    Logger.error "Response body: #{inspect(error_response)}"

    {:error, Map.put(error_response, :error_message, @error_default_message)}
  end

  defp handle_error_response(reason) do
    Logger.error "Payment failed with reason: [#{reason}]"

    {:error,%{"status" => reason, error_message: @error_default_message}}
  end

end
