defmodule HeroDigital.Repo.Migrations.CreateAccessories do
  use Ecto.Migration

  def change do
    create table(:accessories) do
      add :name, :string
      add :price, :decimal
      add :description, :text
      add :logo_url, :string
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)

      timestamps()
    end

  end
end
