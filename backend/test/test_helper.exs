ExUnit.start()

Ecto.Adapters.SQL.Sandbox.mode(HeroDigital.Repo, :manual)

Mox.defmock(
  Http.Mock,
  for: Http.Behaviour
)
