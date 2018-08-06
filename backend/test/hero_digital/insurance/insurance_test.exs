defmodule HeroDigital.InsuranceTest do
  use HeroDigital.DataCase

  alias HeroDigital.Insurance

  describe "insuarnce_quotes_chosen" do
    alias HeroDigital.Insurance.InsuranceQuoteChosen

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def insurance_quote_chosen_fixture(attrs \\ %{}) do
      {:ok, insurance_quote_chosen} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Insurance.create_insurance_quote_chosen()

      insurance_quote_chosen
    end

    test "list_insuarnce_quotes_chosen/0 returns all insuarnce_quotes_chosen" do
      insurance_quote_chosen = insurance_quote_chosen_fixture()
      assert Insurance.list_insuarnce_quotes_chosen() == [insurance_quote_chosen]
    end

    test "get_insurance_quote_chosen!/1 returns the insurance_quote_chosen with given id" do
      insurance_quote_chosen = insurance_quote_chosen_fixture()
      assert Insurance.get_insurance_quote_chosen!(insurance_quote_chosen.id) == insurance_quote_chosen
    end

    test "create_insurance_quote_chosen/1 with valid data creates a insurance_quote_chosen" do
      assert {:ok, %InsuranceQuoteChosen{} = insurance_quote_chosen} = Insurance.create_insurance_quote_chosen(@valid_attrs)
    end

    test "create_insurance_quote_chosen/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Insurance.create_insurance_quote_chosen(@invalid_attrs)
    end

    test "update_insurance_quote_chosen/2 with valid data updates the insurance_quote_chosen" do
      insurance_quote_chosen = insurance_quote_chosen_fixture()
      assert {:ok, insurance_quote_chosen} = Insurance.update_insurance_quote_chosen(insurance_quote_chosen, @update_attrs)
      assert %InsuranceQuoteChosen{} = insurance_quote_chosen
    end

    test "update_insurance_quote_chosen/2 with invalid data returns error changeset" do
      insurance_quote_chosen = insurance_quote_chosen_fixture()
      assert {:error, %Ecto.Changeset{}} = Insurance.update_insurance_quote_chosen(insurance_quote_chosen, @invalid_attrs)
      assert insurance_quote_chosen == Insurance.get_insurance_quote_chosen!(insurance_quote_chosen.id)
    end

    test "delete_insurance_quote_chosen/1 deletes the insurance_quote_chosen" do
      insurance_quote_chosen = insurance_quote_chosen_fixture()
      assert {:ok, %InsuranceQuoteChosen{}} = Insurance.delete_insurance_quote_chosen(insurance_quote_chosen)
      assert_raise Ecto.NoResultsError, fn -> Insurance.get_insurance_quote_chosen!(insurance_quote_chosen.id) end
    end

    test "change_insurance_quote_chosen/1 returns a insurance_quote_chosen changeset" do
      insurance_quote_chosen = insurance_quote_chosen_fixture()
      assert %Ecto.Changeset{} = Insurance.change_insurance_quote_chosen(insurance_quote_chosen)
    end
  end
end
