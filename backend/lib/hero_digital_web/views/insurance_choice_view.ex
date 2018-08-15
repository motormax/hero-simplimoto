defmodule HeroDigitalWeb.InsuranceChoiceView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.InsuranceChoiceView

  def render("index.json", %{insurance_choices: insurance_choices}) do
    %{data: render_many(insurance_choices, InsuranceChoiceView, "insurance_choice.json")}
  end

  def render("show.json", %{insurance_choice: insurance_choice}) do
    %{data: render_one(insurance_choice, InsuranceChoiceView, "insurance_choice.json")}
  end

  def render("insurance_choice.json", %{insurance_choice: insurance_choice}) do
    %{
      id: insurance_choice.id,
      opt_in_or_out: insurance_choice.opt_in_or_out,
      quote_price: insurance_choice.quote_price,
      quote_broker_name: insurance_choice.quote_broker_name,
      quote_broker_logo_url: insurance_choice.quote_broker_logo_url,
      quote_policy: insurance_choice.quote_policy,
      quote_more_info: insurance_choice.quote_more_info,
      query_province: insurance_choice.query_province,
      query_age: insurance_choice.query_age,
      query_postal_code: insurance_choice.query_postal_code,
      motorcycle_id: insurance_choice.motorcycle_id,
      insurance_broker_id: insurance_choice.insurance_broker_id,
      insurance_policy_id: insurance_choice.insurance_policy_id,
      lead_id: insurance_choice.lead_id
    }
  end
end
