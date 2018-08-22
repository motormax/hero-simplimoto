defmodule HeroDigital.Payment.PaymentGatewayTest do
  use HeroDigital.DataCase

  alias Http.Mock
  alias HeroDigital.Payment.PaymentGateway

  import Mox

  setup :verify_on_exit!

  @transaction_approved_body (%{"id" => 123, "status" => "approved", "status_detail" => "accredited"})
  @transaction_inprog_body (%{"id" => 123, "status" => "in_process", "status_detail" => "pending_contingency"})
  @transaction_cc_rejected_insufficient_amount_body (%{"id" => 123, "status" => "rejected", "status_detail" => "cc_rejected_insufficient_amount" })
  @transaction_cc_rejected_high_risk_body (%{"id" => 123, "status" => "rejected", "status_detail" => "cc_rejected_high_risk" })
  @transaction_failed_unknown_body (%{"id" => 123, "status" => "rejected", "status_detail" => "unknown" })
  @transaction_failed_500_body (%{"id" => 123, "status" => "error" })
  @transaction_failed_timeout_body (%{"status" => :timeout })

  test "successful 200" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @transaction_approved_body}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_approved_body |> Map.put(:success_message, "El pago fue procesado con éxito.")
      assert response == {:ok, expected_response}
  end

  test "successful 201" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_approved_body}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_approved_body |> Map.put(:success_message, "El pago fue procesado con éxito.")
      assert response == {:ok, expected_response}
  end

  test "in progress 201" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_inprog_body}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_inprog_body |> Map.put(:success_message, "El pago esta siendo procesado. En poco tiempo recibiras la confirmación por mail.")
      assert response == {:ok, expected_response}
  end

  test "failed cc_rejected_insufficient_amount" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_cc_rejected_insufficient_amount_body}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_cc_rejected_insufficient_amount_body |> Map.put(:error_message, "El medio de pago ingresado no tiene fondos suficientes. Por favor elige otro de los medios de pago.")
      assert response == {:error, expected_response}
  end

  test "failed cc_rejected_high_risk" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_cc_rejected_high_risk_body}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_cc_rejected_high_risk_body |> Map.put(:error_message, "El medio de pago ingresado fue rechazado. Por favor elige otro de los medios de pago.")
      assert response == {:error, expected_response}
  end

  test "failed unknown" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_failed_unknown_body}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_failed_unknown_body |> Map.put(:error_message, "Hubo un error al procesar el pago. Por favor intente nuevamente o pruebe con otro medio de pago.")
      assert response == {:error, expected_response}
  end

  test "error 5xx" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! @transaction_failed_500_body}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_failed_500_body |> Map.put(:error_message, "Hubo un error al procesar el pago. Por favor intente nuevamente o pruebe con otro medio de pago.")
      assert response == {:error, expected_response}
  end

  test "error timeout" do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:error, %HTTPoison.Error{reason: :timeout}}
      end)

      response = PaymentGateway.process_payment("a_cc_token")
      expected_response = @transaction_failed_timeout_body |> Map.put(:error_message, "Hubo un error al procesar el pago. Por favor intente nuevamente o pruebe con otro medio de pago.")
      assert response == {:error, expected_response}
  end
end
