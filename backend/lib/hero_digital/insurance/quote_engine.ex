defmodule HeroDigital.Insurance.QuoteEngine do

  import Ecto.Query, warn: false
  alias HeroDigital.Repo

  alias HeroDigital.Insurance.Policy

  @postal_code_regex ~r/\(CP:\s(?<postalCode>\d+)/

  def fetch_quotes_by(motorcycle_id, postal_code_str, age) do
    captured_postal_code = Regex.named_captures(@postal_code_regex, postal_code_str)
    postal_code = "%#{captured_postal_code["postalCode"]}%"

    query = from p in Policy,
        join: b in assoc(p, :insurance_broker),
        select: %{policy: p.name, price: p.price, moreInfo: p.details, broker: b.name, brokerLogo: b.logo_url},
        where: p.min_age <= ^age
        and  p.max_age >= ^age
        and  p.motorcycle_id == ^motorcycle_id
        and like(p.postal_codes, ^postal_code)

    Repo.all(query)
  end
end
