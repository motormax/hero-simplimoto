defmodule HeroDigital.CredicuotasClient do

  @http_adapter Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:http_adapter]
  @base_url Application.get_env(:hero_digital, HeroDigital.CredicuotasClient)[:base_url]

  require Logger

  def get_installments(amount) do
    url = @base_url <> "/v1/apirest/calculator/installments/" <> Integer.to_string(amount)

    response = get_url(url)

    case response do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} -> {:ok, Poison.decode!(body)}
      _ -> {:error, 500, "Unexpected reply from server"} # TODO: Maybe it's worth to have a better error handling
    end
  end

  defp get_url(url) do
    Logger.debug "Credicuotas GET, url: #{url}"
    @http_adapter.get(url, headers())
  end

  defp headers do
    [
      "Content-Type": "application/json",
      "Accept": "application/json"
    ]
  end
end
