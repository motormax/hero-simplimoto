defmodule HeroDigital.Repo.Migrations.AddMotoToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :motorcycle_id, references(:motorcycles), null: false
    end
  end
end
