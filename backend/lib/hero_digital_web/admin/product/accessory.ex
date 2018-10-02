defmodule HeroDigital.ExAdmin.Product.Accessory do
  use ExAdmin.Register

  register_resource HeroDigital.Product.Accessory do
    menu label: "Accesorios", priority: 4
  end
end
