defmodule HeroDigital.Repo.Migrations.CreateLeadsAccessories do
  use Ecto.Migration

  def change do
    create table(:leads_accessories) do
      add :lead_id, references(:leads, type: :uuid)
      add :accessory_id, references(:accessories)
    end

    create unique_index(:leads_accessories, [:lead_id, :accessory_id])
  end
end
