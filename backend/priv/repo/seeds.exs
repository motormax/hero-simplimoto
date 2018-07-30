# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     HeroDigital.Repo.insert!(%HeroDigital.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "HUNK", price: 22222})
HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "IGNITOR", price: 22222})
HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "HUNK_SPORT", price: 22222})
HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "DASH", price: 11111})
