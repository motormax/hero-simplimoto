defmodule HeroDigital.UserData.Phone do
  use Ecto.Schema
  import Ecto.Changeset


  schema "phones" do
    field :phone, :string

    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID
    timestamps()
  end

  @doc false
  def changeset(phone, attrs) do
    phone
    |> cast(attrs, [:phone, :lead_id])
    |> validate_required([:phone, :lead_id])
  end
end
