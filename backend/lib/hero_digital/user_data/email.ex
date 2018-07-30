defmodule HeroDigital.UserData.Email do
  use Ecto.Schema
  import Ecto.Changeset

  schema "emails" do
    field :email, :string

    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID
    timestamps()
  end

  @doc false
  def changeset(email, attrs) do
    email
    |> cast(attrs, [:email, :lead_id])
    |> validate_required([:email, :lead_id])
  end
end
