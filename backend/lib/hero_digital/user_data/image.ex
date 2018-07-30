defmodule HeroDigital.UserData.Image do
  use Ecto.Schema
  import Ecto.Changeset


  schema "images" do
    field :data, :binary
    field :name, :string
    field :type, :string
    belongs_to :lead, HeroDigital.Identity.Lead, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(image, attrs) do
    image
    |> cast(attrs, [:data, :name, :type, :lead_id])
    |> validate_required([:data, :name, :type, :lead_id])
  end
end
