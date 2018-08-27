defmodule HeroDigitalWeb.MailsView do
  use HeroDigitalWeb, :view

  @assets_path Application.get_env(:hero_digital, __MODULE__)[:assets_path]

  def assets_path() do
    @assets_path
  end
end
