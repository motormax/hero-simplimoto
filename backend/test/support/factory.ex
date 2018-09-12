defmodule HeroDigital.Factory do

  alias HeroDigital.Product
  alias HeroDigital.PlateRegistration
  alias HeroDigital.PlateRegistration.PlateRegistrationType

  #------------------------------------------------------------------------
  # ACCESSORIES

  @valid_accessory_attrs %{description: "some description", logo_url: "some logo_url", name: "some name", price: "120.5"}
  @valid_different_accessory_attrs %{description: "different description", logo_url: "different logo_url", name: "different name", price: "1500"}

  def new_accessory(), do: create_accessory(@valid_accessory_attrs)

  def new_different_accessory(), do: create_accessory(@valid_different_accessory_attrs)

  defp create_accessory(attrs) do
    {:ok, accessory} = Product.create_accessory(attrs)
    accessory
  end

  #-------------------------------------------------------------------------
  # PLATE REGISTRATION

  @valid_price Decimal.new(1500)
  @personal_plate_registration_type_attrs %{ "name" => PlateRegistrationType.personal_plate_registration_tag, "price" => @valid_price }
  @valid_personal_plate_registration_attrs %{ "opt_in_or_out" => PlateRegistrationType.personal_plate_registration_tag }

  def create_personal_plate_registration(lead_id) do
    PlateRegistration.create_plate_registration_type(@personal_plate_registration_type_attrs)
    Map.put(@valid_personal_plate_registration_attrs, "lead_id", lead_id)
    |> PlateRegistration.create_plate_registration_data()
  end

end
