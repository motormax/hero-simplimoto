defmodule HeroDigital.Product do
  @moduledoc """
  The Product context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Product.Accessory

  @doc """
  Returns the list of accessories.

  ## Examples

      iex> list_accessories()
      [%Accessory{}, ...]

  """
  def list_accessories do
    Repo.all(Accessory)
  end

  @doc """
  Gets a single accessory.

  Raises `Ecto.NoResultsError` if the Accessory does not exist.

  ## Examples

      iex> get_accessory!(123)
      %Accessory{}

      iex> get_accessory!(456)
      ** (Ecto.NoResultsError)

  """
  def get_accessory!(id), do: Repo.get!(Accessory, id)

  @doc """
  Creates a accessory.

  ## Examples

      iex> create_accessory(%{field: value})
      {:ok, %Accessory{}}

      iex> create_accessory(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_accessory(attrs \\ %{}) do
    %Accessory{}
    |> Accessory.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a accessory.

  ## Examples

      iex> update_accessory(accessory, %{field: new_value})
      {:ok, %Accessory{}}

      iex> update_accessory(accessory, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_accessory(%Accessory{} = accessory, attrs) do
    accessory
    |> Accessory.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Accessory.

  ## Examples

      iex> delete_accessory(accessory)
      {:ok, %Accessory{}}

      iex> delete_accessory(accessory)
      {:error, %Ecto.Changeset{}}

  """
  def delete_accessory(%Accessory{} = accessory) do
    Repo.delete(accessory)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking accessory changes.

  ## Examples

      iex> change_accessory(accessory)
      %Ecto.Changeset{source: %Accessory{}}

  """
  def change_accessory(%Accessory{} = accessory) do
    Accessory.changeset(accessory, %{})
  end
end
