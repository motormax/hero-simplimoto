defmodule HeroDigital.Mailer do
  use Bamboo.Mailer, otp_app: :hero_digital
  use Bamboo.Phoenix, view: HeroDigital.MailsView


  def send_successful_purcharse_mail(purchase_order) do
    new_email()
    |> from("Hero Digital <hero@hero.com.ar>")
    |> to(purchase_order.email)

    |> subject("Compraste un moto!")
    |> assign(:purchase_order, purchase_order)

    |> put_text_layout({HeroDigitalWeb.MailsView, "success.text"})
    |> put_html_layout({HeroDigitalWeb.MailsView, "success.html"})

    |> render(:text_and_html_email)
    |> deliver_now()
  end
end
