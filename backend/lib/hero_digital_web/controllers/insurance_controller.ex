defmodule HeroDigitalWeb.InsuranceController do
  use HeroDigitalWeb, :controller

  action_fallback HeroDigitalWeb.FallbackController

  def update(conn, params) do
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
          "SERVIMAPFRE (Centro de Atención al Cliente)",
          "Asesoramiento legal"
        ]},
        %{policy: "Robo, Hurto y Resp. Civil",
        price: "233,08",
        id: 2,
        moreInfo: [
          "Responsabilidad Civil Limitada: Mayor a 250cc uso particular a) Daños a personas no transportadas: Límite por acontecimiento: $ 4.000.000.-, sublimite por reclamante $ 1.000.000.-",
          "Responsabilidad Civil Limitada: Hasta 250cc uso particular a) Daños a personas no transportadas: Límite por acontecimiento: $ 800.000.-, sublimite por reclamante $ 400.000.-",
          "SERVIMAPFRE (Centro de Atención al Cliente)",
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
          "Asesoramiento legal"
        ]},
        %{policy: "Robo, Hurto y Resp. Civil",
        price: "279,00",
        id: 4,
        moreInfo: [
          "Responsabilidad Civil Limitada: Mayor a 250cc uso particular a) Daños a personas no transportadas: Límite por acontecimiento: $ 4.000.000.-, sublimite por reclamante $ 1.000.000.-",
          "Responsabilidad Civil Limitada: Hasta 250cc uso particular a) Daños a personas no transportadas: Límite por acontecimiento: $ 800.000.-, sublimite por reclamante $ 400.000.-",
          "Asesoramiento legal"
        ]},
      ]},
    ];

    render(conn, "quotes.json", quotes: quotes)
  end
end
