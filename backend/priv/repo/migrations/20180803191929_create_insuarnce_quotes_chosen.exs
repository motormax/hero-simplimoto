defmodule HeroDigital.Repo.Migrations.CreateInsuarnceQuotesChosen do
  use Ecto.Migration

  def change do
    create table(:insuarnce_quotes_chosen) do
      add :select_my_own_insurance, :boolean
      add :quote_id, :integer
      add :quote_price, :decimal
      add :quote_broker_name, :string


      add :motorcycle_id, references(:motorcycles, on_delete: :nothing)

      timestamps()
    end

  end
end
