defmodule HeroDigitalWeb.InsuranceController do
  use HeroDigitalWeb, :controller

  action_fallback HeroDigitalWeb.FallbackController

  def update(conn, params) do
    json conn, %{status: "success"}
  end

  def opt_out(conn, params) do
    json conn, %{status: "success"}
  end

  def quote(conn, params) do
    quotes = [
      %{brokerName: "Mapfre",
        brokerLogo: "http://motos-ci.123seguro.com/images/front/paso34/SVG/mapfre.svg",
        brokerQuotes: [
        %{policy: "Solo Responsabilidad Civil",
        price: "176.41",
        id: 1,
        moreInfo: ["Responsabilidad civil hasta $ 6.000.000",
          "Defensa Penal",
          "Asesoramiento legal"
        ]},
        %{policy: "Robo, Hurto y Resp. Civil",
        price: "233,08",
        id: 2,
        moreInfo: [
          "Responsabilidad Civil Limitada: Mayor a 250cc uso particular",
          "Asesoramiento legal"
        ]},
      ]},
      %{brokerName: "ATM",
        brokerLogo: "http://motos-ci.123seguro.com/images/front/paso34/SVG/atm.svg",
        brokerQuotes: [
        %{policy: "Solo Responsabilidad Civil",
        price: "210.11",
        id: 3,
        moreInfo: ["Responsabilidad civil hasta $ 6.000.000",
          "Defensa Penal",
        ]},
        %{policy: "Robo, Hurto y Resp. Civil",
        price: "279,00",
        id: 4,
        moreInfo: [
          "Responsabilidad Civil Limitada: Mayor a 250cc uso particular",
          "Responsabilidad Civil Limitada: Hasta 250cc uso particular",
        ]},
      ]},
    ];

    render(conn, "quotes.json", quotes: quotes)
  end
end
