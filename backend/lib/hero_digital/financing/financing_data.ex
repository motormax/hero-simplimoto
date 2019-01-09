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
    field :provider, :string
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(financing_data, attrs, lead_id) do
    financing_data
    |> cast(attrs, [
      :provider,
      :payment_method_id,
      :issuer_id,
      :installments,
      :payment_method_name,
      :payment_method_logo,
      :issuer_logo,
      :issuer_name,
      :message,
      :costs,
      :monthly_amount
    ])
    |> put_change(:lead_id, lead_id)
    |> validate_provider_data
  end

  def validate_provider_data(changeset) do
    common_fields = [:provider, :lead_id, :installments, :monthly_amount]
    required_fields = case get_field(changeset, :provider) do
      "MERCADOPAGO" -> common_fields ++ [:payment_method_id, :payment_method_name, :payment_method_logo, :message, :costs]
      _ -> common_fields
    end

    validate_required(changeset, required_fields)
  end
end
