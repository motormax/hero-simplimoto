defmodule HeroDigital.ExAdmin.TradeIn.TradeInData do
  use ExAdmin.Register

  register_resource HeroDigital.TradeIn.TradeInData do
    menu label: "Trade In", priority: 5
  end
end
