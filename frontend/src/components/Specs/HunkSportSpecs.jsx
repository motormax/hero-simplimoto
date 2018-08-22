import React, { Component } from 'react';
import { Tab, Card, Table, Segment, Button, Icon } from 'semantic-ui-react'
import Slider from 'react-slick';


const bikeImages = [
  "http://www.heromotos.com.ar/medios/files/images/hunk%20sports/hunksp-red-34t.jpeg",
  "http://www.heromotos.com.ar/medios/files/images/hunk%20sports/Hunk Sports Argentina 3-4th Front Red.jpg",
  "http://www.heromotos.com.ar/medios/files/images/hunk%20sports/Hunk Sports Argentina 3-4th Front Rev Side Red.jpg",
  "http://www.heromotos.com.ar/medios/files/images/hunk%20sports/hunksp-red-front.jpeg"
]


const bikeInfo = [
  {paneItems: [
      {itemTitle:'Motor Tipo', description:'Refrigeracion por aire, 4 tiempos 1 cilindro' },
      {itemTitle:'Desplazamiento', description:'149.2 cc' },
      {itemTitle:'Potencia Max.	', description:'11.33 kW (15.2 BHP) @ 8500 rpm' },
      {itemTitle:'Torque Max.	', description:'13.50 Nm @ 7000 rpm' },
      {itemTitle:'Diámetro x Carrera', description:'57.3 x 57.8 mm' },
      {itemTitle:'Carburador', description:'CV Type with Carburettor Controlled Variable Ignition' },
      {itemTitle:'Relación de Compresión', description:'10:01' },
    ],
    paneTitle: 'Motor'
  },
  {paneItems: [
      {itemTitle:'Clutch', description:'Multidisco' },
      {itemTitle:'Caja de Cambios', description:'5 velocidades' },
      {itemTitle:'Tipo de Bastidor', description:'Tubular Tipo diamante' },
    ],
    paneTitle: 'Transmisión y Chasis'
  },
  {paneItems: [
      {itemTitle:'Delantera', description:'Telescopica Hidraulica' },
      {itemTitle:'Trasera', description:'Swing arm con 5 pasos adjustables con deposito de gas' },
    ],
    paneTitle: 'Suspensión'
  },
  {paneItems: [
      {itemTitle:'Tamaño Rin Delantero', description:'18 x 1.85, de aleacion' },
      {itemTitle:'Tamaño Rin Trasero', description:'18 x 2.15, de aleacion' },
      {itemTitle:'Tamaño llanta Delantera', description:'80/100 x 18 - 47 P, Tubeless Tyres' },
      {itemTitle:'Tamaño llanta Trasera', description:'110/90 x 18 - 61 P, Tubeless' },
    ],
    paneTitle: 'Ruedas y Llantas'
  },
  {paneItems: [
      {itemTitle:'Batería', description:'12 V - 4 Ah, MF Bateria' },
      {itemTitle:'Lámpara/Luz delantera', description:'12 V - 35 W / 35 W - Halogen HS1 Bulb, Trapezoidal (Multi - Reflector Type)' },
      {itemTitle:'Lámpara/Luz Trasera o de Freno', description:'12 V - 10 W (Ambar) x 4 nos (MFR - Clear Lens)' },
      {itemTitle:'Luz de Cruce', description:'12 V - Twin Lamp - LED' },
      {itemTitle:'Lámpara luz trasera', description:'12 V - 1.3 W / 1.96 W (LED)' },
      {itemTitle:'Lámpara luz delantera', description:'12 V - 1.3 W / 1.96 W (LED)' },
    ],
    paneTitle: 'Eléctrico'
  },
  {paneItems: [
      {itemTitle:'Largo', description:'2100 mm' },
      {itemTitle:'Ancho', description:'780 mm' },
      {itemTitle:'Alto', description:'1080 mm' },
      {itemTitle:'Base de la Rueda', description:'1325 mm' },
      {itemTitle:'Distancia del Suelo', description:'145 mm' },
      {itemTitle:'Peso (seco)', description:'130kg' },
      {itemTitle:'Carga máxima', description:'147 Kg (frenos - FR/RR - Disc / Drum)' },
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

let fromHome = true;

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
          {fromHome ?  <Button className="btn-sticky" size="massive" primary> Comprar una Hunk </Button> : '' }
          <h2 className="txt-center fs-massive">HUNK SPORTS</h2>

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
