defmodule HeroDigital.FinancingTest do
  use HeroDigital.DataCase

  alias HeroDigital.Financing
  alias HeroDigital.Identity
  alias HeroDigital.Product.Motorcycle

  describe "financing_data" do
    alias HeroDigital.Financing.FinancingData

    setup do
      motorcycle = HeroDigital.Repo.insert!(%Motorcycle{name: "Dash", price: 200})
      %{motorcycle: motorcycle}
    end

    setup %{motorcycle: motorcycle} do
      {:ok, lead} = Identity.create_lead(%{motorcycle_id: motorcycle.id})
      %{lead: lead}
    end

    @valid_attrs %{provider: "MERCADOPAGO", costs: "some costs", installments: 42, issuer_id: "some issuer_id", issuer_logo: "some issuer_logo", issuer_name: "some issuer_name", message: "some message", monthly_amount: 120.5, payment_method_id: "some payment_method_id", payment_method_logo: "some payment_method_logo", payment_method_name: "some payment_method_name"}
    @incomplete_attrs %{provider: "MERCADOPAGO", costs: "some costs", installments: 42, issuer_id: "some issuer_id", issuer_logo: "some issuer_logo", issuer_name: "some issuer_name", message: "some message", monthly_amount: 120.5, payment_method_id: "some payment_method_id", payment_method_logo: "some payment_method_logo"}
    @valid_credicuotas_attrs %{provider: "CREDICUOTAS", costs: "", installments: 42, message: "some message", monthly_amount: 120.5}
    @update_attrs %{costs: "some updated costs", installments: 43, issuer_id: "some updated issuer_id", issuer_logo: "some updated issuer_logo", issuer_name: "some updated issuer_name", message: "some updated message", monthly_amount: 456.7, payment_method_id: "some updated payment_method_id", payment_method_logo: "some updated payment_method_logo", payment_method_name: "some updated payment_method_name"}
    @invalid_attrs %{provider: "MERCADOPAGO", costs: nil, installments: nil, issuer_id: nil, issuer_logo: nil, issuer_name: nil, message: nil, monthly_amount: nil, payment_method_id: nil, payment_method_logo: nil, payment_method_name: nil}

    def financing_data_fixture(lead, attrs \\ %{}) do
      {:ok, financing_data} =
        attrs
        |> Enum.into(@valid_attrs)
        |> (fn (attrs) -> Financing.set_financing_data(lead.id, attrs) end).()

      financing_data
    end

    test "get_financing_data!/1 returns the financing_data with given a lead_id", %{lead: lead} do
      financing_data = financing_data_fixture(lead)
      assert Financing.get_financing_data_by_lead_id(lead.id) == financing_data
    end

    test "create_financing_data/1 with valid data creates a financing_data", %{lead: lead} do
      assert {:ok, %FinancingData{} = financing_data} = Financing.set_financing_data(lead.id, @valid_attrs)
      assert financing_data.provider == "MERCADOPAGO"
      assert financing_data.costs == "some costs"
      assert financing_data.installments == 42
      assert financing_data.issuer_id == "some issuer_id"
      assert financing_data.issuer_logo == "some issuer_logo"
      assert financing_data.issuer_name == "some issuer_name"
      assert financing_data.lead_id == lead.id
      assert financing_data.message == "some message"
      assert financing_data.monthly_amount == 120.5
      assert financing_data.payment_method_id == "some payment_method_id"
      assert financing_data.payment_method_logo == "some payment_method_logo"
      assert financing_data.payment_method_name == "some payment_method_name"
    end

    test "create_financing_data/1 with invalid data returns error changeset", %{lead: lead} do
      assert {:error, %Ecto.Changeset{}} = Financing.set_financing_data(lead.id, @invalid_attrs)
    end

    test "update_financing_data/2 with valid data updates the financing_data", %{lead: lead} do
      financing_data = financing_data_fixture(lead)
      assert {:ok, financing_data} = Financing.set_financing_data(lead.id, @update_attrs)
      assert %FinancingData{} = financing_data
#      assert financing_data.provider == "MERCADOPAGO"
      assert financing_data.costs == "some updated costs"
      assert financing_data.installments == 43
      assert financing_data.issuer_id == "some updated issuer_id"
      assert financing_data.issuer_logo == "some updated issuer_logo"
      assert financing_data.issuer_name == "some updated issuer_name"
      assert financing_data.lead_id == lead.id
      assert financing_data.message == "some updated message"
      assert financing_data.monthly_amount == 456.7
      assert financing_data.payment_method_id == "some updated payment_method_id"
      assert financing_data.payment_method_logo == "some updated payment_method_logo"
      assert financing_data.payment_method_name == "some updated payment_method_name"
    end

    test "update_financing_data/2 with invalid data returns error changeset", %{lead: lead} do
      financing_data = financing_data_fixture(lead)
      assert {:error, %Ecto.Changeset{}} = Financing.set_financing_data(lead.id, @invalid_attrs)
      assert financing_data == Financing.get_financing_data_by_lead_id(lead.id)
    end

    test "payment and issuer data is required when the provider is mercadopago", %{lead: lead} do
      assert {:error, %Ecto.Changeset{}} = Financing.set_financing_data(lead.id, @incomplete_attrs)
    end

    test "payment and issuer data is not required when the provider is not mercadopago", %{lead: lead} do
      assert {:ok, %FinancingData{} = financing_data} = Financing.set_financing_data(lead.id, @valid_credicuotas_attrs)
      assert financing_data.provider == "CREDICUOTAS"
      assert financing_data.installments == 42
      assert financing_data.lead_id == lead.id
      assert financing_data.message == "some message"
      assert financing_data.monthly_amount == 120.5
    end
  end
end
