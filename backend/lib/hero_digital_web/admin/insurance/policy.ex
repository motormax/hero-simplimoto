defmodule HeroDigital.ExAdmin.Insurance.Policy do
  use ExAdmin.Register

  register_resource HeroDigital.Insurance.Policy do
    index do
      selectable_column()

      column :id
      column :insurance_broker
      column :name
      column :motorcycle
      column :price
      actions()     # display the default actions column
    end
  end

end
