defmodule HeroDigital.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :last_login, :utc_datetime, null: false

      timestamps()
    end

  end
end
