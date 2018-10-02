import hunkImgUrl from '../images/Hunk.png';
import ignitorImgUrl from '../images/ignitor.png';
import hunkSportImgUrl from '../images/Hunk-sport.png';
import dashImgUrl from '../images/dash.png';

const availableMotorcycles = {
  /*
    Until we implement dynamic motorcycle selection, we use hardcoded IDs.
    Motorcycle IDs can be found in backend/priv/repo/seeds.exs (they are 1-indexed).
    */
  HUNK: {
    id: 1,
    displayName: 'Hunk',
    monthlyPrice: 4300,
    defaultImageUrl: hunkImgUrl,
    videoId: 'ksVob1Jc0E0',
    specsTitle: 'Hunk',

    miniSpecs: [
      'Tecnología I3S',
      'Motor 150cm3',
      'Amortiguadores con gas, regulables',
      'Potente faro delantero',
    ],

    bikeImages: [
      'http://www.heromotos.com.ar/medios/files/images/hunk/hunk frente.jpg',
      'http://www.heromotos.com.ar/medios/files/images/hunk/hunk 3 cuartos atras.jpg',
      'http://www.heromotos.com.ar/medios/files/images/hunk/Hunk Derecha.jpg',
      'http://www.heromotos.com.ar/medios/files/images/hunk/Hunk IB CB Red Rev Side.jpg',
      'http://www.heromotos.com.ar/medios/files/images/hunk/Hunk IB CB Red Console.jpg',
      'http://www.heromotos.com.ar/medios/files/images/hunk/Hunk IB CB Red Back.jpg',
    ],

    bikeInfo: [
      {
        paneItems: [
          { itemTitle: 'Motor Tipo', description: 'Refrigeracion por aire, 4 tiempos 1 cilindro' },
          { itemTitle: 'Desplazamiento', description: '124.7 cc' },
          { itemTitle: 'Potencia Max.', description: '6.72 KW (9.1 Ps) @ 7000 rpm' },
          { itemTitle: 'Torque Max.', description: '13.50 Nm @ 7000 rpm' },
          { itemTitle: 'Diámetro x Carrera', description: '57.3 x 57.8 mm' },
          { itemTitle: 'Carburador', description: 'Carburador con control variable de ignicion' },
          { itemTitle: 'Relación de Compresión', description: '10 : 1' },
          { itemTitle: 'Arranque', description: 'Automatico' },
          { itemTitle: 'Encendido', description: 'AMI - Advanced Microprocessor Ignition System' },
        ],
        paneTitle: 'Motor',
      },
      {
        paneItems: [
          { itemTitle: 'Embrague', description: 'Multidisco' },
          { itemTitle: 'Caja de Cambios', description: '5 velocidades' },
          { itemTitle: 'Chasis', description: 'Tubular Diamond Type' },
        ],
        paneTitle: 'Transmisión',
      },
      {
        paneItems: [
          { itemTitle: 'Delantera', description: 'Telescopica Hidraulica' },
          { itemTitle: 'Trasera', description: 'Swing arm con 5 pasos adjustables con deposito de gas' },
        ],
        paneTitle: 'Suspensión',
      },
      {
        paneItems: [
          { itemTitle: 'Freno Delantero', description: 'Disco - Diametro 240 mm' },
          { itemTitle: 'Freno Trasero', description: 'Campana - 130 mm' },
        ],
        paneTitle: 'Frenos',
      },
      {
        paneItems: [
          { itemTitle: 'Tamaño Rin Delantero', description: '18 x 1.85, de aleacion' },
          { itemTitle: 'Tamaño Rin Trasero', description: '18 x 2.15, de aleacion' },
          { itemTitle: 'Tamaño llanta Delantera', description: '80/100 x 18 - 47 P, Tubeless Tyres' },
          { itemTitle: 'Tamaño llanta Trasera', description: '110/90 x 18 - 61 P, Tubeless' },
        ],
        paneTitle: 'Ruedas',
      },
      {
        paneItems: [
          { itemTitle: 'Batería', description: '12 V - 4 Ah, MF Bateria' },
          { itemTitle: 'Lámpara/Luz delantera', description: '12 V - 35W/35W - Halogen Bulb Trapeziodal MFR' },
          { itemTitle: 'Lámpara/Luz Trasera o de Freno', description: '12 V - 0.5 W / 4.1 W (LED Lamps)' },
          { itemTitle: 'Luz de Cruce', description: '12V - 10 W (Amber Bulb) x 4 nos. (Multi - Reflector- Clear Lens)' },
        ],
        paneTitle: 'Eléctrico',
      },
      {
        paneItems: [
          { itemTitle: 'Largo', description: '2080 mm' },
          { itemTitle: 'Ancho', description: '765 mm' },
          { itemTitle: 'Alto', description: '1095 mm' },
          { itemTitle: 'Base de la Rueda', description: '1325 mm' },
          { itemTitle: 'Distancia del Suelo', description: '163 mm' },
          { itemTitle: 'Peso (seco)', description: '130kg' },
          {
            itemTitle: 'Carga máxima',
            description: '145 kg (Brakes - FR/RR--> Disc / Drum) 147 Kg (Brakes - FR/RR - Disc / Drum)',
          },
        ],
        paneTitle: 'Dimensiones',
      },
    ],
  },
  IGNITOR: {
    id: 2,
    displayName: 'Ignitor',
    monthlyPrice: 3900,
    defaultImageUrl: ignitorImgUrl,
    videoId: 'xFCnbwFHn7E',
    specsTitle: 'Ignitor',

    miniSpecs: [
      'Tecnología I3S Wow',
      'Motor 125cm3',
      'Cebador manual a cable',
      'Stop trasero con luces led',
    ],

    bikeImages: [
      'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor-blue-34.jpg',
      'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor azul e cuartos atras.jpg',
      'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor azul frente.jpg',
      'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor azul lateral.jpg',
    ],
    bikeInfo: [
      {
        paneItems: [
          { itemTitle: 'Motor Tipo', description: 'Refrigeracion por aire, 4 tiempos 1 cilindro' },
          { itemTitle: 'Desplazamiento', description: '124.7 cc' },
          { itemTitle: 'Potencia Max.', description: '6.72 KW (9.1 Ps) @ 7000 rpm' },
          { itemTitle: 'Torque Max.', description: '10.35 Nm @ 4000 rpm' },
          { itemTitle: 'Diámetro x Carrera', description: '52.4 x 57.8 mm' },
          { itemTitle: 'Carburador', description: 'Carburador con control variable de ignicion' },
          { itemTitle: 'Relación de Compresión', description: '9.1 : 1' },
          { itemTitle: 'Arranque', description: 'Electrico / patada' },
          { itemTitle: 'Encendido', description: 'AMI - Advanced Microprocessor Sistema de Ignicion' },
        ],
        paneTitle: 'Motor',
      },
      {
        paneItems: [
          { itemTitle: 'Embrague', description: 'Multidisco' },
          { itemTitle: 'Caja de Cambios', description: '4 velocidades' },
          { itemTitle: 'Chasis', description: 'Tubular doble cuna' },
        ],
        paneTitle: 'Transmisión',
      },
      {
        paneItems: [
          { itemTitle: 'Delantera', description: 'Telescopica Hidraulica' },
          { itemTitle: 'Trasera', description: 'Amortiguadores hidraulicos' },
        ],
        paneTitle: 'Suspensión',
      },
      {
        paneItems: [
          { itemTitle: 'Freno Delantero', description: '240 mm - sin asbestos' },
          { itemTitle: 'Freno Trasero', description: '130 mm - sin asbestos' },
        ],
        paneTitle: 'Frenos',
      },
      {
        paneItems: [
          { itemTitle: 'Tamaño Rin Delantero', description: '18 x 1.60, en fudición' },
          { itemTitle: 'Tamaño Rin Trasero', description: '18 x 1.60, en fudición' },
          { itemTitle: 'Tamaño llanta Delantera', description: '2.75 x 18 - 42 P / 4 PR' },
          { itemTitle: 'Tamaño llanta Trasera', description: '3.00 x 18 - 52 P / 6 PR' },
        ],
        paneTitle: 'Ruedas',
      },
      {
        paneItems: [
          { itemTitle: 'Batería', description: '12 V - 3 Ah MF Battery' },
          { itemTitle: 'Lámpara/Luz delantera', description: '12 V - 35W/35W - Lampara (Multi-Reflector Type)' },
          { itemTitle: 'Lámpara/Luz Trasera o de Freno', description: '12 V - 5 / 21 W (Multi-Reflector)' },
          { itemTitle: 'Luz de Cruce', description: '12V - 10 W (Amber Bulb) x 4 nos. (Multi - Reflector- Clear Lens)' },
        ],
        paneTitle: 'Eléctrico',
      },
      {
        paneItems: [
          { itemTitle: 'Largo', description: '2005 mm' },
          { itemTitle: 'Ancho', description: '735 mm' },
          { itemTitle: 'Alto', description: '1070 mm' },
          { itemTitle: 'Base de la Rueda', description: '1265 mm' },
          { itemTitle: 'Distancia del Suelo', description: '150 mm' },
          { itemTitle: 'Capacidad del Tanque de Gasolina', description: '13.6 litros' },
          { itemTitle: 'Tanque de Reserva', description: '1 litro' },
          { itemTitle: 'Peso (seco)', description: '125 Kg (patada) / 129 Kg (electrico)' },
        ],
        paneTitle: 'Dimensiones',
      },
    ],
  },
  HUNK_SPORT: {
    id: 3,
    displayName: 'Hunk Sport',
    monthlyPrice: 4100,
    defaultImageUrl: hunkSportImgUrl,
    videoId: 'xJ9Rfd9q_qc',
    specsTitle: 'Hunk Sport',

    miniSpecs: [
      '15.2 BHP de potencia',
      'Caja de 5 velocidades',
      'Freno a disco',
      'Cubiertas radiales',
    ],

    bikeImages: [
      'http://www.heromotos.com.ar/medios/files/images/hunk%20sports/hunksp-red-34t.jpeg',
      'http://www.heromotos.com.ar/medios/files/images/hunk%20sports/Hunk Sports Argentina 3-4th Front Red.jpg',
      'http://www.heromotos.com.ar/medios/files/images/hunk%20sports/Hunk Sports Argentina 3-4th Front Rev Side Red.jpg',
      'http://www.heromotos.com.ar/medios/files/images/hunk%20sports/hunksp-red-front.jpeg',
    ],

    bikeInfo: [
      {
        paneItems: [
          { itemTitle: 'Motor Tipo', description: 'Refrigeracion por aire, 4 tiempos 1 cilindro' },
          { itemTitle: 'Desplazamiento', description: '149.2 cc' },
          { itemTitle: 'Potencia Max.', description: '11.33 kW (15.2 BHP) @ 8500 rpm' },
          { itemTitle: 'Torque Max.', description: '13.50 Nm @ 7000 rpm' },
          { itemTitle: 'Diámetro x Carrera', description: '57.3 x 57.8 mm' },
          { itemTitle: 'Carburador', description: 'CV Type with Carburettor Controlled Variable Ignition' },
          { itemTitle: 'Relación de Compresión', description: '10:01' },
        ],
        paneTitle: 'Motor',
      },
      {
        paneItems: [
          { itemTitle: 'Clutch', description: 'Multidisco' },
          { itemTitle: 'Caja de Cambios', description: '5 velocidades' },
          { itemTitle: 'Tipo de Bastidor', description: 'Tubular Tipo diamante' },
        ],
        paneTitle: 'Transmisión y Chasis',
      },
      {
        paneItems: [
          { itemTitle: 'Delantera', description: 'Telescopica Hidraulica' },
          { itemTitle: 'Trasera', description: 'Swing arm con 5 pasos adjustables con deposito de gas' },
        ],
        paneTitle: 'Suspensión',
      },
      {
        paneItems: [
          { itemTitle: 'Tamaño Rin Delantero', description: '18 x 1.85, de aleacion' },
          { itemTitle: 'Tamaño Rin Trasero', description: '18 x 2.15, de aleacion' },
          { itemTitle: 'Tamaño llanta Delantera', description: '80/100 x 18 - 47 P, Tubeless Tyres' },
          { itemTitle: 'Tamaño llanta Trasera', description: '110/90 x 18 - 61 P, Tubeless' },
        ],
        paneTitle: 'Ruedas y Llantas',
      },
      {
        paneItems: [
          { itemTitle: 'Batería', description: '12 V - 4 Ah, MF Bateria' },
          {
            itemTitle: 'Lámpara/Luz delantera',
            description: '12 V - 35 W / 35 W - Halogen HS1 Bulb, Trapezoidal (Multi - Reflector Type)',
          },
          { itemTitle: 'Lámpara/Luz Trasera o de Freno', description: '12 V - 10 W (Ambar) x 4 nos (MFR - Clear Lens)' },
          { itemTitle: 'Luz de Cruce', description: '12 V - Twin Lamp - LED' },
          { itemTitle: 'Lámpara luz trasera', description: '12 V - 1.3 W / 1.96 W (LED)' },
          { itemTitle: 'Lámpara luz delantera', description: '12 V - 1.3 W / 1.96 W (LED)' },
        ],
        paneTitle: 'Eléctrico',
      },
      {
        paneItems: [
          { itemTitle: 'Largo', description: '2100 mm' },
          { itemTitle: 'Ancho', description: '780 mm' },
          { itemTitle: 'Alto', description: '1080 mm' },
          { itemTitle: 'Base de la Rueda', description: '1325 mm' },
          { itemTitle: 'Distancia del Suelo', description: '145 mm' },
          { itemTitle: 'Peso (seco)', description: '130kg' },
          { itemTitle: 'Carga máxima', description: '147 Kg (frenos - FR/RR - Disc / Drum)' },
        ],
        paneTitle: 'Dimensiones',
      },
    ],
  },
  DASH: {
    id: 4,
    displayName: 'Dash',
    monthlyPrice: 3000,
    defaultImageUrl: dashImgUrl,
    videoId: 'E7Quvpn_EIw',
    specsTitle: 'Dash',

    miniSpecs: [
      'Sistema de llave antirrobo',
      'Velocimetro analogico digital',
      'Tomas USB',
      'Frenos combinados',
    ],

    bikeImages: [
      'http://www.heromotos.com.ar/medios/files/images/dash/dash 3 cuartos frente.jpg',
      'http://www.heromotos.com.ar/medios/files/images/dash/dash perfil.jpg',
      'http://www.heromotos.com.ar/medios/files/images/dash/dash atras.jpg',
      'http://www.heromotos.com.ar/medios/files/images/dash/dash frente.jpg',
      'http://www.heromotos.com.ar/medios/files/images/dash/Dash Tail Light.jpg',
      'http://www.heromotos.com.ar/medios/files/images/dash/Dash Seat.jpg',
      'http://www.heromotos.com.ar/medios/files/images/dash/Dash Console.jpg',
      'http://www.heromotos.com.ar/medios/files/images/dash/Dash Engine.jpg',
    ],

    bikeInfo: [
      {
        paneItems: [
          { itemTitle: 'Motor Tipo', description: 'Refrigeracion por aire, 4-tiempos' },
          { itemTitle: 'Desplazamiento', description: '110.9 cc' },
          { itemTitle: 'Potencia Max.', description: '6.2 kW @ 8000 RPM' },
          { itemTitle: 'Torque Max.', description: '8.30 Nm @ 6500 RPM' },
          { itemTitle: 'Arranque', description: 'Automatico / patada' },
        ],
        paneTitle: 'Motor',
      },
      {
        paneItems: [
          { itemTitle: 'Delantera', description: 'Telescopica Hidraulica' },
          { itemTitle: 'Trasera', description: 'Swing con resorte precarga' },
        ],
        paneTitle: 'Suspensión',
      },
      {
        paneItems: [
          { itemTitle: 'Tamaño Rin Delantero', description: 'Campana (130 mm) - sin Asbestos' },
          { itemTitle: 'Tamaño Rin Trasero', description: 'Campana (130 mm) - sin Asbestos' },
          { itemTitle: 'Tamaño llanta Delantera', description: '90/90 - 12 - 54 J Tubeless' },
          { itemTitle: 'Tamaño llanta Trasera', description: '90/100 - 10 - 53 J Tubeless' },
        ],
        paneTitle: 'Ruedas',
      },
      {
        paneItems: [
          { itemTitle: 'Batería', description: '12V - 4Ah (Libre de mantenimiento)' },
        ],
        paneTitle: 'Eléctrico',
      },
      {
        paneItems: [
          { itemTitle: 'Largo', description: '1841 mm' },
          { itemTitle: 'Ancho', description: '695 mm' },
          { itemTitle: 'Alto', description: '1190 mm' },
          { itemTitle: 'Altura del Sillín', description: '755 mm' },
          { itemTitle: 'Base de la Rueda', description: '1261 mm' },
          { itemTitle: 'Distancia del Suelo', description: '155 mm' },
          { itemTitle: 'Capacidad del Tanque de Gasolina', description: '5.5 L' },
          { itemTitle: 'Peso (seco)', description: '110 Kgs.' },
        ],
        paneTitle: 'Dimensiones',
      },
    ],
  },
};
export default availableMotorcycles;
