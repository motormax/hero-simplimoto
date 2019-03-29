defmodule HeroDigitalWeb.FinancingDataView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.FinancingDataView

  def render("index.json", %{financing_data: financing_data}) do
    %{data: render_many(financing_data, FinancingDataView, "financing_data.json")}
  end

  def render("show.json", %{financing_data: financing_data}) do
    %{data: render_one(financing_data, FinancingDataView, "financing_data.json")}
  end

  def render("financing_data.json", %{financing_data: financing_data}) do
    %{id: financing_data.id,
      payment_method_id: financing_data.payment_method_id,
      issuer_id: financing_data.issuer_id,
      installments: financing_data.installments,
      payment_method_name: financing_data.payment_method_name,
      payment_method_logo: financing_data.payment_method_logo,
      issuer_logo: financing_data.issuer_logo,
      issuer_name: financing_data.issuer_name,
      message: financing_data.message,
      costs: financing_data.costs,
      monthly_amount: financing_data.monthly_amount,
      cash_amount: financing_data.cash_amount}
  end
end
