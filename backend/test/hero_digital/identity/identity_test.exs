defmodule HeroDigital.IdentityTest do
  use HeroDigital.DataCase

  alias HeroDigital.Identity

  describe "users" do
    alias HeroDigital.Identity.User

    @valid_attrs %{id: "7488a646-e31f-11e4-aace-600308960662"}
    @update_attrs %{id: "7488a646-e31f-11e4-aace-600308960668"}
    @invalid_attrs %{}

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

    @tag :skip
    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Identity.create_user(@valid_attrs)
      assert user.id == "7488a646-e31f-11e4-aace-600308960662"
    end

    @tag :skip
    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Identity.create_user(@invalid_attrs)
    end

    @tag :skip
    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Identity.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.id == "7488a646-e31f-11e4-aace-600308960668"
    end

    @tag :skip
    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Identity.update_user(user, @invalid_attrs)
      assert user == Identity.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Identity.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Identity.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Identity.change_user(user)
    end
  end
end
