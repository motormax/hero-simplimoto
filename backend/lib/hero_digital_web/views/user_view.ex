defmodule HeroDigitalWeb.UserView do
  use HeroDigitalWeb, :view
  alias HeroDigitalWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      last_login: user.last_login,
      motorcycle: render_one(user.motorcycle, UserView, "motorcycle.json", as: :motorcycle)
    }
  end

  def render("show.json", %{motorcycle: motorcycle}) do
    %{data: render_one(motorcycle, UserView, "motorcycle.json")}
  end

  def render("motorcycle.json", %{motorcycle: motorcycle}) do
    %{
      id: motorcycle.id,
      name: motorcycle.name,
      price: motorcycle.price,
    }
  end
end
