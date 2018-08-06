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

hunk = HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "HUNK", price: 22222})
ignitor = HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "IGNITOR", price: 22222})
hunk_sport = HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "HUNK_SPORT", price: 22222})
dash = HeroDigital.Repo.insert!(%HeroDigital.Product.Motorcycle{name: "DASH", price: 11111})

atm = HeroDigital.Repo.insert!(%HeroDigital.Insurance.Broker{external_id: "atm", logo_url: "http://motos-ci.123seguro.com/images/front/paso34/SVG/atm.svg", name: "ATM"})
mapfre = HeroDigital.Repo.insert!(%HeroDigital.Insurance.Broker{external_id: "mapfre", logo_url: "http://motos-ci.123seguro.com/images/front/paso34/SVG/mapfre.svg", name: "Mapfre"})

abasto_cp = "1194"

first_atm_policy = %HeroDigital.Insurance.Policy {
  name: "Solo responsabilidad civil",
  details: "Detalle del seguro",
  price: 123,
  postal_codes: abasto_cp,
  min_age: 1,
  max_age: 100,
  external_id: "first atm policy",
  motorcycle_id: hunk.id,
  insurance_broker_id: atm.id
}

second_atm_policy = %HeroDigital.Insurance.Policy {
  name: "Contra todo riesgo",
  details: "Detalle del seguro",
  price: 321,
  postal_codes: abasto_cp,
  min_age: 1,
  max_age: 100,
  external_id: "second atm policy",
  motorcycle_id: dash.id,
  insurance_broker_id: atm.id
}

first_mapfre_policy = %HeroDigital.Insurance.Policy {
  name: "Solo responsabilidad civil",
  details: "Detalle del seguro",
  price: 111,
  postal_codes: abasto_cp,
  min_age: 1,
  max_age: 100,
  external_id: "first mapfre policy",
  motorcycle_id: hunk.id,
  insurance_broker_id: mapfre.id
}

second_mapfre_policy = %HeroDigital.Insurance.Policy {
  name: "Contra todo riesgo",
  details: "Detalle del seguro",
  price: 222,
  postal_codes: abasto_cp,
  min_age: 1,
  max_age: 100,
  external_id: "second mapfre policy",
  motorcycle_id: dash.id,
  insurance_broker_id: mapfre.id
}

HeroDigital.Repo.insert!(first_atm_policy)
HeroDigital.Repo.insert!(second_atm_policy)
HeroDigital.Repo.insert!(first_mapfre_policy)
HeroDigital.Repo.insert!(second_mapfre_policy)
