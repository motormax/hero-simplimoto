defmodule HeroDigital.Repo.Migrations.CreatePurchaseOrders do
  use Ecto.Migration

  def change do
    create table(:purchase_orders) do
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)
      add :email, :string
      add :payment_method, :string
      add :payment_method_token, :string

      timestamps()
    end

    create index(:purchase_orders, [:lead_id])
  end
end
