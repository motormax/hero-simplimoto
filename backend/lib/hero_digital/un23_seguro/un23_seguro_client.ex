defmodule HeroDigital.Un23SeguroClient do

  @http_adapter Application.get_env(:hero_digital, HeroDigital.Un23SeguroClient)[:http_adapter]
  @base_url Application.get_env(:hero_digital, HeroDigital.Un23SeguroClient)[:base_url]
  @authorization Application.get_env(:hero_digital, HeroDigital.Un23SeguroClient)[:authorization]
  @generic_error_response {:error, 500, "Unexpected reply from server"}

  require Logger

  def get_provincias do
    "#{@base_url}/resources/provincias"
    |> get_url
    |> handle_response
  end

  def get_localidades(provincia_id) do
    "#{@base_url}/resources/provincias/#{provincia_id}/localidades"
    |> get_url
    |> handle_response
  end

  # TODO:
  # Cual sería el canal_id apropiado?
  # Que cosa es un infomoto?
  # 2019 hardcodeado?
  def cotizar(cp, edad, infomoto) do
    "#{@base_url}/cotizar?cp=#{cp}&edad=#{edad}&infomoto=#{infomoto}&anio=2019&es_0km=1&canal_id=249"
    |> get_url
    |> handle_response
  end

  defp handle_response(response) do
    Logger.debug "[123Seguro] Response from server: #{inspect(response)}"
    case response do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} -> {:ok, Poison.decode!(body)}
      _ -> @generic_error_response
    end
  end

  defp post_url(url, body) do
    Logger.debug "[123Seguro] POST, url: #{url}, body #{inspect(body)}"
    @http_adapter.post(url, Poison.encode!(body), headers(), [timeout: 10_000, recv_timeout: 10_0000])
  end

  defp get_url(url) do
    Logger.debug "[123Seguro] GET, url: #{url}"
    @http_adapter.get(url, headers(), [timeout: 10_000, recv_timeout: 10_0000])
  end

  defp headers do
    if @authorization do
      [
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": @authorization
      ]
    else
      [
        "Content-Type": "application/json",
        "Accept": "application/json"
      ]
    end
  end
end
