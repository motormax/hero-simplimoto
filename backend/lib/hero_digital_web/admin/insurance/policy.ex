defmodule HeroDigital.ExAdmin.Insurance.Policy do
  use ExAdmin.Register

  register_resource HeroDigital.Insurance.Policy do
    menu label: "Polizas de Seguro"
    index do
      selectable_column()

      column :id
      column :insurance_broker
      column :name
      column :motorcycle
      column :price
      actions()     # display the default actions column
    end

    form policy do
      inputs do
        input policy, :insurance_broker, collection: HeroDigital.Repo.all(HeroDigital.Insurance.Broker)
        input policy, :name
        input policy, :motorcycle, collection: HeroDigital.Repo.all(HeroDigital.Product.Motorcycle)
        input policy, :price
        input policy, :details, maxlength: "10000"
        input policy, :postal_codes, maxlength: "10000"
        input policy, :max_age
        input policy, :min_age
        input policy, :external_id
      end
    end
  end

end
