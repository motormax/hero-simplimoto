defmodule HeroDigital.ExAdmin.UserData.PersonalData do
  use ExAdmin.Register

  register_resource HeroDigital.UserData.PersonalData do
    menu label: "Datos Personales"
  end
end
