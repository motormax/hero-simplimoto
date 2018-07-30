defmodule HeroDigitalWeb.PersonalDataView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.PersonalDataView

  def render("index.json", %{personal_data: personal_data}) do
    %{data: render_many(personal_data, PersonalDataView, "personal_data.json")}
  end

  def render("show.json", %{personal_data: personal_data}) do
    %{data: render_one(personal_data, PersonalDataView, "personal_data.json")}
  end

  def render("personal_data.json", %{personal_data: personal_data}) do
    %{id: personal_data.id,
      name: personal_data.name,
      last_name: personal_data.last_name,
      dni: personal_data.dni}
  end
end
