defmodule HeroDigital.Repo.Migrations.AddProviderToFinancingData do
  use Ecto.Migration

  def change do
    alter table(:financing_data) do
      add :provider, :string, default: "MERCADOPAGO", null: false
    end
  end
end
