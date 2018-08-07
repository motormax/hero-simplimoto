defmodule HeroDigital.Insurance.InsuranceQuoteChosen do
  use Ecto.Schema
  import Ecto.Changeset


  schema "insuarnce_quotes_chosen" do
    field :opt_in_or_out, :string
    field :quote_price, :float
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
    insurance_quote_chosen
    |> cast(attrs, attr_names)
    |> validate_required(attr_names)
  end
end
