defmodule HeroDigital.Payment.PaymentGatewayTest do
  use HeroDigital.DataCase

  alias Http.Mock
  alias HeroDigital.Payment.PaymentGateway
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Fulfillment
  alias HeroDigital.Fulfillment.PurchaseOrder
  alias HeroDigital.Financing
  alias HeroDigital.Factory

  import Mox

  setup :verify_on_exit!

  @transaction_approved_body (%{"id" => 123, "status" => "approved", "status_detail" => "accredited"})
  @transaction_inprog_body (%{"id" => 123, "status" => "in_process", "status_detail" => "pending_contingency"})
  @transaction_cc_rejected_insufficient_amount_body (%{"id" => 123, "status" => "rejected", "status_detail" => "cc_rejected_insufficient_amount" })
  @transaction_cc_rejected_high_risk_body (%{"id" => 123, "status" => "rejected", "status_detail" => "cc_rejected_high_risk" })
  @transaction_failed_unknown_body (%{"id" => 123, "status" => "rejected", "status_detail" => "unknown" })
  @transaction_failed_500_body %{"cause" => [%{"code" => 4084, "data" => nil, "description" => "issuer_id must be integer"}], "error" => "bad_request", "message" => "issuer_id must be integer", "status" => 400}
  @transaction_failed_timeout_body (%{"status" => :timeout })

  @purchase_order_attrs %{email: "some email", payment_method: "credit_card", payment_method_token: "a cc token"}

  @financing_data_params %{costs: "some costs", installments: 42, issuer_id: "some issuer_id", issuer_logo: "some issuer_logo", issuer_name: "some issuer_name", message: "some message", monthly_amount: 120.5, payment_method_id: "some payment_method_id", payment_method_logo: "some payment_method_logo", payment_method_name: "some payment_method_name", price: 42}

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "DASH", price: 50000})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    with {:ok, lead} <- HeroDigital.Identity.create_lead(%{motorcycle_id: motorcycle.id}) do
      %{lead: lead}
    end
  end

  setup %{lead: lead} do
    {:ok, personal_plate_registration} = Factory.create_personal_plate_registration(lead.id)
    %{personal_plate_registration: personal_plate_registration}
  end

  setup %{lead: lead} do
    with {:ok, financing_data} <- Financing.set_financing_data(lead.id, @financing_data_params) do
      %{financing_data: financing_data}
    end
  end

  setup %{lead: lead} do
    changeset = %PurchaseOrder{} |> PurchaseOrder.changeset(lead, @purchase_order_attrs)
    with purchase_order <- Fulfillment.create_purchase_order(changeset) do
      {:ok, %{purchase_order: purchase_order}}
    end
  end

  test "successful 200", %{purchase_order: purchase_order}  do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode! @transaction_approved_body}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      expected_response = @transaction_approved_body |> Map.put("success_message", "El pago fue procesado con éxito.")
      assert response == {:ok, expected_response}
  end

  test "successful 201", %{purchase_order: purchase_order} do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_approved_body}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      expected_response = @transaction_approved_body |> Map.put("success_message", "El pago fue procesado con éxito.")
      assert response == {:ok, expected_response}
  end

  test "in progress 201", %{purchase_order: purchase_order} do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_inprog_body}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      expected_response = @transaction_inprog_body |> Map.put("success_message", "El pago esta siendo procesado. En poco tiempo recibiras la confirmación por mail.")
      assert response == {:ok, expected_response}
  end

  test "failed cc_rejected_insufficient_amount", %{purchase_order: purchase_order} do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_cc_rejected_insufficient_amount_body}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      expected_response = @transaction_cc_rejected_insufficient_amount_body |> Map.put("error_message", "El medio de pago ingresado no tiene fondos suficientes. Por favor elige otro de los medios de pago.")
      assert response == {:payment_error, expected_response}
  end

  test "failed cc_rejected_high_risk", %{purchase_order: purchase_order} do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_cc_rejected_high_risk_body}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      expected_response = @transaction_cc_rejected_high_risk_body |> Map.put("error_message", "El medio de pago ingresado fue rechazado. Por favor elige otro de los medios de pago.")
      assert response == {:payment_error, expected_response}
  end

  test "failed unknown", %{purchase_order: purchase_order} do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 201, body: Poison.encode! @transaction_failed_unknown_body}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      expected_response = @transaction_failed_unknown_body |> Map.put("error_message", "Hubo un error al procesar el pago. Por favor intente nuevamente o pruebe con otro medio de pago.")
      assert response == {:payment_error, expected_response}
  end

  test "error 5xx", %{purchase_order: purchase_order} do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: Poison.encode! @transaction_failed_500_body}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      failed_response = %{
        "error_message" => "Hubo un error al procesar el pago. Por favor intente nuevamente o pruebe con otro medio de pago.",
        "status" => "issuer_id must be integer",
        "status_detail" => "issuer_id must be integer",
        "id" => "n/a",
      }
      expected_response = @transaction_failed_500_body |> Map.merge(failed_response)
      assert response == {:payment_error, expected_response}
  end

  test "error timeout", %{purchase_order: purchase_order} do
    Mock
      |> expect(:post, 1, fn _, _, _ ->
        {:error, %HTTPoison.Error{reason: :timeout}}
      end)

      response = PaymentGateway.process_payment(purchase_order)

      expected_response = @transaction_failed_timeout_body
        |> Map.put("error_message", "Hubo un error al procesar el pago. Por favor intente nuevamente o pruebe con otro medio de pago.")
        |> Map.put("id", "n/a")
        |> Map.put("status_detail", :timeout)
      assert response == {:payment_error, expected_response}
  end
end
