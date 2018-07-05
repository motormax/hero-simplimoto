# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :hero_digital,
  ecto_repos: [HeroDigital.Repo]

# Configures the endpoint
config :hero_digital, HeroDigitalWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "0ARr38TXMNT5tbZ/ISXldKVIrQ0jBIRoXNWCUZXuwAMb7FTY3lHZvtUBJRESGZ79",
  render_errors: [view: HeroDigitalWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: HeroDigital.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

config :ex_admin,
  repo: HeroDigital.Repo,
  module: HeroDigitalWeb,    # MyProject.Web for phoenix >= 1.3.0-rc
  modules: [
    HeroDigitalWeb.ExAdmin.Dashboard,
    HeroDigital.ExAdmin.Product.Motorcycle,
    HeroDigital.ExAdmin.UserData.Address,
  ]

config :hero_digital, basic_auth: [
  username: "admin",
  password: "admin",
  realm: "Admin Area"
]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

config :xain, :after_callback, {Phoenix.HTML, :raw}

