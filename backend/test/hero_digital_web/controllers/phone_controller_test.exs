defmodule HeroDigitalWeb.PhoneControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.UserData
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  @create_attrs %{phone: "some phone", lead_id: nil}
  @invalid_attrs %{phone: nil, lead_id: nil}

  def fixture(:phone) do
    {:ok, phone} = UserData.create_phone(@create_attrs)
    phone
  end

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
    %{lead: lead}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create phone" do
    test "renders phone when data is valid", %{lead: lead, conn: conn} do
      create_attrs = %{@create_attrs | "lead_id": lead.id}
      conn = post conn, phone_path(conn, :create), phone: create_attrs
      assert %{"id" => id, "phone" => phone} = json_response(conn, 201)["data"]

      conn = get conn, phone_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "phone" => phone}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, phone_path(conn, :create), phone: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
