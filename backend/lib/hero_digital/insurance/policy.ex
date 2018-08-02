defmodule HeroDigital.Insurance.Policy do
  use Ecto.Schema
  import Ecto.Changeset


  schema "insurance_policies" do
    field :details, :string
    field :external_id, :string
    field :max_age, :integer
    field :min_age, :integer
    field :name, :string
    field :postal_codes, :string
    field :price, :decimal
    belongs_to :motorcycle, HeroDigital.Product.Motorcycle
    belongs_to :insurance_broker, HeroDigital.Insurance.Broker

    field :_destroy, :boolean, virtual: true

    timestamps()
  end

  @doc false
  def changeset(policy, attrs) do
    policy
    |> cast(attrs, [:name, :details, :price, :postal_codes, :min_age, :max_age, :external_id, :motorcycle_id, :insurance_broker_id])
    |> validate_required([:name, :details, :price, :postal_codes, :min_age, :max_age, :external_id, :motorcycle_id, :insurance_broker_id])
    |> mark_for_deletion
  end

  defp mark_for_deletion(changeset) do
    # If delete was set and it is true, let's change the action
    if get_change(changeset, :_destroy) do
      %{changeset | action: :delete}
    else
      changeset
    end
  end
end
