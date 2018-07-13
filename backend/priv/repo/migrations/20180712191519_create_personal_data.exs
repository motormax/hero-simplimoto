defmodule HeroDigital.Repo.Migrations.CreatePersonalData do
  use Ecto.Migration

  def change do
    create table(:personal_data) do
      add :name, :string
      add :last_name, :string
      add :dni, :string
      add :lead_id, :uuid, null: false

      timestamps()
    end

  end
end
