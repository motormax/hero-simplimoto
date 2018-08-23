defmodule HeroDigital.Fulfillment.PurchaseOrder do
  use Ecto.Schema
  import Ecto.Changeset


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
    "Motocicleta Hero " <> purchase_order.lead.motorcycle.name
  end

  def installments(purchase_order) do
    #TODO: Grab installment from purchase_order.lead.financing.installments
    1
  end

  def payment_method_id(purchase_order) do
    #TODO: Grab installment from purchase_order.lead.financing.payment_method_id
    "visa"
  end

  def issuer_id(purchase_order) do
    #TODO: Grab installment from purchase_order.lead.financing.issuer_id
    ""
  end

  def total_amount(purchase_order) do
    purchase_order.lead.motorcycle.price
    # TODO: Patentamiento +
    # TODO: purchase_order.lead.accesories
  end
end
