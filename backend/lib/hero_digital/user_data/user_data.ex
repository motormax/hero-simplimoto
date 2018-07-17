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

  alias HeroDigital.UserData.Email

  @doc """
  Returns the list of email.

  ## Examples

      iex> list_email()
      [%Email{}, ...]

  """
  def list_email do
    Repo.all(Email)
  end

  @doc """
  Gets a single email.

  Raises `Ecto.NoResultsError` if the Email does not exist.

  ## Examples

      iex> get_email!(123)
      %Email{}

      iex> get_email!(456)
      ** (Ecto.NoResultsError)

  """
  def get_email!(id), do: Repo.get!(Email, id)

  @doc """
  Creates a email.

  ## Examples

      iex> create_email(%{field: value})
      {:ok, %Email{}}

      iex> create_email(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_email(attrs \\ %{}) do
    %Email{}
    |> Email.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a email.

  ## Examples

      iex> update_email(email, %{field: new_value})
      {:ok, %Email{}}

      iex> update_email(email, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_email(%Email{} = email, attrs) do
    email
    |> Email.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Email.

  ## Examples

      iex> delete_email(email)
      {:ok, %Email{}}

      iex> delete_email(email)
      {:error, %Ecto.Changeset{}}

  """
  def delete_email(%Email{} = email) do
    Repo.delete(email)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking email changes.

  ## Examples

      iex> change_email(email)
      %Ecto.Changeset{source: %Email{}}

  """
  def change_email(%Email{} = email) do
    Email.changeset(email, %{})
  end

  alias HeroDigital.UserData.Phone

  @doc """
  Returns the list of phones.

  ## Examples

      iex> list_phones()
      [%Phone{}, ...]

  """
  def list_phones do
    Repo.all(Phone)
  end

  @doc """
  Gets a single phone.

  Raises `Ecto.NoResultsError` if the Phone does not exist.

  ## Examples

      iex> get_phone!(123)
      %Phone{}

      iex> get_phone!(456)
      ** (Ecto.NoResultsError)

  """
  def get_phone!(id), do: Repo.get!(Phone, id)

  @doc """
  Creates a phone.

  ## Examples

      iex> create_phone(%{field: value})
      {:ok, %Phone{}}

      iex> create_phone(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_phone(attrs \\ %{}) do
    %Phone{}
    |> Phone.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a phone.

  ## Examples

      iex> update_phone(phone, %{field: new_value})
      {:ok, %Phone{}}

      iex> update_phone(phone, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_phone(%Phone{} = phone, attrs) do
    phone
    |> Phone.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Phone.

  ## Examples

      iex> delete_phone(phone)
      {:ok, %Phone{}}

      iex> delete_phone(phone)
      {:error, %Ecto.Changeset{}}

  """
  def delete_phone(%Phone{} = phone) do
    Repo.delete(phone)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking phone changes.

  ## Examples

      iex> change_phone(phone)
      %Ecto.Changeset{source: %Phone{}}

  """
  def change_phone(%Phone{} = phone) do
    Phone.changeset(phone, %{})
  end
end
