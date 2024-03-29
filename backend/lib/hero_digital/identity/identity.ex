defmodule HeroDigital.Identity do
  @moduledoc """
  The Identity context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Identity.Lead
  alias HeroDigital.Product

  @doc """
  Returns the list of leads.

  ## Examples

      iex> list_leads()
      [%Lead{}, ...]

  """
  def list_leads do
    Repo.all(Lead)
  end

  @doc """
  Gets a single lead.

  Raises `Ecto.NoResultsError` if the Lead does not exist.

  ## Examples

      iex> get_lead!(123)
      %Lead{}

      iex> get_lead!(456)
      ** (Ecto.NoResultsError)

  """
  def get_lead!(id) do
    Repo.get!(Lead, id)
    |> Repo.preload([:motorcycle, :accessories])
  end
  def get_lead(id) do
    Repo.get(Lead, id)
    |> Repo.preload([:motorcycle, :accessories])
  end

  @doc """
  Creates a lead.

  ## Examples

      iex> create_lead(%{field: value})
      {:ok, %Lead{}}

      iex> create_lead(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_lead(attrs \\ %{}) do
    with {:ok, lead } <- (%Lead{} |> Lead.changeset(attrs) |> Repo.insert()) do
      {:ok, get_lead!(lead.id)}
    end
  end

  @doc """
  Updates a lead.

  ## Examples

      iex> update_lead(lead, %{field: new_value})
      {:ok, %Lead{}}

      iex> update_lead(lead, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_lead(%Lead{} = lead, attrs) do
    lead
    |> Lead.changeset(attrs)
    |> Repo.update()
  end

  def deactivate_lead(%Lead{} = lead) do
    lead
    |> Lead.deactivation_changeset()
    |> Repo.update()
  end

  @doc """
  Deletes a Lead.

  ## Examples

      iex> delete_lead(lead)
      {:ok, %Lead{}}

      iex> delete_lead(lead)
      {:error, %Ecto.Changeset{}}

  """
  def delete_lead(%Lead{} = lead) do
    Repo.delete(lead)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking lead changes.

  ## Examples

      iex> change_lead(lead)
      %Ecto.Changeset{source: %Lead{}}

  """
  def change_lead(%Lead{} = lead) do
    Lead.changeset(lead, %{})
  end
end
