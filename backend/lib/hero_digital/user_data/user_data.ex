defmodule HeroDigital.UserData do
  @moduledoc """
  The UserData context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.UserData.DeliveryData

  @doc """
  Returns the list of delivery_data.

  ## Examples

      iex> list_delivery_data()
      [%DeliveryData{}, ...]

  """
  def list_delivery_data do
    Repo.all(DeliveryData)
  end

  @doc """
  Gets a single delivery_data.

  Raises `Ecto.NoResultsError` if the Delivery data does not exist.

  ## Examples

      iex> get_delivery_data!(123)
      %DeliveryData{}

      iex> get_delivery_data!(456)
      ** (Ecto.NoResultsError)

  """
  def get_delivery_data!(id), do: Repo.get!(DeliveryData, id)

  @doc """
  Creates a delivery_data.

  ## Examples

      iex> create_delivery_data(%{field: value})
      {:ok, %DeliveryData{}}

      iex> create_delivery_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_delivery_data(attrs \\ %{}) do
    %DeliveryData{}
    |> DeliveryData.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a delivery_data.

  ## Examples

      iex> update_delivery_data(delivery_data, %{field: new_value})
      {:ok, %DeliveryData{}}

      iex> update_delivery_data(delivery_data, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_delivery_data(%DeliveryData{} = delivery_data, attrs) do
    delivery_data
    |> DeliveryData.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DeliveryData.

  ## Examples

      iex> delete_delivery_data(delivery_data)
      {:ok, %DeliveryData{}}

      iex> delete_delivery_data(delivery_data)
      {:error, %Ecto.Changeset{}}

  """
  def delete_delivery_data(%DeliveryData{} = delivery_data) do
    Repo.delete(delivery_data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking delivery_data changes.

  ## Examples

      iex> change_delivery_data(delivery_data)
      %Ecto.Changeset{source: %DeliveryData{}}

  """
  def change_delivery_data(%DeliveryData{} = delivery_data) do
    DeliveryData.changeset(delivery_data, %{})
  end
end
