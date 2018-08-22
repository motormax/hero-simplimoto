import React, { Component } from 'react';
import { Tab, Table, Segment, Button } from 'semantic-ui-react';
import Slider from 'react-slick';

const bikeImages = [
  'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor-blue-34.jpg',
  'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor azul e cuartos atras.jpg',
  'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor azul frente.jpg',
  'http://www.heromotos.com.ar/medios/files/images/ignitor/ignitor azul lateral.jpg',
];

const bikeInfo = [
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
];

const panes = bikeInfo.map(pane => ({
  menuItem: pane.paneTitle,
  render: () => (
    <Tab.Pane>
      <Table basic="very">
        <Table.Body>
          {
            pane.paneItems.map(paneItem => (
              <Table.Row>
                <Table.Cell><span className="fw-bold">{paneItem.itemTitle}</span></Table.Cell>
                <Table.Cell>{paneItem.description}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Tab.Pane>
  ),
}));

const sliderImages = bikeImages.map(url => (
  <div>
    <img src={url} className="carrousel-default-images" alt="Foto de Ignitor" />
  </div>
));

const fromHome = true;

class HankSpecs extends Component {
  render() {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
    };

    return (
      <div className="page-column-card no-border">
        {fromHome ? <Button className="btn-sticky" size="massive" primary> Comprar una Ignitor</Button> : ''}
        <h2 className="txt-center fs-massive">Nueva Ignitor con sistema i3S</h2>

        <p className="fs-huge txt-med-gray txt-center">Especificaciones técnicas</p>

        <Tab panes={panes} />

        <Segment className="white-segment">
          <Slider className="margin-bottom" {...settings}>

            {sliderImages}

          </Slider>
        </Segment>
        <div className="txt-center" attached="bottom">

          {fromHome ?
            <Button size="large" secondary> Volver </Button> : <Button size="large" primary> Volver </Button>
          }
        </div>

      </div>
    );
  }
}

export default HankSpecs;
