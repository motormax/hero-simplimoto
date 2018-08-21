defmodule HeroDigital.Repo.Migrations.CreatePurchaseOrders do
  use Ecto.Migration

  def change do
    create table(:purchase_orders) do
      add :price, :integer
      add :lead_id, :uuid
      add :phone, :string
      add :email, :string
      add :motorcycle_id, references(:motorcycles, on_delete: :nothing)

      timestamps()
    end

    create index(:purchase_orders, [:motorcycle_id])
  end
end
