defmodule HeroDigital.Repo.Migrations.CreateAccessories do
  use Ecto.Migration

  def change do
    create table(:accessories) do
      add :name, :string
      add :price, :decimal
      add :description, :text
      add :logo_url, :string

      timestamps()
    end

  end
end
