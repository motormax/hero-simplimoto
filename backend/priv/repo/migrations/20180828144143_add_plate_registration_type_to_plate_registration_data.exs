defmodule HeroDigital.Repo.Migrations.AddPlateRegistrationTypeToPlateRegistrationData do
  use Ecto.Migration

  def change do
    alter table(:plate_registration_data) do
      add :plate_registration_type_id, references(:plate_registration_types, on_delete: :nothing)
    end
  end
end
