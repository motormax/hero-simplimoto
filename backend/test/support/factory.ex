defmodule HeroDigital.Factory do

  @valid_accessory_attrs %{description: "some description", logo_url: "some logo_url", name: "some name", price: "120.5"}

  def accessory_attrs() do
    @valid_accessory_attrs
  end

end
