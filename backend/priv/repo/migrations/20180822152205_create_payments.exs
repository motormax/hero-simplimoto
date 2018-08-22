defmodule HeroDigital.Repo.Migrations.CreatePayments do
  use Ecto.Migration

  def change do
    create table(:payments) do
      add :status, :string
      add :status_detail, :string
      add :transaction_id, :integer
      add :raw_body, :text
      add :purchase_order_id, references(:purchase_orders, on_delete: :nothing)

      timestamps()
    end

    create index(:payments, [:purchase_order_id])
  end
end
