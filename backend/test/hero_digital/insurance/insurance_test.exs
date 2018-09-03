defmodule HeroDigital.InsuranceTest do
  use HeroDigital.DataCase

  alias HeroDigital.Insurance
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity
  alias Decimal

  describe "insurance_choices" do
    alias HeroDigital.Insurance.InsuranceChoice

    @personal_insurance "personalInsurance"
    @hero_insurance "heroInsurance"
    @query_postal_code "1194"
    @query_age 30
    @query_province "Capital Federal"

    def policy_chosen(motorcycle_id, broker_id) do
      policy = HeroDigital.Repo.insert!(
          %HeroDigital.Insurance.Policy {
          name: "Solo responsabilidad civil",
          details: "Detalle del seguro",
          price: Decimal.new(123),
          postal_codes: @query_postal_code,
          min_age: 1,
          max_age: 100,
          external_id: "atm policy",
          motorcycle_id: motorcycle_id,
          insurance_broker_id: broker_id
        }
      )
      %{policy: policy}
    end

    def personal_insurance_choice_attrs(motorcycle_id, lead_id) do
      %{lead_id: lead_id, motorcycle_id: motorcycle_id, opt_in_or_out: @personal_insurance}
    end

    def hero_insurance_choice_attrs(motorcycle, lead, broker) do
      %{policy: policy} = policy_chosen(motorcycle.id, broker.id)
      %{
        lead_id: lead.id,
        motorcycle_id: motorcycle.id,
        insurance_policy_id: policy.id,
        insurance_broker_id: broker.id,
        opt_in_or_out: @hero_insurance,
        query_postal_code: @query_postal_code,
        query_age: @query_age,
        query_province: @query_province,
        quote_price: policy.price,
        quote_broker_name: broker.name,
        quote_broker_logo_url: broker.logo_url,
        quote_policy: policy.name,
        quote_more_info: policy.details
      }
    end

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "DASH", price: 200})
      %{motorcycle: motorcycle}
    end

    setup %{motorcycle: motorcycle} do
      {:ok, lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      %{lead: lead}
    end

    setup do
      broker = HeroDigital.Repo.insert!(%HeroDigital.Insurance.Broker{:external_id => "atm", :logo_url => "http://motos-ci.123seguro.com/images/front/paso34/SVG/atm.svg", :name => "ATM"})
      %{broker: broker}
    end

    test "create_insurance_choice/1 with valid data and opt_in_or_out as personal_insurance
    creates a insurance_choice with fields opt_in_or_out, lead_id and motorcycle_id as non nil", %{motorcycle: motorcycle, lead: lead} do
      attrs = personal_insurance_choice_attrs(motorcycle.id, lead.id)
      assert {:ok, %InsuranceChoice{} = insurance_choice} = Insurance.create_insurance_choice(attrs)
      assert insurance_choice.lead_id == lead.id
      assert insurance_choice.motorcycle_id == motorcycle.id
      assert insurance_choice.opt_in_or_out == @personal_insurance
      assert is_nil(insurance_choice.quote_price)
      assert is_nil(insurance_choice.quote_broker_name)
      assert is_nil(insurance_choice.quote_broker_logo_url)
      assert is_nil(insurance_choice.quote_policy)
      assert is_nil(insurance_choice.quote_more_info)
      assert is_nil(insurance_choice.query_province)
      assert is_nil(insurance_choice.query_age)
      assert is_nil(insurance_choice.query_postal_code)
      assert is_nil(insurance_choice.insurance_broker_id)
      assert is_nil(insurance_choice.insurance_policy_id)
    end

    test "create_insurance_choice/1 with valid data and opt_in_or_out as hero_insurance
    creates a insurance_choice with all fields non nil", %{motorcycle: motorcycle, lead: lead, broker: broker} do
      attrs = hero_insurance_choice_attrs(motorcycle, lead, broker)
      assert {:ok, %InsuranceChoice{} = insurance_choice} = Insurance.create_insurance_choice(attrs)
      assert insurance_choice.lead_id == lead.id
      assert insurance_choice.motorcycle_id == motorcycle.id
      assert insurance_choice.opt_in_or_out == @hero_insurance
      assert insurance_choice.quote_price == attrs.quote_price
      assert insurance_choice.quote_broker_name == broker.name
      assert insurance_choice.quote_broker_logo_url == broker.logo_url
      assert insurance_choice.quote_policy == attrs.quote_policy
      assert insurance_choice.quote_more_info == attrs.quote_more_info
      assert insurance_choice.query_province == @query_province
      assert insurance_choice.query_age == @query_age
      assert insurance_choice.query_postal_code == @query_postal_code
      assert insurance_choice.insurance_broker_id == broker.id
      assert insurance_choice.insurance_policy_id == attrs.insurance_policy_id
    end

    test "create_insurance_choice/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Insurance.create_insurance_choice()
    end

    test "get_insurance_choice!/1 returns the insurance_choice with given id", %{motorcycle: motorcycle, lead: lead} do
      personal_insurance_choices_attrs = personal_insurance_choice_attrs(motorcycle.id, lead.id)
      assert {:ok, %InsuranceChoice{} = personal_insurance_choice} = Insurance.create_insurance_choice(personal_insurance_choices_attrs)
      assert Insurance.get_insurance_choice_by_lead_id(lead.id) == personal_insurance_choice
    end

    test "when a lead choose a personal insurance quote and then chooses a hero insurance quote,
    the last one is the current insurance choice", %{motorcycle: motorcycle, lead: lead, broker: broker} do
      personal_insurance_choices_attrs = personal_insurance_choice_attrs(motorcycle.id, lead.id)
      assert {:ok, %InsuranceChoice{} = personal_insurance_choice} = Insurance.create_insurance_choice(personal_insurance_choices_attrs)

      hero_insurance_choices_attrs = hero_insurance_choice_attrs(motorcycle, lead, broker)
      assert {:ok, %InsuranceChoice{} = hero_insurance_choice} = Insurance.create_insurance_choice(hero_insurance_choices_attrs)

      assert Insurance.get_insurance_choice_by_lead_id(lead.id) == hero_insurance_choice
    end


    test "when a lead has not chosen any insurance, get by its id returns nil", %{lead: lead} do
      assert is_nil(Insurance.get_insurance_choice_by_lead_id(lead.id))
    end

    test "when a lead has chosen an insurance, get by its id returns the one", %{motorcycle: motorcycle, lead: lead, broker: broker} do
      hero_insurance_choices_attrs = hero_insurance_choice_attrs(motorcycle, lead, broker)
      assert {:ok, %InsuranceChoice{} = hero_insurance_choice} = Insurance.create_insurance_choice(hero_insurance_choices_attrs)

      assert Insurance.get_insurance_choice_by_lead_id(lead.id) == hero_insurance_choice
    end
  end
end
