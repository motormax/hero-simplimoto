defmodule HeroDigitalWeb.DeliveryChoiceControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Delivery
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  @pickup_attrs %{lead_id: "", pickup_location: "some pickup_location", address: nil}
  @address_attrs %{
    lead_id: "",
    pickup_location: nil,
    address: %{
      complements: "some complements",
      number: "some number",
      postal_code: "some postal_code",
      street: "some street",
      telephone_number: "some telephone_number",
      town: "some town"
    }
  }
  @invalid_attrs_none %{lead_id: nil, pickup_location: nil, address: nil}
  @invalid_attrs_both %{
    lead_id: "",
    pickup_location: "some pickup_location",
    address: %{
      complements: "some complements",
      number: "some number",
      postal_code: "some postal_code",
      street: "some street",
      telephone_number: "some telephone_number",
      town: "some town"
    }
  }

  setup do
    motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
    %{motorcycle: motorcycle}
  end

  setup %{motorcycle: motorcycle} do
    {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
    %{lead: lead}
  end

  def fixture(:delivery_choice, lead) do
    pickup_attrs = %{@pickup_attrs | "lead_id": lead.id}
    {:ok, delivery_choice} = Delivery.create_delivery_choice(pickup_attrs)
    delivery_choice
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create delivery_choice" do
    test "renders delivery_choice when it is pickup location", %{lead: lead, conn: conn} do
      conn = post conn, lead_delivery_choice_path(conn, :create, lead.id), delivery_choice: @pickup_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_delivery_choice_path(conn, :show, lead.id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "pickup_location" => "some pickup_location",
               "address" => nil
             }
    end

    test "renders delivery_choice when it is home delivery", %{lead: lead, conn: conn} do
      conn = post conn, lead_delivery_choice_path(conn, :create, lead.id), delivery_choice: @address_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, lead_delivery_choice_path(conn, :show, lead.id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "pickup_location" => nil,
               "address" => %{
                 "complements" => "some complements",
                 "number" => "some number",
                 "postal_code" => "some postal_code",
                 "street" => "some street",
                 "telephone_number" => "some telephone_number",
                 "town" => "some town"
               }
             }
    end

    test "renders errors when data is invalid because no home address nor pikcup location", %{lead: lead, conn: conn} do
      invalid_attrs_none = %{@invalid_attrs_none | "lead_id": lead.id}
      conn = post conn, lead_delivery_choice_path(conn, :create, lead.id), delivery_choice: invalid_attrs_none
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "renders errors when data is invalid because both home address and pickup location",
         %{lead: lead, conn: conn} do
      invalid_attrs_both = %{@invalid_attrs_both | "lead_id": lead.id}
      conn = post conn, lead_delivery_choice_path(conn, :create, lead.id), delivery_choice: invalid_attrs_both
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete delivery_choice" do
    setup %{lead: lead} do
      delivery_choice = fixture(:delivery_choice, lead)
      {:ok, delivery_choice: delivery_choice}
    end
  end
end
