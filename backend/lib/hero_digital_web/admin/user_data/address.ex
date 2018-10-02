defmodule HeroDigital.ExAdmin.UserData.Address do
  use ExAdmin.Register

  register_resource HeroDigital.UserData.Address do
    menu label: "Direcciones"
  end
end
