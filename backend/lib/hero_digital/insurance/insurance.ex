defmodule HeroDigital.Insurance do
  @moduledoc """
  The Insurance context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Insurance.InsuranceQuoteChosen

  @doc """
  Returns the list of insuarnce_quotes_chosen.

  ## Examples

      iex> list_insuarnce_quotes_chosen()
      [%InsuranceQuoteChosen{}, ...]

  """
  def list_insuarnce_quotes_chosen do
    Repo.all(InsuranceQuoteChosen)
  end

  @doc """
  Gets a single insurance_quote_chosen.

  Raises `Ecto.NoResultsError` if the Insurance quote chosen does not exist.

  ## Examples

      iex> get_insurance_quote_chosen!(123)
      %InsuranceQuoteChosen{}

      iex> get_insurance_quote_chosen!(456)
      ** (Ecto.NoResultsError)

  """
  def get_insurance_quote_chosen!(id), do: Repo.get!(InsuranceQuoteChosen, id)

  @doc """
  Creates a insurance_quote_chosen.

  ## Examples

      iex> create_insurance_quote_chosen(%{field: value})
      {:ok, %InsuranceQuoteChosen{}}

      iex> create_insurance_quote_chosen(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_insurance_quote_chosen(attrs \\ %{}) do
    %InsuranceQuoteChosen{}
    |> InsuranceQuoteChosen.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a insurance_quote_chosen.

  ## Examples

      iex> update_insurance_quote_chosen(insurance_quote_chosen, %{field: new_value})
      {:ok, %InsuranceQuoteChosen{}}

      iex> update_insurance_quote_chosen(insurance_quote_chosen, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_insurance_quote_chosen(%InsuranceQuoteChosen{} = insurance_quote_chosen, attrs) do
    insurance_quote_chosen
    |> InsuranceQuoteChosen.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a InsuranceQuoteChosen.

  ## Examples

      iex> delete_insurance_quote_chosen(insurance_quote_chosen)
      {:ok, %InsuranceQuoteChosen{}}

      iex> delete_insurance_quote_chosen(insurance_quote_chosen)
      {:error, %Ecto.Changeset{}}

  """
  def delete_insurance_quote_chosen(%InsuranceQuoteChosen{} = insurance_quote_chosen) do
    Repo.delete(insurance_quote_chosen)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking insurance_quote_chosen changes.

  ## Examples

      iex> change_insurance_quote_chosen(insurance_quote_chosen)
      %Ecto.Changeset{source: %InsuranceQuoteChosen{}}

  """
  def change_insurance_quote_chosen(%InsuranceQuoteChosen{} = insurance_quote_chosen) do
    InsuranceQuoteChosen.changeset(insurance_quote_chosen, %{})
  end
end
