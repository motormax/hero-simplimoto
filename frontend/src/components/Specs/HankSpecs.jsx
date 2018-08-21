import React, { Component } from 'react';
import { Tab, Card, Table } from 'semantic-ui-react'
import Slider from 'react-slick';


import motoImgUrl from '../images/bikes/hunk-3-4-black.png';


const motoImg2 = 'http://www.heromotos.com.ar/medios/files/images/hunk/hunk frente.jpg';
const motoImg3 = 'http://www.heromotos.com.ar/medios/files/images/hunk/hunk 3 cuartos atras.jpg';
const motoImg4 = 'http://www.heromotos.com.ar/medios/files/images/hunk/Hunk Derecha.jpg';

const bikeImages = [
  'http://www.heromotos.com.ar/medios/files/images/hunk/hunk frente.jpg',
  'http://www.heromotos.com.ar/medios/files/images/hunk/hunk 3 cuartos atras.jpg',
  'http://www.heromotos.com.ar/medios/files/images/hunk/Hunk Derecha.jpg',
]

const bikeInfo = [
  {paneItems: [
      {itemTitle:'Motor Tipo', description:'Refrigeracion por aire, 4 tiempos 1 cilindro' },
      {itemTitle:'Desplazamiento', description:'124.7 cc' },
      {itemTitle:'Potencia Max.	', description:'6.72 KW (9.1 Ps) @ 7000 rpm' },
      {itemTitle:'Torque Max.	', description:'13.50 Nm @ 7000 rpm' },
      {itemTitle:'Diámetro x Carrera', description:'57.3 x 57.8 mm' },
      {itemTitle:'Carburador', description:'Carburador con control variable de ignicion' },
      {itemTitle:'Relación de Compresión', description:'10 : 1' },
      {itemTitle:'Arranque', description:'Automatico' },
      {itemTitle:'Encendido', description:'AMI - Advanced Microprocessor Ignition System' },
    ],
    paneTitle: 'Motor'
  },
  {paneItems: [
      {itemTitle:'Embrague', description:'Multidisco' },
      {itemTitle:'Caja de Cambios', description:'5 velocidades' },
      {itemTitle:'Chasis', description:'Tubular Diamond Type' },
    ],
    paneTitle: 'Transmisión'
  },
  {paneItems: [
      {itemTitle:'Delantera', description:'Telescopica Hidraulica' },
      {itemTitle:'Trasera', description:'Swing arm con 5 pasos adjustables con deposito de gas' },
    ],
    paneTitle: 'Suspensión'
  },
  {paneItems: [
      {itemTitle:'Freno Delantero', description:'Disco - Diametro 240 mm' },
      {itemTitle:'Freno Trasero', description:'Campana - 130 mm' },
    ],
    paneTitle: 'Frenos'
  },
]

const panes = bikeInfo.map(pane => {
  return {
    menuItem: pane.paneTitle,
    render: () =>
      <Tab.Pane>
        <Table basic='very'>
          <Table.Body>
          {
            pane.paneItems.map(paneItem => {
              return <Table.Row>
                  <Table.Cell><span className="fw-bold">{paneItem.itemTitle}</span></Table.Cell>
                  <Table.Cell>{paneItem.description}</Table.Cell>
              </Table.Row>
            })
          }
        </Table.Body>
      </Table>
    </Tab.Pane>
  }
})


class HankSpecs extends Component {
  render(){

    const settings = {
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
    };

    const slider = <Slider {...settings}>
      <div>
        <img src={motoImg4} width="100%"/>
      </div>
      <div>
        <img src={motoImg2} width="100%"/>
      </div>
      <div>
        <img src={motoImg3} width="100%"/>
      </div>
    </Slider>;

    return(
      <div className="page-column-card no-border">
          <h2 className="txt-center fs-massive">Hank</h2>

          {slider}

          <p className="fs-huge txt-med-gray txt-center">Especificaciones técnicas</p>

          <Tab menu={{ color:"red", inverted: true, attached:"top" }} panes={panes} />

      </div>
    );
  }
}

export default HankSpecs;
