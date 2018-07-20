defmodule HeroDigitalWeb.EmailView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.EmailView

  def render("index.json", %{email: email}) do
    %{data: render_many(email, EmailView, "email.json")}
  end

  def render("show.json", %{email: email}) do
    %{data: render_one(email, EmailView, "email.json")}
  end

  def render("email.json", %{email: email}) do
    %{
      id: email.id,
      email: email.email,
    }
  end
end
