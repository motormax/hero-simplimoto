defmodule HeroDigital.Mailer do
  use Bamboo.Mailer, otp_app: :hero_digital
  use Bamboo.Phoenix, view: HeroDigital.MailsView


  def send_successful_purcharse_mail(purchase_order) do
    lead = purchase_order.lead
    new_email()
    |> from("Hero Digital <hero@hero.com.ar>")
    |> to(purchase_order.email)

    |> subject("Compraste una moto en Hero Digital!")
    |> assign(:purchase_order, purchase_order)
    |> assign(:lead, lead)
    |> assign(:plate_registration_data, lead.plate_registration_data)
    |> assign(:insurance, lead.insurance_choice)
    |> assign(:delivery, lead.delivery_choice)

    |> put_text_layout({HeroDigitalWeb.MailsView, "success.text"})
    |> put_html_layout({HeroDigitalWeb.MailsView, "success.html"})

    |> render(:text_and_html_email)
    |> deliver_now()
  end
end
