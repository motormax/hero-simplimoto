defmodule HeroDigital.Repo.Migrations.AddIsActiveToLead do
  use Ecto.Migration

  def change do
    alter table(:leads) do
      add :is_active, :bool, default: true, null: false
    end
  end
end
