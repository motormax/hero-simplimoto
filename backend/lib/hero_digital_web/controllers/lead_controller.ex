defmodule HeroDigitalWeb.LeadController do
  use HeroDigitalWeb, :controller

  alias HeroDigital.Identity
  alias HeroDigital.Identity.Lead

  action_fallback HeroDigitalWeb.FallbackController

  def index(conn, _params) do
    leads = Identity.list_leads()
    render(conn, "index.json", leads: leads)
  end

  def create(conn, _params) do
    with {:ok, %Lead{} = lead} <- Identity.create_lead() do
      conn
      |> put_status(:created)
      |> put_resp_header("location", lead_path(conn, :show, lead))
      |> render("show.json", lead: lead)
    end
  end

  def show(conn, %{"id" => id}) do
    lead = Identity.get_lead!(id)
    render(conn, "show.json", lead: lead)
  end

  def update(conn, %{"id" => id, "lead" => lead_params}) do
    lead = Identity.get_lead!(id)

    with {:ok, %Lead{} = lead} <- Identity.update_lead(lead, lead_params) do
      render(conn, "show.json", lead: lead)
    end
  end

  def delete(conn, %{"id" => id}) do
    lead = Identity.get_lead!(id)
    with {:ok, %Lead{}} <- Identity.delete_lead(lead) do
      send_resp(conn, :no_content, "")
    end
  end
end
