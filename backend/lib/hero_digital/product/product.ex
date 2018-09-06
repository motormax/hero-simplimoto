defmodule HeroDigital.Product do
  @moduledoc """
  The Product context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Product.Accessory
  alias HeroDigital.Identity

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

  @doc """
  Gets all leads accessories.

  Raises `Ecto.NoResultsError` if the Lead does not exist.
  """
  def lead_accessories(lead_id) do
    lead_id
    |> Identity.get_lead()
    |> get_lead_accessories()
  end

  defp get_lead_accessories(lead) do
    lead.accessories
  end

  @doc """
  Add one accessory association to the lead.

  Raises `Ecto.NoResultsError` if the Lead does not exist.
  """
  def add_accessory_to_lead(lead, accessory) do
    add_accessories_to_lead(lead, [accessory])
  end

  @doc """
  Add a list of accessories association to the lead.

  Raises `Ecto.NoResultsError` if the Lead does not exist.
  """
  def add_accessories_to_lead(lead, accessory_list) do
    Repo.preload(lead, [:accessories])
    |> Accessory.add_new_accessories_to_lead_changeset(accessory_list)
    |> Repo.update()
  end

  @doc """
  delete the accessory association with lead.

  Raises `Ecto.NoResultsError` if the Lead does not exist.
  """
  def delete_accessory_from_lead(lead, accessory) do
    lead = Repo.preload(lead, [:accessories])
    lead_new_accessories = Enum.filter(lead.accessories, fn a ->
      a.id != accessory.id
    end)

    lead
    |> Accessory.put_accessories_assoc_to_lead_changeset(lead_new_accessories)
    |> Repo.update()
  end
end
