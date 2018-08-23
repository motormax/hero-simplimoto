defmodule HeroDigital.Financing.FinancingData do
  use Ecto.Schema
  import Ecto.Changeset


  schema "financing_data" do
    field :costs, :string
    field :installments, :integer
    field :issuer_id, :string
    field :issuer_logo, :string
    field :issuer_name, :string
    field :message, :string
    field :monthly_amount, :float
    field :payment_method_id, :string
    field :payment_method_logo, :string
    field :payment_method_name, :string
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(financing_data, attrs, lead_id) do
    financing_data
    |> cast(attrs, [:payment_method_id, :issuer_id, :installments, :payment_method_name, :payment_method_logo, :issuer_logo, :issuer_name, :message, :costs, :monthly_amount])
    |> put_change(:lead_id, lead_id)
    |> validate_required([:lead_id, :payment_method_id, :issuer_id, :installments, :payment_method_name, :payment_method_logo, :issuer_logo, :issuer_name, :message, :costs, :monthly_amount])
  end
end
