defmodule HeroDigital.ExAdmin.UserData.Image do
  use ExAdmin.Register

  register_resource HeroDigital.UserData.Image do
    menu label: "Imagenes"
  end
end
