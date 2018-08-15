defmodule HeroDigital.Repo.Migrations.AddLeadDataToDateAppointments do
  use Ecto.Migration

  def change do
    alter table(:date_appointments) do
      add :name, :string
      add :email, :string
    end
  end
end
