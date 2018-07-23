defmodule HeroDigital.PlateRegistration do
  @moduledoc """
  The PlateRegistration context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo
  alias HeroDigital.UserData

  alias HeroDigital.PlateRegistration.PlateRegistrationData

  @doc """
  Returns the list of plate_registration_data.

  ## Examples

      iex> list_plate_registration_data()
      [%PlateRegistrationData{}, ...]

  """
  def list_plate_registration_data do
    Repo.all from plate_registration_data in PlateRegistrationData, preload: [:email, :personal_data, :phone]
  end

  @doc """
  Gets a single plate_registration_data.

  Raises `Ecto.NoResultsError` if the Plate registration data does not exist.

  ## Examples

      iex> get_plate_registration_data!(123)
      %PlateRegistrationData{}

      iex> get_plate_registration_data!(456)
      ** (Ecto.NoResultsError)

  """
  def get_plate_registration_data!(id) do
    plate_registration_data = Repo.get!(PlateRegistrationData, id)
    Repo.preload(plate_registration_data, [:email, :personal_data, :phone])
  end

  @doc """
  Creates a plate_registration_data.

  ## Examples

      iex> create_plate_registration_data(%{field: value})
      {:ok, %PlateRegistrationData{}}

      iex> create_plate_registration_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_plate_registration_data(attrs \\ %{}) do
    with {:ok, email} <- UserData.create_email(%{"email" => attrs["email"], "lead_id" => attrs["lead_id"]}),
         {:ok, phone} <- UserData.create_phone(%{"phone" => attrs["phone"], "lead_id" => attrs["lead_id"]}),
         {:ok, front_dni_image} <- UserData.create_image(Map.put(attrs["front_dni_image"], "lead_id", attrs["lead_id"])),
         {:ok, back_dni_image} <- UserData.create_image(Map.put(attrs["back_dni_image"], "lead_id", attrs["lead_id"])),
         {:ok, personal_data} <- UserData.create_personal_data(Map.put(attrs["personal_data"], "lead_id", attrs["lead_id"])),
         plate_registration_data_attrs <- %{
           lead_id: attrs["lead_id"],
           email_id: email.id,
           phone_id: phone.id,
           personal_data_id: personal_data.id,
           front_dni_image_id: front_dni_image.id,
           back_dni_image_id: back_dni_image.id,
         },
         {:ok, plate_registration_data} <- %PlateRegistrationData{}
                                           |> PlateRegistrationData.changeset(plate_registration_data_attrs)
                                           |> Repo.insert()
    do
      {:ok, Repo.preload(plate_registration_data, [:email, :personal_data, :phone])}
    end
  end

  @doc """
  Updates a plate_registration_data.

  ## Examples

      iex> update_plate_registration_data(plate_registration_data, %{field: new_value})
      {:ok, %PlateRegistrationData{}}

      iex> update_plate_registration_data(plate_registration_data, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_plate_registration_data(%PlateRegistrationData{} = plate_registration_data, attrs) do
    plate_registration_data
    |> PlateRegistrationData.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PlateRegistrationData.

  ## Examples

      iex> delete_plate_registration_data(plate_registration_data)
      {:ok, %PlateRegistrationData{}}

      iex> delete_plate_registration_data(plate_registration_data)
      {:error, %Ecto.Changeset{}}

  """
  def delete_plate_registration_data(%PlateRegistrationData{} = plate_registration_data) do
    Repo.delete(plate_registration_data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking plate_registration_data changes.

  ## Examples

      iex> change_plate_registration_data(plate_registration_data)
      %Ecto.Changeset{source: %PlateRegistrationData{}}

  """
  def change_plate_registration_data(%PlateRegistrationData{} = plate_registration_data) do
    PlateRegistrationData.changeset(plate_registration_data, %{})
  end
end
