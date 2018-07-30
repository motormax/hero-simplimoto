defmodule HeroDigital.Repo.Migrations.AddMotoToLead do
  use Ecto.Migration

  def change do
    alter table(:leads) do
      add :motorcycle_id, references(:motorcycles), null: false
    end
  end
end
