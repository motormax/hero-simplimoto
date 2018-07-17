defmodule HeroDigital.Identity.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}

  schema "users" do
    field :last_login, :utc_datetime
    belongs_to(:motorcycle, HeroDigital.Product.Motorcycle)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:motorcycle_id])
    |> assoc_constraint(:motorcycle)
    |> validate_required([:motorcycle_id])
    |> put_change(:last_login, DateTime.utc_now)
  end
end
