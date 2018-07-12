defmodule HeroDigitalWeb.DeliveryChoiceControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Delivery
  alias HeroDigital.Identity

  @pickup_attrs %{user_id: "", pickup_location: 42, address: nil}
  @address_attrs %{
    user_id: "",
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
  @invalid_attrs_none %{user_id: nil, pickup_location: nil, address: nil}
  @invalid_attrs_both %{
    user_id: "",
    pickup_location: 42,
    address: %{
      complements: "some complements",
      number: "some number",
      postal_code: "some postal_code",
      street: "some street",
      telephone_number: "some telephone_number",
      town: "some town"
    }
  }

  def fixture(:delivery_choice, user) do
    pickup_attrs = %{@pickup_attrs | "user_id": user.id}
    {:ok, delivery_choice} = Delivery.create_delivery_choice(pickup_attrs)
    delivery_choice
  end

  setup do
    {:ok, user} = Identity.create_user()
    %{user: user}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all delivery_choices", %{conn: conn} do
      conn = get conn, delivery_choice_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create delivery_choice" do
    test "renders delivery_choice when it is pickup location", %{user: user, conn: conn} do
      pickup_attrs = %{@pickup_attrs | "user_id": user.id}
      conn = post conn, delivery_choice_path(conn, :create), delivery_choice: pickup_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, delivery_choice_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "pickup_location" => 42,
               "address" => nil
             }
    end

    test "renders delivery_choice when it is home delivery", %{user: user, conn: conn} do
      address_attrs = %{@address_attrs | "user_id": user.id}
      conn = post conn, delivery_choice_path(conn, :create), delivery_choice: address_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, delivery_choice_path(conn, :show, id)
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

    test "renders errors when data is invalid because no home address nor pikcup location", %{user: user, conn: conn} do
      invalid_attrs_none = %{@invalid_attrs_none | "user_id": user.id}
      conn = post conn, delivery_choice_path(conn, :create), delivery_choice: invalid_attrs_none
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "renders errors when data is invalid because both home address and pickup location",
         %{user: user, conn: conn} do
      invalid_attrs_both = %{@invalid_attrs_both | "user_id": user.id}
      conn = post conn, delivery_choice_path(conn, :create), delivery_choice: invalid_attrs_both
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete delivery_choice" do
    setup %{user: user} do
      delivery_choice = fixture(:delivery_choice, user)
      {:ok, delivery_choice: delivery_choice}
    end

    test "deletes chosen delivery_choice", %{conn: conn, delivery_choice: delivery_choice} do
      conn = delete conn, delivery_choice_path(conn, :delete, delivery_choice)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, delivery_choice_path(conn, :show, delivery_choice)
      end
    end
  end

end
