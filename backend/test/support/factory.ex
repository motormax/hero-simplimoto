defmodule HeroDigital.Factory do

  alias HeroDigital.Product

  @valid_accessory_attrs %{description: "some description", logo_url: "some logo_url", name: "some name", price: "120.5"}
  @valid_different_accessory_attrs %{description: "different description", logo_url: "different logo_url", name: "different name", price: "1500"}

  def new_accessory(), do: create_accessory(@valid_accessory_attrs)

  def new_different_accessory(), do: create_accessory(@valid_different_accessory_attrs)

  defp create_accessory(attrs) do
    {:ok, accessory} = Product.create_accessory(attrs)
    accessory
  end
end
