defmodule HeroDigital.DateYourBike do
  @moduledoc """
  The DateYourBike context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.DateYourBike.DateAppointment
  alias HeroDigital.UserData

  @doc """
  Returns the list of date_appointments.

  ## Examples

      iex> list_date_appointments()
      [%DateAppointment{}, ...]

  """
  def list_date_appointments do
    Repo.all from date_appointment in DateAppointment, preload: [:address]
  end

  @doc """
  Gets a single date_appointment.

  Raises `Ecto.NoResultsError` if the Date appointment does not exist.

  ## Examples

      iex> get_date_appointment!(123)
      %DateAppointment{}

      iex> get_date_appointment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_date_appointment!(id) do
    date_appointment = Repo.get!(DateAppointment, id)
    Repo.preload(date_appointment, [:address])
  end

  def get_date_appointment_for_user!(user_id) do
    date_appointment = Repo.one(from d in DateAppointment, where: d.user_id == ^user_id, order_by: d.inserted_at, limit: 1)
    Repo.preload(date_appointment, [:address])
  end

  @doc """
  Creates a date_appointment.

  ## Examples

      iex> create_date_appointment(%{field: value})
      {:ok, %DateAppointment{}}

      iex> create_date_appointment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_date_appointment(attrs \\ %{}) do
    attrs = if attrs["address"] do
      address_attrs = Map.merge(attrs["address"], %{"user_id" => attrs["user_id"]})
      {:ok, address} = UserData.create_address(address_attrs)
      Map.merge(attrs, %{"address_id" => address.id})
    else
      attrs # attrs["address"] is nil, will fail with correct error in changeset validation
    end
    with {:ok, date_appointment} <- %DateAppointment{}
                                    |> DateAppointment.changeset(attrs)
                                    |> Repo.insert() do
      date_appointment = Repo.preload(date_appointment, [:address])
      {:ok, date_appointment}
    end
  end

  @doc """
  Deletes a DateAppointment.

  ## Examples

      iex> delete_date_appointment(date_appointment)
      {:ok, %DateAppointment{}}

      iex> delete_date_appointment(date_appointment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_date_appointment(%DateAppointment{} = date_appointment) do
    Repo.delete(date_appointment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking date_appointment changes.

  ## Examples

      iex> change_date_appointment(date_appointment)
      %Ecto.Changeset{source: %DateAppointment{}}

  """
  def change_date_appointment(%DateAppointment{} = date_appointment) do
    DateAppointment.changeset(date_appointment, %{})
  end
end
