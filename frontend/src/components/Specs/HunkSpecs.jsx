import React, { Component } from 'react';
import { Tab, Card, Table, Segment, Button } from 'semantic-ui-react'
import Slider from 'react-slick';


import motoImgUrl from '../images/bikes/hunk-3-4-black.png';

const bikeImages = [
  "http://www.heromotos.com.ar/medios/files/images/hunk/hunk frente.jpg",
  "http://www.heromotos.com.ar/medios/files/images/hunk/hunk 3 cuartos atras.jpg",
  "http://www.heromotos.com.ar/medios/files/images/hunk/Hunk Derecha.jpg",
  "http://www.heromotos.com.ar/medios/files/images/hunk/Hunk IB CB Red Rev Side.jpg",
  "http://www.heromotos.com.ar/medios/files/images/hunk/Hunk IB CB Red Console.jpg",
  "http://www.heromotos.com.ar/medios/files/images/hunk/Hunk IB CB Red Back.jpg"
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
  {paneItems: [
      {itemTitle:'Tamaño Rin Delantero', description:'18 x 1.85, de aleacion' },
      {itemTitle:'Tamaño Rin Trasero', description:'18 x 2.15, de aleacion' },
      {itemTitle:'Tamaño llanta Delantera', description:'80/100 x 18 - 47 P, Tubeless Tyres' },
      {itemTitle:'Tamaño llanta Trasera', description:'110/90 x 18 - 61 P, Tubeless' },
    ],
    paneTitle: 'Ruedas'
  },
  {paneItems: [
      {itemTitle:'Batería', description:'12 V - 4 Ah, MF Bateria' },
      {itemTitle:'Lámpara/Luz delantera', description:'12 V - 35W/35W - Halogen Bulb Trapeziodal MFR' },
      {itemTitle:'Lámpara/Luz Trasera o de Freno', description:'12 V - 0.5 W / 4.1 W (LED Lamps)' },
      {itemTitle:'Luz de Cruce', description:'12V - 10 W (Amber Bulb) x 4 nos. (Multi - Reflector- Clear Lens)' },
    ],
    paneTitle: 'Eléctrico'
  },
  {paneItems: [
      {itemTitle:'Largo', description:'2080 mm' },
      {itemTitle:'Ancho', description:'765 mm' },
      {itemTitle:'Alto', description:'1095 mm' },
      {itemTitle:'Base de la Rueda', description:'1325 mm' },
      {itemTitle:'Distancia del Suelo', description:'163 mm' },
      {itemTitle:'Peso (seco)', description:'130kg' },
      {itemTitle:'Carga máxima', description:'145 kg (Brakes - FR/RR--> Disc / Drum) 147 Kg (Brakes - FR/RR - Disc / Drum)' },
    ],
    paneTitle: 'Dimensiones'
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

const sliderImages = bikeImages.map(url => {
  return <div>
      <img src={url} className="carrousel-default-images"/>
    </div>
})


class HankSpecs extends Component {
  render(){

    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
    };

    return(
      <div className="page-column-card no-border">
          <h2 className="txt-center fs-massive">Nueva HUNK con sistema i3S</h2>

          <p className="fs-huge txt-med-gray txt-center">Especificaciones técnicas</p>

          <Tab panes={panes} />

          <Segment className="white-segment">
            <Slider className="margin-bottom" {...settings}>

               {sliderImages}

            </Slider>
          </Segment>
          <div className="txt-center" attached="bottom">
            <Button size="big" primary>Volver al dashboard</Button>
          </div>

      </div>
    );
  }
}

export default HankSpecs;
