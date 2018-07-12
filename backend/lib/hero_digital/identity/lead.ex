defmodule HeroDigital.Identity.Lead do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}

  schema "leads" do
    field :last_login, :utc_datetime

    timestamps()
  end

  @doc false
  def changeset(lead, attrs) do
    lead
    |> cast(attrs, [])
    |> validate_required([])
    |> put_change(:last_login, DateTime.utc_now)
  end
end
