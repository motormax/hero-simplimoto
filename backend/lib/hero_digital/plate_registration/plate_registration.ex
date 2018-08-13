defmodule HeroDigital.PlateRegistration do
  @moduledoc """
  The PlateRegistration context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo
  alias HeroDigital.UserData

  alias HeroDigital.PlateRegistration.PlateRegistrationData

  @personal_plate_registration "personalPlateRegistration"
  @hero_plate_registration "heroPlateRegistration"

  @doc """
  Returns the list of plate_registration_data.

  ## Examples

      iex> list_plate_registration_data()
      [%PlateRegistrationData{}, ...]

  """
  def list_plate_registration_data do
    Repo.all from plate_registration_data in PlateRegistrationData, preload: [:email, :personal_data, :phone, :address]
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
    Repo.preload(plate_registration_data, [:email, :personal_data, :phone, :address])
  end

  def get_plate_registration_data_for_lead!(lead_id) do
    plate_registration_data = Repo.one(from p in PlateRegistrationData, where: p.lead_id == ^lead_id, order_by: p.inserted_at, limit: 1)
    Repo.preload(plate_registration_data, [:email, :personal_data, :phone, :address])
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
    plate_registration_data = get_plate_registration_data_for_update(attrs)

    cond do
      is_updating_to_hero_plate_registration(plate_registration_data, attrs) ->
        update_plate_registration_data(plate_registration_data, get_hero_plate_registration_data(attrs))

      is_updating_to_personal_plate_registration(plate_registration_data, attrs) ->
        update_plate_registration_data(plate_registration_data, attrs)

      is_creating_hero_plate_registration(attrs) ->
        attrs
        |> get_hero_plate_registration_data()
        |> create_plate_registration_data_by_attrs()

      true ->
        create_plate_registration_data_by_attrs(attrs)
    end
  end

  defp get_plate_registration_data_for_update(attrs) do
    cond do
      Map.has_key?(attrs, "lead_id") ->
        get_plate_registration_data_for_lead!(attrs["lead_id"])
      true ->
        nil
    end
  end

  defp is_updating_to_hero_plate_registration(plate_registration_data, attrs) do
    !is_nil(plate_registration_data) and !is_nil(attrs["opt_in_or_out"]) and attrs["opt_in_or_out"] == @hero_plate_registration
  end

  defp is_updating_to_personal_plate_registration(plate_registration_data, attrs) do
    !is_nil(plate_registration_data) and !is_nil(attrs["opt_in_or_out"]) and attrs["opt_in_or_out"] == @personal_plate_registration
  end

  defp is_creating_hero_plate_registration(attrs) do
    !is_nil(attrs["opt_in_or_out"]) and attrs["opt_in_or_out"] == @hero_plate_registration
  end

  defp get_hero_plate_registration_data(attrs) do
    with {:ok, email} <- UserData.create_email(%{"email" => attrs["email"], "lead_id" => attrs["lead_id"]}),
         {:ok, phone} <- UserData.create_phone(%{"phone" => attrs["phone"], "lead_id" => attrs["lead_id"]}),
         {:ok, front_dni_image} <- UserData.create_image(Map.put(attrs["front_dni_image"], "lead_id", attrs["lead_id"])),
         {:ok, back_dni_image} <- UserData.create_image(Map.put(attrs["back_dni_image"], "lead_id", attrs["lead_id"])),
         {:ok, personal_data} <- UserData.create_personal_data(Map.put(attrs["personal_data"], "lead_id", attrs["lead_id"])),
         {:ok, address} <- UserData.create_address(Map.put(attrs["address"], "lead_id", attrs["lead_id"])),
         plate_registration_data_attrs <- %{
           opt_in_or_out: attrs["opt_in_or_out"],
           lead_id: attrs["lead_id"],
           email_id: email.id,
           phone_id: phone.id,
           personal_data_id: personal_data.id,
           front_dni_image_id: front_dni_image.id,
           back_dni_image_id: back_dni_image.id,
           address_id: address.id
         }
    do
      plate_registration_data_attrs
    end
  end

  defp create_plate_registration_data_by_attrs(attrs) do
    plate_registration_data_changeset = %PlateRegistrationData{}
                                        |> PlateRegistrationData.changeset(attrs)

    case Repo.insert(plate_registration_data_changeset) do
      {:ok, valid_plate_registration_data} ->
        {:ok, Repo.preload(valid_plate_registration_data, [:email, :personal_data, :phone, :address])}
      error ->
        error
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
