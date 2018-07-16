defmodule HeroDigital.IdentityTest do
  use HeroDigital.DataCase

  alias HeroDigital.Identity

  describe "users" do
    @valid_attrs %{id: "7488a646-e31f-11e4-aace-600308960662"}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Identity.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Identity.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Identity.get_user!(user.id) == user
    end
  end
end
