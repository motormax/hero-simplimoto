defmodule HeroDigital.Repo.Migrations.AddNameAndPhoneToPurchaseOrder do
  use Ecto.Migration

  def change do
    alter table(:purchase_orders) do
      add :full_name, :string
      add :phone, :string
    end
  end
end
