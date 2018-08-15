defmodule HeroDigital.Repo.Migrations.CreateInsuranceChoices do
  use Ecto.Migration

  def change do
    create table(:insurance_choices) do
      add :opt_in_or_out, :string
      add :quote_price, :decimal
      add :quote_broker_name, :string
      add :quote_broker_logo_url, :string
      add :quote_policy, :string
      add :quote_more_info, :string
      add :query_province, :string
      add :query_age, :integer
      add :query_postal_code, :string
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)
      add :motorcycle_id, references(:motorcycles, on_delete: :delete_all)
      add :insurance_broker_id, references(:insurance_brokers, on_delete: :delete_all)
      add :insurance_policy_id, references(:insurance_policies, on_delete: :nothing)

      timestamps()
    end

  end
end
