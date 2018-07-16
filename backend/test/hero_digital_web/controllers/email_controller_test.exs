defmodule HeroDigitalWeb.EmailControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Identity
  alias HeroDigital.UserData

  @create_attrs %{email: "some email", lead_id: nil}
  @invalid_attrs %{email: nil, lead_id: nil}

  def fixture(:email) do
    {:ok, email} = UserData.create_email(@create_attrs)
    email
  end

  setup do
    {:ok, lead} = Identity.create_lead()
    %{lead: lead}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create email" do
    test "renders email when data is valid", %{lead: lead, conn: conn} do
      create_attrs = %{@create_attrs | "lead_id": lead.id}
      conn = post conn, email_path(conn, :create), email: create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, email_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "email" => "some email"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, email_path(conn, :create), email: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
