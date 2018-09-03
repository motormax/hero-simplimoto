defmodule HeroDigital.ExAdmin.Identity.Lead do
  use ExAdmin.Register

  register_resource HeroDigital.Identity.Lead do
    show lead do
      attributes_table do
        row :created_at, label: "Fecha de creación"
        row :is_active, [label: "Compra cerrada?"], fn(l) ->
          if not l.is_active do
            text "Sí"
          else
            text "No"
          end
        end
        row :motorcycle, label: "Modelo de moto"
      end

      panel "Financiamiento" do
        markup_contents do
          case HeroDigital.Financing.get_financing_data_by_lead_id(lead.id) do
            nil -> text "el usuario no ingresó datos"
            financing_data ->
              attributes_table_for(financing_data) do
                row "Issuer", fn(f) ->
                  div do
                    text f.issuer_name
                    img(src: f.issuer_logo)
                  end
                end
                row "Metodo de pago", fn(f) ->
                  div do
                    text f.payment_method_name
                    img(src: f.payment_method_logo)
                  end
                end
                row :monthly_amount, label: "Monto mensual"
                row :costs, label: "Costos financieros"
                row :installments, label: "Cantidad de cuotas"
              end
          end
        end
      end

      panel "Metodo de envio" do
        markup_contents do
          case HeroDigital.Delivery.get_delivery_choice_for_lead(lead.id) do
            nil -> text "El usuario no ingresó datos"
            delivery ->
              if delivery.address == nil do
                attributes_table_for(delivery) do
                  row "Metodo", fn(d) -> text "La paso a buscar por un concesionario" end
                  row "Concesionario", fn(d) -> d.pickup_location end
                end
              else
                attributes_table_for(delivery) do
                  row "Metodo", fn(d) -> text "La llevamos a la dirección" end
                  row "Direccion", fn(d) -> d.address.street end
                end
              end
          end
        end
      end

      panel "Seguro" do
        markup_contents do
          case HeroDigital.Insurance.get_insurance_choice_by_lead_id(lead.id) do
            nil -> text "El usuario no ingresó datos"
            insurance ->
              if insurance.quote_policy == nil do
                attributes_table_for(insurance) do
                  row "Tipo", fn(d) -> text "Me aseguro a mi mismo" end
                  row "Concesionario", fn(d) -> d.pickup_location end
                end
              else
                attributes_table_for(insurance) do
                  row "Tipo", fn(_i) -> text "Me asegura hero" end
                  row "Aseguradora", fn(i) ->
                    div do
                      text i.insurance_broker.name
                      img(src: i.insurance_broker.logo_url, height: "50px")
                    end
                  end
                  row "Seguro", fn(i) -> text i.insurance_policy.name end
                  row "Precio", fn(i) -> text i.insurance_policy.price end
                  row :query_province, label: "Provincia"
                  row :query_age, label: "Edad"
                  row :query_postal_code, label: "Código Postal"
                end
              end
          end
        end
      end

      panel "Patentamiento" do
        personal_registration = HeroDigital.PlateRegistration.PlateRegistrationType.personal_plate_registration_tag()
        hero_registration = HeroDigital.PlateRegistration.PlateRegistrationType.hero_plate_registration_tag()

        markup_contents do
          case HeroDigital.PlateRegistration.get_plate_registration_data_for_lead(lead.id) do
            nil -> text "El usuario no ingresó datos"
            plate_registration -> case plate_registration.plate_registration_type.name do
              ^personal_registration ->
                text "Patenta por su cuenta y tiene que pagar $ #{plate_registration.plate_registration_type.price}"
              ^hero_registration ->
                attributes_table_for(plate_registration) do
                  row "Precio", fn(pr) -> text "$ #{pr.plate_registration_type.price}" end
                  row "DNI", fn(pr) -> pr.personal_data.dni end
                  row "Nombre", fn(pr) -> pr.personal_data.name end
                  row "Apellido", fn(pr) -> pr.personal_data.last_name end
                  row "Email", fn(pr) -> pr.email.email end
                  row "Telefono", fn(pr) -> pr.phone.phone end
                  row "Dni frontal", fn(pr) ->
                    div do
                      img(src: pr.front_dni_image.data, height: "50px")
                    end
                  end
                  row "Dni reverso", fn(pr) ->
                    div do
                      img(src: pr.back_dni_image.data, height: "50px")
                    end
                  end
                  row "Direccion", fn(pr) -> pr.address.street end
                end
              _ -> text "Tipo de patentamiento desconocido. Contacte un administrador"
              end
          end
        end
      end

      panel "Personalizacion" do
        markup_contents do
          text "TODO"
        end
      end

      panel "Accesorios" do
        markup_contents do
          text "TODO"
        end
      end
    end
  end
end
