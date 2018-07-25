defmodule HeroDigital.Repo.Migrations.CreateAddresses do
  use Ecto.Migration

  def change do
    create table(:addresses) do
      add :street, :string
      add :number, :string
      add :complements, :string
      add :town, :string
      add :postal_code, :string
      add :telephone_number, :string
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)

      timestamps()
    end

    create index(:addresses, [:lead_id])
  end
end
