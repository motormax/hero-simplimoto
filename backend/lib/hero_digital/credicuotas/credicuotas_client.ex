defmodule HeroDigital.CredicuotasClient do

  @http_adapter Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:http_adapter]
  @base_url Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:base_url]
  @hardcoded_hash Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:default_hash]

  require Logger

  def get_installments(amount) do
    "#{@base_url}/v1/apirest/calculator/installments/#{amount}"
    |> get_url
    |> handle_response
  end

  def request_verification_code(phone_number) do
    "#{@base_url}/v1/apirest/sendcode/#{phone_number}"
    |> post_url(%{})
    |> handle_response
  end

  def get_personal_installments(dni, verification_id, verification_code, amount) do
    with {:ok, %{"hashKey" => hash}} <- offer_by_dni(dni, verification_id, verification_code) do
      installments_by_hash(hash, amount)
    end
  end

  def offer_by_dni(dni, verification_id, verification_code) do
    "#{@base_url}/v1/apirest/offer/#{dni}/max?verificationId=#{verification_id}&verificationCode=#{verification_code}"
    |> get_url
    |> handle_response
  end

  def installments_by_hash(hash, amount) do
    "#{@base_url}/v1/apirest/loanRequest/#{@hardcoded_hash || hash}/getinstallments/#{amount}"
    |> get_url
    |> handle_response
  end

  defp handle_response(response) do
    Logger.debug "[Credicuotas] Response from server: #{inspect(response)}"
    case response do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} -> {:ok, Poison.decode!(body)}
      _ -> {:error, 500, "Unexpected reply from server"}
    end
  end

  defp post_url(url, body) do
    Logger.debug "[Credicuotas] POST, url: #{url}, body #{inspect(body)}"
    @http_adapter.post(url, Poison.encode!(body), headers())
  end

  defp get_url(url) do
    Logger.debug "[Credicuotas] GET, url: #{url}"
    @http_adapter.get(url, headers())
  end

  defp headers do
    [
      "Content-Type": "application/json",
      "Accept": "application/json"
    ]
  end
end
