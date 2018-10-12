defmodule HeroDigital.ExAdmin.Fulfillment.PurchaseOrder do
  use ExAdmin.Register

  register_resource HeroDigital.Fulfillment.PurchaseOrder do
    menu label: "Ordenes de Compra", priority: 2

    show purchase_order do
      attributes_table do
        row :email
        row :payment_method
        row :lead
      end

      panel "Pago" do
        markup_contents do
          case HeroDigital.Repo.preload(purchase_order, [:payment]).payment do
            nil -> text "el usuario no finalizó la compra"
            payment ->
              attributes_table_for(payment) do
                row "Status", fn(payment) -> payment.status end
                row "Detalle", fn(payment) -> payment.status_detail end
                row "Mensaje al usuario", fn(payment) -> payment.user_message end
                row "ID de transacción de MercadoPago", fn(payment) -> payment.transaction_id end
            end
          end
        end
      end
    end
  end
end
