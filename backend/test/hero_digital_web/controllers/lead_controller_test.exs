defmodule HeroDigitalWeb.LeadControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity
  alias HeroDigital.Identity.Lead

  @create_attrs %{}
  @update_attrs %{id: "7488a646-e31f-11e4-aace-600308960668"}
  @invalid_attrs %{id: nil}

  def fixture(:lead) do
    {:ok, lead} = Identity.create_lead(@create_attrs)
    lead
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create lead" do
    test "renders lead when data is valid", %{conn: conn} do
      conn = post conn, lead_path(conn, :create), lead: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_path(conn, :show, id)
      assert %{"id" => _aRandomId} = json_response(conn, 200)["data"]
    end
  end

  defp create_lead(_) do
    lead = fixture(:lead)
    {:ok, lead: lead}
  end
end
