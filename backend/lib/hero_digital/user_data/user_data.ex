defmodule HeroDigital.UserData do
  @moduledoc """
  The UserData context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.UserData.PersonalData

  @doc """
  Returns the list of personal_data.

  ## Examples

      iex> list_personal_data()
      [%PersonalData{}, ...]

  """
  def list_personal_data do
    Repo.all(PersonalData)
  end

  @doc """
  Gets a single personal_data.

  Raises `Ecto.NoResultsError` if the Personal data does not exist.

  ## Examples

      iex> get_personal_data!(123)
      %PersonalData{}

      iex> get_personal_data!(456)
      ** (Ecto.NoResultsError)

  """
  def get_personal_data!(id), do: Repo.get!(PersonalData, id)

  @doc """
  Creates a personal_data.

  ## Examples

      iex> create_personal_data(%{field: value})
      {:ok, %PersonalData{}}

      iex> create_personal_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_personal_data(attrs \\ %{}) do
    %PersonalData{}
    |> PersonalData.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a personal_data.

  ## Examples

      iex> update_personal_data(personal_data, %{field: new_value})
      {:ok, %PersonalData{}}

      iex> update_personal_data(personal_data, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_personal_data(%PersonalData{} = personal_data, attrs) do
    personal_data
    |> PersonalData.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PersonalData.

  ## Examples

      iex> delete_personal_data(personal_data)
      {:ok, %PersonalData{}}

      iex> delete_personal_data(personal_data)
      {:error, %Ecto.Changeset{}}

  """
  def delete_personal_data(%PersonalData{} = personal_data) do
    Repo.delete(personal_data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking personal_data changes.

  ## Examples

      iex> change_personal_data(personal_data)
      %Ecto.Changeset{source: %PersonalData{}}

  """
  def change_personal_data(%PersonalData{} = personal_data) do
    PersonalData.changeset(personal_data, %{})
  end
end
