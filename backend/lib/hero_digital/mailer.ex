defmodule HeroDigital.Mailer do
  use Bamboo.Mailer, otp_app: :hero_digital
  use Bamboo.Phoenix, view: HeroDigital.MailsView


  def send_trade_in_mail(trade_in_data, lead_id) do
    lead = HeroDigital.Identity.get_lead!(lead_id)

    new_email()
    |> from("Hero Moto Digital <ventas@heromotodigital.com>")
    |> to("ventas@heromotodigital.com")

    |> subject("Nuevo Trade In")
    |> assign(:trade_in, trade_in_data)
    |> assign(:lead, lead)

    |> put_text_layout({HeroDigitalWeb.MailsView, "trade_in.text"})
    |> put_html_layout({HeroDigitalWeb.MailsView, "trade_in.html"})

    |> render(:text_and_html_email)
    |> deliver_now()
  end

  def send_appointment_mail(date_appointment, lead_id) do
    lead = HeroDigital.Identity.get_lead!(lead_id)

    new_email()
    |> from("Hero Moto Digital <ventas@heromotodigital.com>")
    |> to("ventas@heromotodigital.com")

    |> subject("Nueva Cita")
    |> assign(:date_appointment, date_appointment)
    |> assign(:lead, lead)

    |> put_text_layout({HeroDigitalWeb.MailsView, "date_appointment.text"})
    |> put_html_layout({HeroDigitalWeb.MailsView, "date_appointment.html"})

    |> render(:text_and_html_email)
    |> deliver_now()
  end

  def send_successful_purcharse_mail(purchase_order) do
    lead = purchase_order.lead
    new_email()
    |> from("Hero Moto Digital <ventas@heromotodigital.com>")
    |> to(purchase_order.email)
    |> bcc("ventas@heromotodigital.com")

    |> subject("Compraste una moto en Hero Digital!")
    |> assign(:purchase_order, purchase_order)
    |> assign(:lead, lead)
    |> assign(:accessories, lead.accessories)
    |> assign(:plate_registration_data, lead.plate_registration_data)
    |> assign(:insurance, lead.insurance_choice)
    |> assign(:delivery, lead.delivery_choice)

    |> put_text_layout({HeroDigitalWeb.MailsView, "success.text"})
    |> put_html_layout({HeroDigitalWeb.MailsView, "success.html"})

    |> render(:text_and_html_email)
    |> deliver_now()
  end
end
