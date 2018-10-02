defmodule HeroDigital.ExAdmin.UserData.Email do
  use ExAdmin.Register

  register_resource HeroDigital.UserData.Email do
    menu label: "Emails"
  end
end
