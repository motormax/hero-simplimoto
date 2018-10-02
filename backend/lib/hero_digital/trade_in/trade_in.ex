defmodule HeroDigital.TradeIn do
  @moduledoc """
  The TradeIn context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.TradeIn.TradeInData

  @doc """
  Returns the list of trade_ins.

  ## Examples

      iex> list_trade_ins()
      [%TradeInData{}, ...]

  """
  def list_trade_ins do
    Repo.all(TradeInData)
  end

  @doc """
  Gets a single trade_in_data.

  Raises `Ecto.NoResultsError` if the Trade in data does not exist.

  ## Examples

      iex> get_trade_in_data!(123)
      %TradeInData{}

      iex> get_trade_in_data!(456)
      ** (Ecto.NoResultsError)

  """
  def get_trade_in_data!(id), do: Repo.get!(TradeInData, id)

  def get_trade_for_lead!(id), do: Repo.get!(TradeInData, id)

  def get_trade_for_lead!(lead_id) do
    Repo.one(from d in TradeInData, where: d.lead_id == ^lead_id, order_by: [desc: d.inserted_at], limit: 1)
  end

  @doc """
  Creates a trade_in_data.

  ## Examples

      iex> create_trade_in_data(%{field: value})
      {:ok, %TradeInData{}}

      iex> create_trade_in_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_trade_in_data(attrs \\ %{}) do
    %TradeInData{}
    |> TradeInData.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a trade_in_data.

  ## Examples

      iex> update_trade_in_data(trade_in_data, %{field: new_value})
      {:ok, %TradeInData{}}

      iex> update_trade_in_data(trade_in_data, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_trade_in_data(%TradeInData{} = trade_in_data, attrs) do
    trade_in_data
    |> TradeInData.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TradeInData.

  ## Examples

      iex> delete_trade_in_data(trade_in_data)
      {:ok, %TradeInData{}}

      iex> delete_trade_in_data(trade_in_data)
      {:error, %Ecto.Changeset{}}

  """
  def delete_trade_in_data(%TradeInData{} = trade_in_data) do
    Repo.delete(trade_in_data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking trade_in_data changes.

  ## Examples

      iex> change_trade_in_data(trade_in_data)
      %Ecto.Changeset{source: %TradeInData{}}

  """
  def change_trade_in_data(%TradeInData{} = trade_in_data) do
    TradeInData.changeset(trade_in_data, %{})
  end
end
