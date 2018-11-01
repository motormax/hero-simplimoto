defmodule HeroDigitalWeb.CredicuotasView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.CredicuotasView

  def render("show.json", %{installments: installments}) do
    %{data: render_many(installments, CredicuotasView, "installment.json")}
  end

  def render("installment.json", %{credicuotas: installment}) do
    %{amount: installment["amount"], installments: installment["installments"], message: installment_message(installment)}
  end

  defp installment_message(%{"amount" => amount, "installments" => installments}) do
    formatted_amount = Float.to_string(amount, decimals: 2)
    formatted_total = Float.to_string(installments * amount, decimals: 2)
    "#{installments} #{installments == 1 && "cuota" || "cuotas"} de $#{formatted_amount} ($#{formatted_total})"
  end
end
