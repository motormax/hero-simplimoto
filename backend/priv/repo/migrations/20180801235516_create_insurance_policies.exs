defmodule HeroDigital.Repo.Migrations.CreateInsurancePolicies do
  use Ecto.Migration

  def change do
    create table(:insurance_policies) do
      add :name, :string
      add :details, :text
      add :price, :decimal
      add :postal_codes, :text
      add :min_age, :integer
      add :max_age, :integer
      add :external_id, :string
      add :motorcycle_id, references(:motorcycles, on_delete: :nothing)
      add :insurance_broker_id, references(:insurance_brokers, on_delete: :nothing)

      timestamps()
    end

    create index(:insurance_policies, [:motorcycle_id])
    create index(:insurance_policies, [:insurance_broker_id])
  end
end
