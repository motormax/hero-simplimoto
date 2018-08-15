defmodule HeroDigitalWeb.InsuranceQuoteChosenControllerTest do
  use HeroDigitalWeb.ConnCase

  alias HeroDigital.Insurance
  alias HeroDigital.Product.Motorcycle
  alias HeroDigital.Identity
  alias Decimal

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

  def fixture(:insurance_quote_chosen) do
    {:ok, insurance_quote_chosen} = Insurance.create_insurance_quote_chosen()
    insurance_quote_chosen
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

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create or update insurance_quote_chosen" do
    test "renders personal insurance_quote_chosen when data is valid", %{motorcycle: motorcycle, lead: lead, conn: conn} do
      attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      conn = post conn, lead_insurance_quote_chosen_path(conn, :create_or_update, lead.id), insurance_quote_chosen: attrs
      response = json_response(conn, 201)["data"]

      assert !is_nil(response["id"])
      assert response["motorcycle_id"] == motorcycle.id
      assert response["lead_id"] == lead.id
      assert response["opt_in_or_out"] == attrs.opt_in_or_out
      assert is_nil(response["insurance_policy_id"])
      assert is_nil(response["insurance_broker_id"])
      assert is_nil(response["query_postal_code"])
      assert is_nil(response["query_province"])
      assert is_nil(response["quote_price"])
      assert is_nil(response["quote_broker_name"])
      assert is_nil(response["quote_policy"])
      assert is_nil(response["query_age"])
      assert is_nil(response["quote_more_info"])
    end

    test "renders hero insurance_quote_chosen when data is valid", %{motorcycle: motorcycle, lead: lead, broker: broker, conn: conn} do
      attrs = hero_insurance_quote_chosen_attrs(motorcycle, lead, broker)
      conn = post conn, lead_insurance_quote_chosen_path(conn, :create_or_update, lead.id), insurance_quote_chosen: attrs
      response = json_response(conn, 201)["data"]

      assert !is_nil(response["id"])
      assert response["motorcycle_id"] == attrs.motorcycle_id
      assert response["lead_id"] == attrs.lead_id
      assert response["opt_in_or_out"] == attrs.opt_in_or_out
      assert response["insurance_policy_id"] == attrs.insurance_policy_id
      assert response["insurance_broker_id"] == attrs.insurance_broker_id
      assert response["query_postal_code"] == attrs.query_postal_code
      assert response["query_province"] == attrs.query_province
      assert Decimal.new(response["quote_price"]) == attrs.quote_price
      assert response["quote_broker_name"] == attrs.quote_broker_name
      assert response["quote_policy"] == attrs.quote_policy
      assert response["query_age"] == attrs.query_age
      assert response["quote_more_info"] == attrs.quote_more_info
    end

    test "renders errors when data is invalid", %{lead: lead, conn: conn} do
      conn = post conn, lead_insurance_quote_chosen_path(conn, :create_or_update, lead.id), insurance_quote_chosen: %{}
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "renders the updated personal_insurance_quote_chosen when a new one is chosen and the data is valid", %{motorcycle: motorcycle, lead: lead, broker: broker, conn: conn} do
      personal_insurance_quote_chosen_attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      conn = post conn, lead_insurance_quote_chosen_path(conn, :create_or_update, lead.id), insurance_quote_chosen: personal_insurance_quote_chosen_attrs
      personal_insurance_quote_chosen_response = json_response(conn, 201)["data"]

      hero_insurance_quote_chosen_attrs = hero_insurance_quote_chosen_attrs(motorcycle, lead, broker)
      conn = post conn, lead_insurance_quote_chosen_path(conn, :create_or_update, lead.id), insurance_quote_chosen: hero_insurance_quote_chosen_attrs
      hero_insurance_quote_chosen_response = json_response(conn, 201)["data"]

      refute hero_insurance_quote_chosen_response["id"] == personal_insurance_quote_chosen_response["id"]
      refute hero_insurance_quote_chosen_response == personal_insurance_quote_chosen_response
      assert !is_nil(personal_insurance_quote_chosen_response["id"])
      assert hero_insurance_quote_chosen_response["motorcycle_id"] == hero_insurance_quote_chosen_attrs.motorcycle_id
      assert hero_insurance_quote_chosen_response["lead_id"] == hero_insurance_quote_chosen_attrs.lead_id
      assert hero_insurance_quote_chosen_response["opt_in_or_out"] == hero_insurance_quote_chosen_attrs.opt_in_or_out
      assert hero_insurance_quote_chosen_response["insurance_policy_id"] == hero_insurance_quote_chosen_attrs.insurance_policy_id
      assert hero_insurance_quote_chosen_response["insurance_broker_id"] == hero_insurance_quote_chosen_attrs.insurance_broker_id
      assert hero_insurance_quote_chosen_response["query_postal_code"] == hero_insurance_quote_chosen_attrs.query_postal_code
      assert hero_insurance_quote_chosen_response["query_province"] == hero_insurance_quote_chosen_attrs.query_province
      assert Decimal.new(hero_insurance_quote_chosen_response["quote_price"]) == hero_insurance_quote_chosen_attrs.quote_price
      assert hero_insurance_quote_chosen_response["quote_broker_name"] == hero_insurance_quote_chosen_attrs.quote_broker_name
      assert hero_insurance_quote_chosen_response["quote_policy"] == hero_insurance_quote_chosen_attrs.quote_policy
      assert hero_insurance_quote_chosen_response["query_age"] == hero_insurance_quote_chosen_attrs.query_age
      assert hero_insurance_quote_chosen_response["quote_more_info"] == hero_insurance_quote_chosen_attrs.quote_more_info
    end

    test "renders the updated hero_insurance_quote_chosen when a new one is chosen and the data is valid", %{motorcycle: motorcycle, lead: lead, broker: broker, conn: conn} do
      hero_insurance_quote_chosen_attrs = hero_insurance_quote_chosen_attrs(motorcycle, lead, broker)
      conn = post conn, lead_insurance_quote_chosen_path(conn, :create_or_update, lead.id), insurance_quote_chosen: hero_insurance_quote_chosen_attrs
      hero_insurance_quote_chosen_response = json_response(conn, 201)["data"]

      personal_insurance_quote_chosen_attrs = personal_insurance_quote_chosen_attrs(motorcycle.id, lead.id)
      conn = post conn, lead_insurance_quote_chosen_path(conn, :create_or_update, lead.id), insurance_quote_chosen: personal_insurance_quote_chosen_attrs
      personal_insurance_quote_chosen_response = json_response(conn, 201)["data"]

      refute personal_insurance_quote_chosen_response["id"] == hero_insurance_quote_chosen_response["id"]
      refute personal_insurance_quote_chosen_response == hero_insurance_quote_chosen_response
      assert !is_nil(hero_insurance_quote_chosen_response["id"])
      assert personal_insurance_quote_chosen_response["motorcycle_id"] == motorcycle.id
      assert personal_insurance_quote_chosen_response["lead_id"] == lead.id
      assert personal_insurance_quote_chosen_response["opt_in_or_out"] == personal_insurance_quote_chosen_attrs.opt_in_or_out
      assert is_nil(personal_insurance_quote_chosen_response["insurance_policy_id"])
      assert is_nil(personal_insurance_quote_chosen_response["insurance_broker_id"])
      assert is_nil(personal_insurance_quote_chosen_response["query_postal_code"])
      assert is_nil(personal_insurance_quote_chosen_response["query_province"])
      assert is_nil(personal_insurance_quote_chosen_response["quote_price"])
      assert is_nil(personal_insurance_quote_chosen_response["quote_broker_name"])
      assert is_nil(personal_insurance_quote_chosen_response["quote_policy"])
      assert is_nil(personal_insurance_quote_chosen_response["query_age"])
      assert is_nil(personal_insurance_quote_chosen_response["quote_more_info"])
    end
  end
end
