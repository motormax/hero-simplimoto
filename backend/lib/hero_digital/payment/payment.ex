defmodule HeroDigital.Payment.Payment do
  use Ecto.Schema
  import Ecto.Changeset


  schema "payments" do
    field :raw_body, :string
    field :status, :string
    field :status_detail, :string
    field :transaction_id, :integer
    field :purchase_order_id, :id

    timestamps()
  end

  @doc false
  def changeset(payment, attrs) do
    payment
    |> cast(attrs, [:purchase_order_id, :status, :status_detail, :transaction_id, :raw_body])
    |> validate_required([:purchase_order_id, :status, :status_detail, :transaction_id, :raw_body])
  end
end
