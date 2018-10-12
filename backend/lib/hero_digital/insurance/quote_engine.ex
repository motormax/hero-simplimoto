defmodule HeroDigital.Insurance.QuoteEngine do

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Insurance.Policy

  @postal_code_regex ~r/\(CP:\s(?<postalCode>\d+)/

  def fetch_quotes_by(motorcycle_id, age) do
    query = from p in Policy,
        join: b in assoc(p, :insurance_broker),
        select: %{policy: p.name, policyId: p.id, price: p.price, moreInfo: p.details, brokerName: b.name, brokerLogo: b.logo_url, brokerId: b.id},
        where: p.min_age <= ^age
        and  p.max_age >= ^age
        and  p.motorcycle_id == ^motorcycle_id

    Repo.all(query)
  end
end
