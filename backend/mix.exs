defmodule HeroDigital.Mixfile do
  use Mix.Project

  def project do
    [
      app: :hero_digital,
      version: "0.0.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {HeroDigital.Application, []},
      extra_applications: [:logger, :runtime_tools, :logglix, :httpoison, :sentry, :bamboo, :bamboo_smtp]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.3"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.2"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.13.1"},
      {:cowboy, "~> 1.0"},
      {:plug_static_index_html, "~> 1.0"},
      {:ex_admin, github: "smpallen99/ex_admin", ref: "5e375a98346b5dd81096d3e208b663ee4fc13c0d"}, # Latest commit from branch phx-1.3
      {:basic_auth, "~> 2.2.2"},
      {:logglix, "~> 1.0.0"},
      {:sentry, "~> 6.3"},
      {:mox, "~> 0.4", only: :test},
      {:decimal, "~> 1.0"},
      {:bamboo, "~> 1.0.0"},
      {:bamboo_smtp, "~> 1.5.0"},
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      "test": ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
