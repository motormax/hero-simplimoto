defmodule HeroDigital.Repo.Migrations.CreateEmail do
  use Ecto.Migration

  def change do
    create table(:email) do
      add :email, :string

      timestamps()
    end

  end
end
