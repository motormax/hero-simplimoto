defmodule HeroDigital.Repo.Migrations.CreateEmail do
  use Ecto.Migration

  def change do
    create table(:emails) do
      add :email, :string
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)

      timestamps()
    end

  end
end
