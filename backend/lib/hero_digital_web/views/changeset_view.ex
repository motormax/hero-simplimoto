defmodule HeroDigitalWeb.ChangesetView do
  use HeroDigitalWeb, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `HeroDigitalWeb.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{errors: translate_errors(changeset)}
  end

  def render("payment_error.json", %{params: params}) do
    %{
      cause: params["message"],
      user_message: params["error_message"],
    }
  end
end
