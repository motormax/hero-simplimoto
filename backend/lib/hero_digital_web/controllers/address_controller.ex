defmodule HeroDigitalWeb.AddressController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.UserData
  alias HeroDigital.UserData.Address

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    addresses = UserData.list_addresses()
    render(conn, "index.json", addresses: addresses)
  end

  def create(conn, %{"address" => address_params}) do
    with {:ok, %Address{} = address} <- UserData.create_address(address_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", lead_address_path(conn, :show, address.lead_id))
      |> render("show.json", address: address)
    end
  end

  def show(conn, %{"id" => id}) do
    address = UserData.get_address!(id)
    render(conn, "show.json", address: address)
  end
end
