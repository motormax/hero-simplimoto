defmodule HeroDigitalWeb.CredicuotasController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.CredicuotasClient

  action_fallback HeroDigitalWeb.FallbackController

  def installments(conn, %{"amount" => amount}) do
    with {:ok, valid_amount} <- validate_amount(amount),
         {:ok, installments} <- CredicuotasClient.get_installments(valid_amount) do
      conn |> render("show.json", installments: installments)
    end
  end

  defp validate_amount(amount) do
    case Integer.parse(amount) do
      {valid_amount, _} -> {:ok, valid_amount}
      _ -> {:error, 422, "Invalid amount given"}
    end
  end
end
