defmodule HeroDigital.Repo.Migrations.CreatePlateRegistrationData do
  use Ecto.Migration

  def change do
    create table(:plate_registration_data) do
      add :lead_id, references(:leads, type: :uuid, on_delete: :delete_all)
      add :personal_data_id, references(:personal_data, type: :integer)
      add :phone_id, references(:phones, type: :integer)
      add :email_id, references(:emails, type: :integer)

      timestamps()
    end

  end
end
