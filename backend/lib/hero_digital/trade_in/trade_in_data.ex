defmodule HeroDigital.TradeIn.TradeInData do
  use Ecto.Schema
  import Ecto.Changeset


  schema "trade_ins" do
    field :brand, :string
    field :description, :string
    field :email, :string
    field :model, :string
    field :name, :string
    field :telephone, :string
    field :year, :string
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(trade_in_data, attrs) do
    trade_in_data
    |> cast(attrs, [:name, :email, :telephone, :brand, :model, :year, :description, :lead_id])
    |> validate_required([:name, :email, :telephone, :brand, :model, :year, :description, :lead_id])
  end
end
