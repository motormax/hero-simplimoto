defmodule HeroDigital.Repo.Migrations.AddTradeInFields do
  use Ecto.Migration

  def change do
    alter table(:trade_ins) do
      add :location, :string
      add :license_plate, :string
    end
  end
end
