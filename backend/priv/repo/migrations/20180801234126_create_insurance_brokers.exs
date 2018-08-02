defmodule HeroDigital.Repo.Migrations.CreateInsuranceBrokers do
  use Ecto.Migration

  def change do
    create table(:insurance_brokers) do
      add :name, :string
      add :logo_url, :string
      add :external_id, :string

      timestamps()
    end

  end
end
