defmodule HeroDigital.Fulfillment.PurchaseOrder do
  use Ecto.Schema
  import Ecto.Changeset

  alias HeroDigital.Repo
  alias HeroDigital.Product

  schema "purchase_orders" do
    field :email, :string
    field :payment_method, :string
    field :payment_method_token, :string
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID
    has_one :payment, HeroDigital.Payment.Payment

    timestamps()
  end

  @doc false
  def changeset(purchase_order, lead, attrs) do
    purchase_order
    |> cast(attrs, [:payment_method, :payment_method_token, :email])
    |> validate_required([:payment_method, :email])
    |> put_change(:lead_id, lead.id)
  end

  def description(purchase_order) do
    "Motocicleta Hero " <> lead(purchase_order).motorcycle.name
  end

  def installments(purchase_order) do
    lead(purchase_order).financing_data.installments
  end

  def payment_method_id(purchase_order) do
    lead(purchase_order).financing_data.payment_method_id
  end

  def issuer_id(purchase_order) do
    lead(purchase_order).financing_data.issuer_id
  end

  def total_amount(purchase_order) do
    Decimal.new(lead(purchase_order).motorcycle.price)
    |> Decimal.add(plate_registration_price(purchase_order.lead_id))
    |> Decimal.add(accessories_price(purchase_order.lead_id))
  end

  defp lead(purchase_order) do
    purchase_order.lead |> Repo.preload(:financing_data)
  end

  defp plate_registration_price(lead_id) do
    case HeroDigital.PlateRegistration.get_plate_registration_data_for_lead(lead_id) do
      nil -> raise "Has not chosen a plate registration"
      plate_registration_type -> plate_registration_type.plate_registration_type.price
    end
  end

  defp accessories_price(lead_id) do
    Product.lead_accessories(lead_id)
    |> Enum.reduce(Decimal.new("0"), fn accessory, accumulator -> Decimal.add(accessory.price, accumulator) end)
  end
end
