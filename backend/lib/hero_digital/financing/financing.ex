defmodule HeroDigital.Financing do
  @moduledoc """
  The Financing context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Financing.FinancingData

  @doc """
  Returns the list of financing_data.

  ## Examples

      iex> list_financing_data()
      [%FinancingData{}, ...]

  """
  def list_financing_data do
    Repo.all(FinancingData)
  end

  @doc """
  Gets a single financing_data by lead id
  """
  def get_financing_data_by_lead_id(lead_id) do
    Repo.one(from f in FinancingData, where: f.lead_id == ^lead_id, order_by: [desc: f.inserted_at], limit: 1)
  end

  @doc """
  Creates a financing_data.

  ## Examples

      iex> create_financing_data(%{field: value})
      {:ok, %FinancingData{}}

      iex> create_financing_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def set_financing_data(lead_id, attrs \\ %{}) do
    case get_financing_data_by_lead_id(lead_id) do
      %FinancingData{} = financing_data -> financing_data
      nil -> %FinancingData{}
    end
    |> FinancingData.changeset(attrs, lead_id)
    |> Repo.insert_or_update()
  end
end
