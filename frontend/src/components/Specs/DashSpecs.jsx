import React, { Component } from 'react';
import { Tab, Table, Segment, Button } from 'semantic-ui-react';
import Slider from 'react-slick';

const bikeImages = [
  'http://www.heromotos.com.ar/medios/files/images/dash/dash 3 cuartos frente.jpg',
  'http://www.heromotos.com.ar/medios/files/images/dash/dash perfil.jpg',
  'http://www.heromotos.com.ar/medios/files/images/dash/dash atras.jpg',
  'http://www.heromotos.com.ar/medios/files/images/dash/dash frente.jpg',
  'http://www.heromotos.com.ar/medios/files/images/dash/Dash Tail Light.jpg',
  'http://www.heromotos.com.ar/medios/files/images/dash/Dash Seat.jpg',
  'http://www.heromotos.com.ar/medios/files/images/dash/Dash Console.jpg',
  'http://www.heromotos.com.ar/medios/files/images/dash/Dash Engine.jpg',
];

const bikeInfo = [
  {
    paneItems: [
      { itemTitle: 'Motor Tipo', description: 'Refrigeracion por aire, 4-tiempos' },
      { itemTitle: 'Desplazamiento', description: '110.9 cc' },
      { itemTitle: 'Potencia Max.	', description: '6.2 kW @ 8000 RPM' },
      { itemTitle: 'Torque Max.	', description: '8.30 Nm @ 6500 RPM' },
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
];

const panes = bikeInfo.map(pane => ({
  menuItem: pane.paneTitle,
  render: () =>
    (<Tab.Pane>
      <Table basic="very">
        <Table.Body>
          {
            pane.paneItems.map(paneItem => (<Table.Row>
              <Table.Cell><span className="fw-bold">{paneItem.itemTitle}</span></Table.Cell>
              <Table.Cell>{paneItem.description}</Table.Cell>
                                            </Table.Row>))
          }
        </Table.Body>
      </Table>
     </Tab.Pane>),
}));

const sliderImages = bikeImages.map(url => (<div>
  <img src={url} className="carrousel-default-images" alt="Foto de Dash" />
                                            </div>));

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
        {fromHome ? <Button className="btn-sticky" size="massive" primary> Comprar una Dash </Button> : '' }
        <h2 className="txt-center fs-massive">Dash</h2>

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
