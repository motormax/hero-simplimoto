defmodule HeroDigital.TradeInTest do
  use HeroDigital.DataCase

  alias HeroDigital.TradeIn

  describe "trade_ins" do
    alias HeroDigital.TradeIn.TradeInData
    alias HeroDigital.Product.Motorcycle
    alias HeroDigital.Identity

    @valid_attrs %{brand: "some brand", description: "some description", email: "some email", model: "some model", name: "some name", telephone: "some telephone", year: "some year", location: "some location", license_plate: "some license plate"}
    @update_attrs %{brand: "some updated brand", description: "some updated description", email: "some updated email", model: "some updated model", name: "some updated name", telephone: "some updated telephone", year: "some updated year", location: "some updated location", license_plate: "some updated license plate"}
    @invalid_attrs %{brand: nil, description: nil, email: nil, model: nil, name: nil, telephone: nil, year: nil, location: nil}

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      %{motorcycle: motorcycle}
    end

    setup %{motorcycle: motorcycle} do
      {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
      %{lead: lead}
    end

    def trade_in_data_fixture(attrs \\ %{}) do
      {:ok, trade_in_data} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TradeIn.create_trade_in_data()

      trade_in_data
    end

    test "list_trade_ins/0 returns all trade_ins", %{lead: lead} do
      trade_in_data = trade_in_data_fixture(%{lead_id: lead.id})
      assert TradeIn.list_trade_ins() == [trade_in_data]
    end

    test "get_trade_in_data!/1 returns the trade_in_data with given id", %{lead: lead} do
      trade_in_data = trade_in_data_fixture(%{lead_id: lead.id})
      assert TradeIn.get_trade_in_data!(trade_in_data.id) == trade_in_data
    end

    test "create_trade_in_data/1 with valid data creates a trade_in_data", %{lead: lead} do
      valid_attrs = Map.put(@valid_attrs, :lead_id, lead.id)
      assert {:ok, %TradeInData{} = trade_in_data} = TradeIn.create_trade_in_data(valid_attrs)
      assert trade_in_data.brand == "some brand"
      assert trade_in_data.description == "some description"
      assert trade_in_data.email == "some email"
      assert trade_in_data.model == "some model"
      assert trade_in_data.name == "some name"
      assert trade_in_data.telephone == "some telephone"
      assert trade_in_data.year == "some year"
    end

    test "create_trade_in_data/1 with invalid data returns error changeset", %{lead: lead} do
      invalid_attrs = Map.put(@invalid_attrs, :lead_id, lead.id)
      assert {:error, %Ecto.Changeset{}} = TradeIn.create_trade_in_data(invalid_attrs)
    end

    test "update_trade_in_data/2 with valid data updates the trade_in_data", %{lead: lead} do
      trade_in_data = trade_in_data_fixture(%{lead_id: lead.id})
      assert {:ok, trade_in_data} = TradeIn.update_trade_in_data(trade_in_data, @update_attrs)
      assert %TradeInData{} = trade_in_data
      assert trade_in_data.brand == "some updated brand"
      assert trade_in_data.description == "some updated description"
      assert trade_in_data.email == "some updated email"
      assert trade_in_data.model == "some updated model"
      assert trade_in_data.name == "some updated name"
      assert trade_in_data.telephone == "some updated telephone"
      assert trade_in_data.year == "some updated year"
    end

    test "update_trade_in_data/2 with invalid data returns error changeset", %{lead: lead} do
      trade_in_data = trade_in_data_fixture(%{lead_id: lead.id})
      assert {:error, %Ecto.Changeset{}} = TradeIn.update_trade_in_data(trade_in_data, @invalid_attrs)
      assert trade_in_data == TradeIn.get_trade_in_data!(trade_in_data.id)
    end

    test "delete_trade_in_data/1 deletes the trade_in_data", %{lead: lead} do
      trade_in_data = trade_in_data_fixture(%{lead_id: lead.id})
      assert {:ok, %TradeInData{}} = TradeIn.delete_trade_in_data(trade_in_data)
      assert_raise Ecto.NoResultsError, fn -> TradeIn.get_trade_in_data!(trade_in_data.id) end
    end

    test "change_trade_in_data/1 returns a trade_in_data changeset", %{lead: lead} do
      trade_in_data = trade_in_data_fixture(%{lead_id: lead.id})
      assert %Ecto.Changeset{} = TradeIn.change_trade_in_data(trade_in_data)
    end
  end
end
