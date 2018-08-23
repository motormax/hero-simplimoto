defmodule HeroDigitalWeb.FallbackController do

  alias HeroDigital.Fulfillment.PurchaseOrder

  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use HeroDigitalWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(HeroDigitalWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:payment_error, %PurchaseOrder{} = purchase_order}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(HeroDigitalWeb.PurchaseOrderView, "purchase_order_error.json", purchase_order: purchase_order)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(HeroDigitalWeb.ErrorView, :"404")
  end

end
