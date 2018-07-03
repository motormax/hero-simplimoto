defmodule HeroDigitalWeb.Router do
  use HeroDigitalWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/admin", HeroDigitalWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", HeroDigitalWeb do
    pipe_through :api
    match :*, "/*path", StaticFilesController, :not_found
  end

  # We respond to every other request with the react index since it's probably a react route.
  scope "/", HeroDigitalWeb do
    get "/*path", StaticFilesController, :static
  end

end
