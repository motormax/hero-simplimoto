defmodule HeroDigital.Insurance.InsuranceQuoteChosen do
  use Ecto.Schema
  import Ecto.Changeset


  schema "insuarnce_quotes_chosen" do

    timestamps()
  end

  @doc false
  def changeset(insurance_quote_chosen, attrs) do
    insurance_quote_chosen
    |> cast(attrs, [])
    |> validate_required([])
  end
end
