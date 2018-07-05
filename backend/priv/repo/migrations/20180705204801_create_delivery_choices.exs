defmodule HeroDigital.Repo.Migrations.CreateDeliveryChoices do
  use Ecto.Migration

  def change do
    create table(:delivery_choices) do
      add :pickup_location, :integer
      add :address_id, references(:addresses, on_delete: :nothing)

      timestamps()
    end

    create index(:delivery_choices, [:address_id])
  end
end
