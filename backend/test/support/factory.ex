defmodule HeroDigital.Factory do

  alias HeroDigital.Product

  @valid_accessory_attrs %{description: "some description", logo_url: "some logo_url", name: "some name", price: "120.5"}

  def new_accessory() do
    {:ok, accessory} = Product.create_accessory(@valid_accessory_attrs)
    accessory
  end
end
