defmodule HeroDigital.Repo.Migrations.AddProviderToPurchaseOrder do
  use Ecto.Migration

  def change do
    alter table(:purchase_orders) do
      add :provider, :string, default: "MERCADOPAGO", null: false
    end
  end
end
