defmodule HeroDigital.Repo.Migrations.CreateDeliveryData do
  use Ecto.Migration

  def change do
    create table(:delivery_data) do
      add :address, :string
      add :town, :string
      add :postal_code, :string
      add :telephone_number, :string

      timestamps()
    end

  end
end
