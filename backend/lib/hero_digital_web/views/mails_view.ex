defmodule HeroDigitalWeb.MailsView do
  use HeroDigitalWeb, :view
  alias HeroDigital.PlateRegistration.PlateRegistrationData
  alias HeroDigital.Insurance.InsuranceChoice

  @assets_path Application.get_env(:hero_digital, __MODULE__)[:assets_path]

  def assets_path() do
    @assets_path
  end

  def personal_plate_registration_type() do
    PlateRegistrationData.personal_plate_registration_type()
  end

  def hero_plate_registration_type() do
    PlateRegistrationData.hero_plate_registration_type()
  end


  def personal_insurance_type() do
    InsuranceChoice.personal_insurance_type()
  end

  def hero_insurance_type() do
    InsuranceChoice.hero_insurance_type()
  end
end
