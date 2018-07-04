defmodule HeroDigital.Repo.Migrations.CreateMotorcycles do
  use Ecto.Migration

  def change do
    create table(:motorcycles) do
      add :name, :string
      add :price, :integer

      timestamps()
    end

  end
end
