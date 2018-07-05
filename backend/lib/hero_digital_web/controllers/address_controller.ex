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
      |> put_resp_header("location", address_path(conn, :show, address))
      |> render("show.json", address: address)
    end
  end

  def show(conn, %{"id" => id}) do
    address = UserData.get_address!(id)
    render(conn, "show.json", address: address)
  end

  def update(conn, %{"id" => id, "address" => address_params}) do
    address = UserData.get_address!(id)

    with {:ok, %Address{} = address} <- UserData.update_address(address, address_params) do
      render(conn, "show.json", address: address)
    end
  end

  def delete(conn, %{"id" => id}) do
    address = UserData.get_address!(id)
    with {:ok, %Address{}} <- UserData.delete_address(address) do
      send_resp(conn, :no_content, "")
    end
  end
end
