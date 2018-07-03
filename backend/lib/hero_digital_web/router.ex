defmodule HeroDigitalWeb.Router do
  use HeroDigitalWeb, :router
  use ExAdmin.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug BasicAuth, use_config: {:hero_digital, :basic_auth}
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # scope "/", HeroDigitalWeb do
  #   pipe_through :browser # Use the default browser stack

  #   get "/", PageController, :index
  # end

  scope "/admin", ExAdmin do
    pipe_through :browser
    admin_routes()
  end

  # Other scopes may use custom stacks.
  # scope "/api", HeroDigitalWeb do
  #   pipe_through :api
  # end
end
