defmodule HeroDigital.UserDataTest do
  use HeroDigital.DataCase

  alias HeroDigital.UserData

  describe "personal_data" do
    alias HeroDigital.UserData.PersonalData

    @valid_attrs %{dni: "some dni", last_name: "some last_name", name: "some name", lead_id: "7488a646-e31f-11e4-aace-600308960662"}
    @update_attrs %{dni: "some updated dni", last_name: "some updated last_name", name: "some updated name", lead_id: "7488a646-e31f-11e4-aace-600308960662"}
    @invalid_attrs %{dni: nil, last_name: nil, name: nil, lead_id: "7488a646-e31f-11e4-aace-600308960662"}

    def personal_data_fixture(attrs \\ %{}) do
      {:ok, personal_data} =
        attrs
        |> Enum.into(@valid_attrs)
        |> UserData.create_personal_data()

      personal_data
    end

    test "list_personal_data/0 returns all personal_data" do
      personal_data = personal_data_fixture()
      assert UserData.list_personal_data() == [personal_data]
    end

    test "get_personal_data!/1 returns the personal_data with given id" do
      personal_data = personal_data_fixture()
      assert UserData.get_personal_data!(personal_data.id) == personal_data
    end

    test "create_personal_data/1 with valid data creates a personal_data" do
      assert {:ok, %PersonalData{} = personal_data} = UserData.create_personal_data(@valid_attrs)
      assert personal_data.dni == "some dni"
      assert personal_data.last_name == "some last_name"
      assert personal_data.name == "some name"
    end

    test "create_personal_data/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = UserData.create_personal_data(@invalid_attrs)
    end

    test "update_personal_data/2 with valid data updates the personal_data" do
      personal_data = personal_data_fixture()
      assert {:ok, personal_data} = UserData.update_personal_data(personal_data, @update_attrs)
      assert %PersonalData{} = personal_data
      assert personal_data.dni == "some updated dni"
      assert personal_data.last_name == "some updated last_name"
      assert personal_data.name == "some updated name"
    end

    test "update_personal_data/2 with invalid data returns error changeset" do
      personal_data = personal_data_fixture()
      assert {:error, %Ecto.Changeset{}} = UserData.update_personal_data(personal_data, @invalid_attrs)
      assert personal_data == UserData.get_personal_data!(personal_data.id)
    end

    test "delete_personal_data/1 deletes the personal_data" do
      personal_data = personal_data_fixture()
      assert {:ok, %PersonalData{}} = UserData.delete_personal_data(personal_data)
      assert_raise Ecto.NoResultsError, fn -> UserData.get_personal_data!(personal_data.id) end
    end

    test "change_personal_data/1 returns a personal_data changeset" do
      personal_data = personal_data_fixture()
      assert %Ecto.Changeset{} = UserData.change_personal_data(personal_data)
    end
  end
end
