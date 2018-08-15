defmodule HeroDigitalWeb.InsuranceChoiceControllerTest do
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

  def fixture(:insurance_choice) do
    {:ok, insurance_choice} = Insurance.create_insurance_choice()
    insurance_choice
  end

  def assert_personal_insurance_response(response, attrs) do
    assert !is_nil(response["id"])
    assert response["motorcycle_id"] == attrs.motorcycle_id
    assert response["lead_id"] == attrs.lead_id
    assert response["opt_in_or_out"] == attrs.opt_in_or_out
    assert is_nil(response["insurance_policy_id"])
    assert is_nil(response["insurance_broker_id"])
    assert is_nil(response["query_postal_code"])
    assert is_nil(response["query_province"])
    assert is_nil(response["quote_price"])
    assert is_nil(response["quote_broker_name"])
    assert is_nil(response["quote_broker_logo_url"])
    assert is_nil(response["quote_policy"])
    assert is_nil(response["query_age"])
    assert is_nil(response["quote_more_info"])
  end

  def assert_hero_insurance_response(response, attrs) do
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
    assert response["quote_broker_logo_url"] == attrs.quote_broker_logo_url
    assert response["quote_policy"] == attrs.quote_policy
    assert response["query_age"] == attrs.query_age
    assert response["quote_more_info"] == attrs.quote_more_info
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

  describe "create insurance_choice" do
    test "renders personal insurance_choice when data is valid", %{motorcycle: motorcycle, lead: lead, conn: conn} do
      attrs = personal_insurance_choice_attrs(motorcycle.id, lead.id)
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: attrs
      response = json_response(conn, 201)["data"]

      assert_personal_insurance_response(response, attrs)
    end

    test "renders hero insurance_choice when data is valid", %{motorcycle: motorcycle, lead: lead, broker: broker, conn: conn} do
      attrs = hero_insurance_choice_attrs(motorcycle, lead, broker)
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: attrs
      response = json_response(conn, 201)["data"]

      assert_hero_insurance_response(response, attrs)
    end

    test "renders errors when data is invalid", %{lead: lead, conn: conn} do
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: %{}
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "renders the updated personal_insurance_choice when a new one is chosen and the data is valid", %{motorcycle: motorcycle, lead: lead, broker: broker, conn: conn} do
      personal_insurance_choice_attrs = personal_insurance_choice_attrs(motorcycle.id, lead.id)
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: personal_insurance_choice_attrs
      personal_insurance_choice_response = json_response(conn, 201)["data"]

      hero_insurance_choice_attrs = hero_insurance_choice_attrs(motorcycle, lead, broker)
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: hero_insurance_choice_attrs
      hero_insurance_choice_response = json_response(conn, 201)["data"]

      refute hero_insurance_choice_response == personal_insurance_choice_response
      assert_hero_insurance_response(hero_insurance_choice_response, hero_insurance_choice_attrs)
    end

    test "renders the updated hero_insurance_choice when a new one is chosen and the data is valid", %{motorcycle: motorcycle, lead: lead, broker: broker, conn: conn} do
      hero_insurance_choice_attrs = hero_insurance_choice_attrs(motorcycle, lead, broker)
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: hero_insurance_choice_attrs
      hero_insurance_choice_response = json_response(conn, 201)["data"]

      personal_insurance_choice_attrs = personal_insurance_choice_attrs(motorcycle.id, lead.id)
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: personal_insurance_choice_attrs
      personal_insurance_choice_response = json_response(conn, 201)["data"]

      refute personal_insurance_choice_response == hero_insurance_choice_response
      assert_personal_insurance_response(personal_insurance_choice_response, personal_insurance_choice_attrs)
    end
  end

  describe "show insurance choice" do
    test "when lead has not chosen an insurance, get it by its id returns null", %{lead: lead, conn: conn} do
      conn = get conn, lead_insurance_choice_path(conn, :show, lead.id)
      response = json_response(conn, 200)["data"]

      assert is_nil(response)
    end

    test "when lead has chosen an insurance, get it by its id returns it", %{motorcycle: motorcycle, lead: lead, broker: broker, conn: conn} do
      hero_insurance_choice_attrs = hero_insurance_choice_attrs(motorcycle, lead, broker)
      conn = post conn, lead_insurance_choice_path(conn, :create, lead.id), insurance_choice: hero_insurance_choice_attrs
      hero_insurance_choice_response = json_response(conn, 201)["data"]

      assert_hero_insurance_response(hero_insurance_choice_response, hero_insurance_choice_attrs)
    end
  end
end
