defmodule HeroDigital.ExAdmin.Fulfillment.PurchaseOrder do
  use ExAdmin.Register

  register_resource HeroDigital.Fulfillment.PurchaseOrder do
    menu label: "Ordenes de Compra", priority: 2

  end
end
