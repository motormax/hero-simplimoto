defmodule HeroDigital.Delivery do
  @moduledoc """
  The Delivery context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Delivery.DeliveryChoice
  alias HeroDigital.UserData

  @doc """
  Returns the list of delivery_choices.

  ## Examples

      iex> list_delivery_choices()
      [%DeliveryChoice{}, ...]

  """
  def list_delivery_choices do
    Repo.all from delivery_choice in DeliveryChoice, preload: [:address]
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
  def get_delivery_choice!(id) do
    delivery_choice = Repo.get!(DeliveryChoice, id)
    Repo.preload(delivery_choice, [:address])
  end

  def get_delivery_choice_for_user(user_id) do
    delivery_choice = Repo.one(from d in DeliveryChoice, where: d.user_id == ^user_id, order_by: [desc: d.inserted_at], limit: 1)
    Repo.preload(delivery_choice, [:address])
  end

  @doc """
  Creates a delivery_choice.

  ## Examples

      iex> create_delivery_choice(%{field: value})
      {:ok, %DeliveryChoice{}}

      iex> create_delivery_choice(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_delivery_choice(attrs \\ %{}) do
    with {:ok, attrs} <- (case attrs do
            %{"address" => address} when is_map(address) ->
               address_attrs = Map.merge(address, %{"user_id" => attrs["user_id"]})
               with {:ok, address} <- UserData.create_address(address_attrs) do
                 {:ok, Map.merge(attrs, %{"address_id" => address.id})}
               end
            attrs -> {:ok, attrs}
            end),
         {:ok, delivery_choice} <- %DeliveryChoice{}
                                   |> DeliveryChoice.changeset(attrs)
                                   |> Repo.insert() do
      {:ok, Repo.preload(delivery_choice, [:address])}
    end
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
