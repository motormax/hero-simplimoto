defmodule HeroDigital.ExAdmin.Payment.Payment do
  use ExAdmin.Register

  register_resource HeroDigital.Payment.Payment do
    menu label: "Pagos", priority: 2

    index do
      selectable_column

      column :id
      column :status
      column :status_detail
      column :transaction_id
      # column :purchase_order
      # column :raw_body, :string
      actions()       # display the default actions column
    end
  end
end
