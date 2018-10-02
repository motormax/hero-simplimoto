defmodule HeroDigital.ExAdmin.Product.Motorcycle do
  use ExAdmin.Register

  register_resource HeroDigital.Product.Motorcycle do
    menu label: "Motos", priority: 3
  end
end
