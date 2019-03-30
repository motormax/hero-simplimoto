defmodule HeroDigital.Repo.Migrations.AddCashAmountToFinancingData do
  use Ecto.Migration

  def change do
    alter table(:financing_data) do
      add :cash_amount, :decimal, default: 0, null: false
    end
  end
end
