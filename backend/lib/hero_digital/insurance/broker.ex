defmodule HeroDigital.Insurance.Broker do
  use Ecto.Schema
  import Ecto.Changeset


  schema "insurance_brokers" do
    field :external_id, :string
    field :logo_url, :string
    field :name, :string

    has_many :policies, HeroDigital.Insurance.Policy, on_replace: :delete, foreign_key: :insurance_broker_id

    timestamps()
  end

  @doc false
  def changeset(broker, attrs) do
    broker
    |> cast(attrs, [:name, :logo_url, :external_id])
    |> validate_required([:name, :logo_url, :external_id])
    |> cast_assoc(:policies, required: false)
  end
end
