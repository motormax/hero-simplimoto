defmodule HeroDigital.Repo.Migrations.CreateDateAppointments do
  use Ecto.Migration

  def change do
    create table(:date_appointments) do
      add :date, :date
      add :shift, :string
      add :address_id, references(:addresses, on_delete: :nothing)
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all)

      timestamps()
    end

    create index(:date_appointments, [:user_id])
    create index(:date_appointments, [:address_id])
  end
end
