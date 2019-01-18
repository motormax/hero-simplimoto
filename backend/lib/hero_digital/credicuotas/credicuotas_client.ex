defmodule HeroDigital.CredicuotasClient do

  @http_adapter Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:http_adapter]
  @base_url Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:base_url]
  @hardcoded_hash Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:default_hash]
  @user Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:user]
  @password Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:password]
  @generic_error_response {:error, 500, "Unexpected reply from server"}

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

  def get_installments_by_dni(dni, verification_id, verification_code, amount) do
    case offer_by_dni(dni, verification_id, verification_code) do
      {:ok, %{"hashKey" => hash}} -> installments_by_hash(hash, amount)
      {
        :ok,
        %{
          "code" => "ONE_OR_MORE_CUSTOMERS_WHIT_THE_SAME_ID",
          "properties" => response
        }
      } -> {:error, 409, response}
      _ -> @generic_error_response
    end
  end

  def get_installments_by_cuit(cuit, verification_id, verification_code, amount) do
    with {:ok, %{"hashKey" => hash}} <- offer_by_cuit(cuit, verification_id, verification_code) do
      installments_by_hash(hash, amount)
    end
  end

  def offer_by_dni(dni, verification_id, verification_code) do
    "#{@base_url}/v1/apirest/offer/#{dni}/max?verificationId=#{verification_id}&verificationCode=#{verification_code}"
    |> get_url
    |> handle_response
  end

  def offer_by_cuit(cuit, verification_id, verification_code) do
    "#{@base_url}/v1/apirest/offer/taxid/#{cuit}/max?verificationId=#{verification_id}&verificationCode=#{verification_code}"
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
      {:ok, %HTTPoison.Response{status_code: 409, body: body}} -> {:ok, Poison.decode!(body)}
      _ -> @generic_error_response
    end
  end

  defp post_url(url, body) do
    Logger.debug "[Credicuotas] POST, url: #{url}, body #{inspect(body)}"
    @http_adapter.post(url, Poison.encode!(body), headers(), [timeout: 10_000, recv_timeout: 10_0000])
  end

  defp get_url(url) do
    Logger.debug "[Credicuotas] GET, url: #{url}"
    @http_adapter.get(url, headers(), [timeout: 10_000, recv_timeout: 10_0000])
  end

  defp headers do
    if @user && @password do
      authorization = "#{@user}:#{@password}"
      [
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Basic #{Base.encode64(authorization)}"
      ]
    else
      [
        "Content-Type": "application/json",
        "Accept": "application/json"
      ]
    end
  end
end
