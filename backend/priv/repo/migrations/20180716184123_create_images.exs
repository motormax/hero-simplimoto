defmodule HeroDigital.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images) do
      add :data, :binary, null: false
      add :name, :string, null: false
      add :type, :string, null: false
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)

      timestamps()
    end

    create index(:images, [:lead_id])
  end
end
