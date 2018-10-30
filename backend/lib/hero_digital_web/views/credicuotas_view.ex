defmodule HeroDigitalWeb.CredicuotasView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.CredicuotasView

  def render("show.json", %{installments: installments}) do
    %{data: render_many(installments, CredicuotasView, "installment.json")}
  end

  def render("installment.json", %{credicuotas: installment}) do
    %{amount: installment["amount"], installments: installment["installments"]}
  end
end
