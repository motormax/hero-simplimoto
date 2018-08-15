defmodule HeroDigital.InsuranceTest do
  use HeroDigital.DataCase

  alias HeroDigital.Insurance
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity
  alias Decimal

  describe "insuarnce_quotes_chosen" do
    alias HeroDigital.Insurance.InsuranceQuoteChosen

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

    def personal_insurance_quote_chosen_attrs(motorcycle_id, lead_id) do
      %{lead_id: lead_id, motorcycle_id: motorcycle_id, opt_in_or_out: @personal_insurance}
    end

    def hero_insurance_quote_chosen_attrs(motorcycle, lead, broker) do
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

    test "create_insurance_quote_chosen/1 with valid data and opt_in_or_out as personal_insurance
    creates a insurance_quote_chosen with fields opt_in_or_out, lead_id and motorcycle_id as non nil", %{motorcycle: motorcycle, lead: lead} do
      attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      assert {:ok, %InsuranceQuoteChosen{} = insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(attrs)
      assert insurance_quote_chosen.lead_id == lead.id
      assert insurance_quote_chosen.motorcycle_id == motorcycle.id
      assert insurance_quote_chosen.opt_in_or_out == @personal_insurance
      assert is_nil(insurance_quote_chosen.quote_price)
      assert is_nil(insurance_quote_chosen.quote_broker_name)
      assert is_nil(insurance_quote_chosen.quote_policy)
      assert is_nil(insurance_quote_chosen.quote_more_info)
      assert is_nil(insurance_quote_chosen.query_province)
      assert is_nil(insurance_quote_chosen.query_age)
      assert is_nil(insurance_quote_chosen.query_postal_code)
      assert is_nil(insurance_quote_chosen.insurance_broker_id)
      assert is_nil(insurance_quote_chosen.insurance_policy_id)
    end

    test "create_insurance_quote_chosen/1 with valid data and opt_in_or_out as hero_insurance
    creates a insurance_quote_chosen with all fields non nil", %{motorcycle: motorcycle, lead: lead, broker: broker} do
      attrs = hero_insurance_quote_chosen_attrs(motorcycle, lead, broker)
      assert {:ok, %InsuranceQuoteChosen{} = insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(attrs)
      assert insurance_quote_chosen.lead_id == lead.id
      assert insurance_quote_chosen.motorcycle_id == motorcycle.id
      assert insurance_quote_chosen.opt_in_or_out == @hero_insurance
      assert insurance_quote_chosen.quote_price == attrs.quote_price
      assert insurance_quote_chosen.quote_broker_name == broker.name
      assert insurance_quote_chosen.quote_policy == attrs.quote_policy
      assert insurance_quote_chosen.quote_more_info == attrs.quote_more_info
      assert insurance_quote_chosen.query_province == @query_province
      assert insurance_quote_chosen.query_age == @query_age
      assert insurance_quote_chosen.query_postal_code == @query_postal_code
      assert insurance_quote_chosen.insurance_broker_id == broker.id
      assert insurance_quote_chosen.insurance_policy_id == attrs.insurance_policy_id
    end

    test "create_insurance_quote_chosen/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Insurance.create_insurance_quote_chosen()
    end

    test "list_insuarnce_quotes_chosen/0 returns all insuarnce_quotes_chosen", %{motorcycle: motorcycle, lead: lead, broker: broker} do
      {:ok, another_lead} = Identity.create_lead(%{:motorcycle_id => motorcycle.id})
      personal_insurance_quotes_chosen_attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      hero_insurance_quotes_chosen_attrs = hero_insurance_quote_chosen_attrs(motorcycle, another_lead, broker)
      assert {:ok, %InsuranceQuoteChosen{} = personal_insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(personal_insurance_quotes_chosen_attrs)
      assert {:ok, %InsuranceQuoteChosen{} = hero_insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(hero_insurance_quotes_chosen_attrs)
      assert Insurance.list_insuarnce_quotes_chosen() == [personal_insurance_quote_chosen, hero_insurance_quote_chosen]
    end

    test "get_insurance_quote_chosen!/1 returns the insurance_quote_chosen with given id", %{motorcycle: motorcycle, lead: lead} do
      personal_insurance_quotes_chosen_attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      assert {:ok, %InsuranceQuoteChosen{} = personal_insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(personal_insurance_quotes_chosen_attrs)
      assert Insurance.get_insurance_quote_chosen!(personal_insurance_quote_chosen.id) == personal_insurance_quote_chosen
    end

    test "when a lead choose a personal insurance quote and then chooses a hero insurance quote,
    the first one gets erased and the last one is in the db", %{motorcycle: motorcycle, lead: lead, broker: broker} do
      personal_insurance_quotes_chosen_attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      assert {:ok, %InsuranceQuoteChosen{} = personal_insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(personal_insurance_quotes_chosen_attrs)

      hero_insurance_quotes_chosen_attrs = hero_insurance_quote_chosen_attrs(motorcycle, lead, broker)
      assert {:ok, %InsuranceQuoteChosen{} = hero_insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(hero_insurance_quotes_chosen_attrs)

      refute hero_insurance_quote_chosen.id == personal_insurance_quote_chosen.id
      refute Insurance.get_insurance_quote_chosen!(hero_insurance_quote_chosen.id) == personal_insurance_quote_chosen
      assert_raise(Ecto.NoResultsError, fn -> Insurance.get_insurance_quote_chosen!(personal_insurance_quote_chosen.id) end)
      assert Insurance.get_insurance_quote_chosen!(hero_insurance_quote_chosen.id) == hero_insurance_quote_chosen
      assert Insurance.list_insuarnce_quotes_chosen() == [hero_insurance_quote_chosen]
    end

    test "when a lead choose a hero insurance quote and then chooses a personal insurance quote,
    the first one gets erased and the last one is in the db", %{motorcycle: motorcycle, lead: lead, broker: broker} do
      hero_insurance_quotes_chosen_attrs = hero_insurance_quote_chosen_attrs(motorcycle, lead, broker)
      assert {:ok, %InsuranceQuoteChosen{} = hero_insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(hero_insurance_quotes_chosen_attrs)

      personal_insurance_quotes_chosen_attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      assert {:ok, %InsuranceQuoteChosen{} = personal_insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(personal_insurance_quotes_chosen_attrs)

      refute hero_insurance_quote_chosen.id == personal_insurance_quote_chosen.id
      refute Insurance.get_insurance_quote_chosen!(personal_insurance_quote_chosen.id) == hero_insurance_quote_chosen
      assert_raise(Ecto.NoResultsError, fn -> Insurance.get_insurance_quote_chosen!(hero_insurance_quote_chosen.id) end)
      assert Insurance.get_insurance_quote_chosen!(personal_insurance_quote_chosen.id) == personal_insurance_quote_chosen
      assert Insurance.list_insuarnce_quotes_chosen() == [personal_insurance_quote_chosen]
    end
  end
end
