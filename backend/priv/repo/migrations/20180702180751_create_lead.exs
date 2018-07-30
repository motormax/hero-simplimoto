defmodule HeroDigital.Repo.Migrations.CreateLead do
  use Ecto.Migration

  def change do
    create table(:leads, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :last_login, :utc_datetime, null: false

      timestamps()
    end

  end
end
