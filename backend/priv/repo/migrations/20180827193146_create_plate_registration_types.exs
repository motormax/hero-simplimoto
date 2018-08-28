defmodule HeroDigital.Repo.Migrations.CreatePlateRegistrationTypes do
  use Ecto.Migration

  def change do
    create table(:plate_registration_types) do
      add :name, :string
      add :price, :decimal

      timestamps()
    end

  end
end
