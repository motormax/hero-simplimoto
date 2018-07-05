defmodule HeroDigital.Delivery do
  @moduledoc """
  The Delivery context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Delivery.DeliveryChoice

  @doc """
  Returns the list of delivery_choices.

  ## Examples

      iex> list_delivery_choices()
      [%DeliveryChoice{}, ...]

  """
  def list_delivery_choices do
    Repo.all(DeliveryChoice)
  end

  @doc """
  Gets a single delivery_choice.

  Raises `Ecto.NoResultsError` if the Delivery choice does not exist.

  ## Examples

      iex> get_delivery_choice!(123)
      %DeliveryChoice{}

      iex> get_delivery_choice!(456)
      ** (Ecto.NoResultsError)

  """
  def get_delivery_choice!(id), do: Repo.get!(DeliveryChoice, id)

  @doc """
  Creates a delivery_choice.

  ## Examples

      iex> create_delivery_choice(%{field: value})
      {:ok, %DeliveryChoice{}}

      iex> create_delivery_choice(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_delivery_choice(attrs \\ %{}) do
    %DeliveryChoice{}
    |> DeliveryChoice.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a delivery_choice.

  ## Examples

      iex> update_delivery_choice(delivery_choice, %{field: new_value})
      {:ok, %DeliveryChoice{}}

      iex> update_delivery_choice(delivery_choice, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_delivery_choice(%DeliveryChoice{} = delivery_choice, attrs) do
    delivery_choice
    |> DeliveryChoice.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DeliveryChoice.

  ## Examples

      iex> delete_delivery_choice(delivery_choice)
      {:ok, %DeliveryChoice{}}

      iex> delete_delivery_choice(delivery_choice)
      {:error, %Ecto.Changeset{}}

  """
  def delete_delivery_choice(%DeliveryChoice{} = delivery_choice) do
    Repo.delete(delivery_choice)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking delivery_choice changes.

  ## Examples

      iex> change_delivery_choice(delivery_choice)
      %Ecto.Changeset{source: %DeliveryChoice{}}

  """
  def change_delivery_choice(%DeliveryChoice{} = delivery_choice) do
    DeliveryChoice.changeset(delivery_choice, %{})
  end
end
