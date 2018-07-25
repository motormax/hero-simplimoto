defmodule HeroDigital.Repo.Migrations.CreateDeliveryChoices do
  use Ecto.Migration

  def change do
    create table(:delivery_choices) do
      add :pickup_location, :string
      add :address_id, references(:addresses, on_delete: :nothing)
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)
      timestamps()
    end

    create index(:delivery_choices, [:address_id])
    create index(:delivery_choices, [:lead_id])
  end
end
