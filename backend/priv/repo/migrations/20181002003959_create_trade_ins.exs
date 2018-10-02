defmodule HeroDigital.Repo.Migrations.CreateTradeIns do
  use Ecto.Migration

  def change do
    create table(:trade_ins) do
      add :name, :string
      add :email, :string
      add :telephone, :string
      add :brand, :string
      add :model, :string
      add :year, :string
      add :description, :string
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)

      timestamps()
    end

    create index(:trade_ins, [:lead_id])
  end
end
