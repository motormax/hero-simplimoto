defmodule HeroDigital.Core.MotorcycleTest do
  use HeroDigital.DataCase

  alias HeroDigital.Core.Motorcycle

  @valid_attrs %{name: "some name", price: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Motorcycle.changeset(%Motorcycle{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Motorcycle.changeset(%Motorcycle{}, @invalid_attrs)
    refute changeset.valid?
  end
end
