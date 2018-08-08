defmodule HeroDigital.Insurance.InsuranceQuoteChosen do
  use Ecto.Schema
  import Ecto.Changeset

  @personal_insurance "personalInsurance"
  @hero_insurance "heroInsurance"

  schema "insuarnce_quotes_chosen" do
    field :opt_in_or_out, :string
    field :quote_price, :decimal
    field :quote_broker_name, :string
    field :quote_policy, :string
    field :quote_more_info, :string
    field :query_province, :string
    field :query_age, :integer
    field :query_postal_code, :string
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID
    belongs_to :motorcycle, HeroDigital.Product.Motorcycle
    belongs_to :insurance_broker, HeroDigital.Insurance.Broker
    belongs_to :insurance_policy, HeroDigital.Insurance.Policy

    timestamps()
  end

  @doc false
  def changeset(insurance_quote_chosen, attrs) do
    changeset = cast(insurance_quote_chosen, attrs, ["opt_in_or_out"])
    cond do
      Map.has_key?(changeset.changes, :opt_in_or_out) and changeset.changes.opt_in_or_out == @personal_insurance ->
        create_personal_insurance_quote_changeset(insurance_quote_chosen, attrs)
      true ->
        create_hero_insurance_quote_changeset(insurance_quote_chosen, attrs)
    end
  end

  @doc false
  defp create_personal_insurance_quote_changeset(insurance_quote_chosen, attrs) do
    attr_names = [
      :opt_in_or_out,
      :lead_id,
      :motorcycle_id,
    ]
    create(insurance_quote_chosen, attrs, attr_names)
  end

  @doc false
  defp create_hero_insurance_quote_changeset(insurance_quote_chosen, attrs) do
    attr_names = [
      :opt_in_or_out,
      :quote_price,
      :quote_broker_name,
      :quote_policy,
      :quote_more_info,
      :query_province,
      :query_age,
      :query_postal_code,
      :lead_id,
      :motorcycle_id,
      :insurance_broker_id,
      :insurance_policy_id
    ]
    create(insurance_quote_chosen, attrs, attr_names)
  end

  defp create(insurance_quote_chosen, attrs, attr_names) do
    insurance_quote_chosen
    |> cast(attrs, attr_names)
    |> validate_required(attr_names)
  end
end
