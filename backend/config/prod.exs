use Mix.Config

# For production, we often load configuration from external
# sources, such as your system environment. For this reason,
# you won't find the :http configuration below, but set inside
# HeroDigitalWeb.Endpoint.init/2 when load_from_system_env is
# true. Any dynamic configuration should be done there.
#
# Don't forget to configure the url host to something meaningful,
# Phoenix uses this information when generating URLs.
#
# Finally, we also include the path to a cache manifest
# containing the digested version of static files. This
# manifest is generated by the mix phx.digest task
# which you typically run after static files are built.
config :hero_digital, HeroDigitalWeb.Endpoint,
  load_from_system_env: true,
  url: [host: "argentina.heromotodigital.com", scheme: "https", port: 443],
  cache_static_manifest: "priv/static/cache_manifest.json",
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  secret_key_base: System.get_env("SECRET_KEY_BASE")

# Do not print debug messages in production
config :logger, level: String.to_atom(Map.get(System.get_env(), "LOG_LEVEL", "info"))

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section and set your `:url` port to 443:
#
#     config :hero_digital, HeroDigitalWeb.Endpoint,
#       ...
#       url: [host: "example.com", port: 443],
#       https: [:inet6,
#               port: 443,
#               keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#               certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables return an absolute path to
# the key and cert in disk or a relative path inside priv,
# for example "priv/ssl/server.key".
#
# We also recommend setting `force_ssl`, ensuring no data is
# ever sent via http, always redirecting to https:
#
#     config :hero_digital, HeroDigitalWeb.Endpoint,
#       force_ssl: [hsts: true]
#
# Check `Plug.SSL` for all available options in `force_ssl`.

# ## Using releases
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :hero_digital, HeroDigitalWeb.Endpoint, server: true
#
#

# Configure your database
config :hero_digital, HeroDigital.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  ssl: true,
  database: "hero_digital_prod"

config :hero_digital, basic_auth: [
  username: {:system, "BASIC_AUTH_USERNAME"},
  password: {:system, "BASIC_AUTH_PASSWORD"},
  realm:    {:system, "BASIC_AUTH_REALM"}
]

config :logger,
  backends: [{Logglix, :logglix}, :console]

config :logger, :logglix,
  loggly_key: System.get_env("LOGGLY_KEY"),
  tags: ["herodigital", "elixir"],
  level: String.to_atom(Map.get(System.get_env(), "LOG_LEVEL", "info"))

config :sentry,
  dsn: {:system, "SENTRY_DSN"},
  environment_name: :prod,
  enable_source_code_context: true,
  root_source_code_path: File.cwd!,
  tags: %{
    env: "production"
  },
  included_environments: [:prod]

config :hero_digital, HeroDigital.Payment.PaymentGateway,
    access_token: System.get_env("MERCADO_PAGO_ACCESS_TOKEN")

config :hero_digital, HeroDigitalWeb.MailsView,
  assets_path: "https://simplimoto.herokuapp.com/mails/"

config :hero_digital, HeroDigital.Mailer,
  adapter: Bamboo.SendGridAdapter,
  api_key: {:system, "SENDGRID_API_KEY"}

config :hero_digital, HeroDigital.CredicuotasClient,
       base_url: "https://api-origination.credicuotas.com.ar",
       user: "api.hero",
       password: "ccH3r0M0t0s",
       http_adapter: HTTPoison
