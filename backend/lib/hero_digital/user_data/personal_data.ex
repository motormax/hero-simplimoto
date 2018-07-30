defmodule HeroDigital.UserData.PersonalData do
  use Ecto.Schema
  import Ecto.Changeset

  schema "personal_data" do
    field :dni, :string
    field :last_name, :string
    field :name, :string
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(personal_data, attrs) do
    personal_data
    |> cast(attrs, [:name, :last_name, :dni, :lead_id])
    |> validate_required([:name, :last_name, :dni, :lead_id])
  end
end
