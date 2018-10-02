defmodule HeroDigital.ExAdmin.Insurance.InsuranceChoice do
  use ExAdmin.Register

  register_resource HeroDigital.Insurance.InsuranceChoice do
    menu label: "Solicitudes de Seguro"

    index do
      selectable_column()

      column :id
      column :lead, fn (insurance_choice) ->
        insurance_choice.lead_id
      end
      column :motorcycle
      column :opt_in_or_out
      column :insurance_broker
      column :insurance_policy
      column :quote_price
      column :quote_broker_name
      column :quote_policy
      column :quote_more_info
      column :query_province
      column :query_age
      column :query_postal_code
      actions()     # display the default actions column
    end
  end
end
