defmodule HeroDigital.Repo.Migrations.CreatePhones do
  use Ecto.Migration

  def change do
    create table(:phones) do
      add :phone, :string
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)

      timestamps()
    end

  end
end
