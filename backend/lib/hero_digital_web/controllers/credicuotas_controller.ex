defmodule HeroDigitalWeb.CredicuotasController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.CredicuotasClient

  action_fallback HeroDigitalWeb.FallbackController

  def installments(
        conn,
        %{
          "dni" => dni,
          "verification_id" => verification_id,
          "verification_code" => verification_code,
          "amount" => amount
        }
      ) do
    with {:ok, valid_amount} <- validate_amount(amount),
         {:ok, installments} <- CredicuotasClient.get_installments(dni, verification_id, verification_code, valid_amount) do
      conn |> render("show.json", installments: installments)
    end
  end

  def send_code(conn, %{"phone_number" => phone_number}) do
    with {:ok, verification} <- CredicuotasClient.request_verification_code(phone_number) do
      conn |> render("show.json", verification: verification)
    end
  end

  defp validate_amount(amount) do
    case Integer.parse(amount) do
      {valid_amount, _} -> {:ok, valid_amount}
      _ -> {:error, 422, "Invalid amount given"}
    end
  end
end
