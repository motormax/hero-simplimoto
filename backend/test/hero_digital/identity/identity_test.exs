defmodule HeroDigital.IdentityTest do
  use HeroDigital.DataCase

  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  describe "users" do
    alias HeroDigital.Identity.User

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Identity.create_user()

      user
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      %{motorcycle: motorcycle}
    end

    test "create_user/1 with valid data creates a user", %{motorcycle: motorcycle} do
      assert {:ok, %User{} = user} = Identity.create_user(Map.put(@valid_attrs, :motorcycle_id, motorcycle.id))
      assert user.motorcycle.id == motorcycle.id
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Identity.create_user(@invalid_attrs)
    end

    test "get_user!/1 returns the user with given id", %{motorcycle: motorcycle}  do
      user = user_fixture(%{motorcycle_id: motorcycle.id})
      assert Identity.get_user!(user.id) == %{user | motorcycle: motorcycle}
    end
  end
end
