defmodule HeroDigital.UserDataTest do
  use HeroDigital.DataCase

  alias HeroDigital.UserData

  describe "personal_data" do

    @valid_attrs %{dni: "some dni", last_name: "some last_name", name: "some name", lead_id: "7488a646-e31f-11e4-aace-600308960662"}

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
  end
end
