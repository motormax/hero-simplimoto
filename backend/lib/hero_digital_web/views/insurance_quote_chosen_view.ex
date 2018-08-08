defmodule HeroDigitalWeb.InsuranceQuoteChosenView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.InsuranceQuoteChosenView

  def render("index.json", %{insuarnce_quotes_chosen: insuarnce_quotes_chosen}) do
    %{data: render_many(insuarnce_quotes_chosen, InsuranceQuoteChosenView, "insurance_quote_chosen.json")}
  end

  def render("show.json", %{insurance_quote_chosen: insurance_quote_chosen}) do
    %{data: render_one(insurance_quote_chosen, InsuranceQuoteChosenView, "insurance_quote_chosen.json")}
  end

  def render("insurance_quote_chosen.json", %{insurance_quote_chosen: insurance_quote_chosen}) do
    %{
      id: insurance_quote_chosen.id,
      opt_in_or_out: insurance_quote_chosen.opt_in_or_out,
      quote_price: insurance_quote_chosen.quote_price,
      quote_broker_name: insurance_quote_chosen.quote_broker_name,
      quote_policy: insurance_quote_chosen.quote_policy,
      quote_more_info: insurance_quote_chosen.quote_more_info,
      query_province: insurance_quote_chosen.query_province,
      query_age: insurance_quote_chosen.query_age,
      query_postal_code: insurance_quote_chosen.query_postal_code,
      motorcycle_id: insurance_quote_chosen.motorcycle_id,
      insurance_broker_id: insurance_quote_chosen.insurance_broker_id,
      insurance_policy_id: insurance_quote_chosen.insurance_policy_id,
      lead_id: insurance_quote_chosen.lead_id
    }
  end
end
