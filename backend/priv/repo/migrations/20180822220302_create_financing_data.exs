defmodule HeroDigital.Repo.Migrations.CreateFinancingData do
  use Ecto.Migration

  def change do
    create table(:financing_data) do
      add :payment_method_id, :string
      add :issuer_id, :string
      add :installments, :integer
      add :payment_method_name, :string
      add :payment_method_logo, :string
      add :issuer_logo, :string
      add :issuer_name, :string
      add :message, :string
      add :costs, :string
      add :monthly_amount, :float
      add :lead_id, references(:leads, type: :uuid, on_delete: :nothing)

      timestamps()
    end

    create index(:financing_data, [:lead_id])
  end
end
