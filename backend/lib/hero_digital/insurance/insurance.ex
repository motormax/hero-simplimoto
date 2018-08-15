defmodule HeroDigital.Insurance do
  @moduledoc """
  The Insurance context.
  """

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Insurance.InsuranceChoice

  @doc """
  Returns the list of insurance_choices.

  ## Examples

      iex> list_insurance_choices()
      [%InsuranceChoice{}, ...]

  """
  def list_insurance_choices do
    Repo.all(InsuranceChoice)
  end

  @doc """
  Gets a single insurance_choice.

  Raises `Ecto.NoResultsError` if the Insurance choice does not exist.

  ## Examples

      iex> get_insurance_choice!(123)
      %InsuranceChoice{}

      iex> get_insurance_choice!(456)
      ** (Ecto.NoResultsError)

  """
  def get_insurance_choice!(id), do: Repo.get!(InsuranceChoice, id)

  @doc """
  Creates or updates (if exists another) an insurance_choice
  """
  def create_insurance_choice(attrs \\ %{}) do
    old_insurance_choice = get_insurance_choice_by_lead_in_attrs(attrs)
    insurance_choice_changeset = get_creation_changeset(attrs)
    delete_old_insurance_choice_when_exists_and_changeset_is_valid(old_insurance_choice, insurance_choice_changeset)
    create_insurance_choice_by_changeset(insurance_choice_changeset)
  end

  defp get_insurance_choice_by_lead_in_attrs(attrs) do
    cond do
      Map.has_key?(attrs, :lead_id) ->
        Repo.one(from iqc in InsuranceChoice, where: iqc.lead_id == ^attrs.lead_id, order_by: [desc: iqc.id], limit: 1)
      Map.has_key?(attrs, "lead_id") ->
        Repo.one(from iqc in InsuranceChoice, where: iqc.lead_id == ^attrs["lead_id"], order_by: [desc: iqc.id], limit: 1)
      true ->
        nil
    end
  end

  defp get_creation_changeset(attrs) do
    %InsuranceChoice{}
    |> InsuranceChoice.changeset(attrs)
  end

  defp delete_old_insurance_choice_when_exists_and_changeset_is_valid(old_insurance_choice, insurance_choice_changeset) do
    if !is_nil(old_insurance_choice) and insurance_choice_changeset.valid? do
      delete_insurance_choice(old_insurance_choice)
    end
  end

  defp create_insurance_choice_by_changeset(insurance_choice_changeset) do
    Repo.insert(insurance_choice_changeset)
  end

  @doc """
  Updates a insurance_choice.

  ## Examples

      iex> update_insurance_choice(insurance_choice, %{field: new_value})
      {:ok, %InsuranceChoice{}}

      iex> update_insurance_choice(insurance_choice, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_insurance_choice(%InsuranceChoice{} = insurance_choice, attrs) do
    insurance_choice
    |> InsuranceChoice.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a InsuranceChoice.

  ## Examples

      iex> delete_insurance_choice(insurance_choice)
      {:ok, %InsuranceChoice{}}

      iex> delete_insurance_choice(insurance_choice)
      {:error, %Ecto.Changeset{}}

  """
  def delete_insurance_choice(%InsuranceChoice{} = insurance_choice) do
    Repo.delete(insurance_choice)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking insurance_choice changes.

  ## Examples

      iex> change_insurance_choice(insurance_choice)
      %Ecto.Changeset{source: %InsuranceChoice{}}

  """
  def change_insurance_choice(%InsuranceChoice{} = insurance_choice) do
    InsuranceChoice.changeset(insurance_choice, %{})
  end
end
