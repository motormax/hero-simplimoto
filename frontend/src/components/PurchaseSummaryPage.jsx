import React, { Component } from 'react';
import { Card, Image, Segment, Grid, Header, Icon, Button } from 'semantic-ui-react';

import motoImgUrl from './images/bikes/hunk-3-4-black.png';

import glovesImgUrl from './images/Guantes.png';
import helmetImgUrl from './images/Casco.png';
import trunkImgUrl from './images/Baul.png';

class PurchaseSummary extends Component {
  render(){
    return(
      <div>
        <h2 className="fs-massive fw-bold txt-center">Estás comprando una ...</h2>

        <Card className="page-column-card page-column-card_slim">
          <Segment className="bike-container" attached>
            <img src={motoImgUrl} alt="Hunk negra"/>
          </Segment>
          <Segment attached>
            <Grid verticalAlign='middle'>
              <Grid.Column  width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Hunk </h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="fw-bold fs-large fs-medium txt-dark-gray"><span className="fw-normal">AR$ </span>22.000</span>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached>
            <Grid verticalAlign='middle'>
              <Grid.Column width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Con accesorios: </h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="fw-bold fs-large fs-medium txt-dark-gray"><span className="fw-normal">AR$ </span>1.200</span>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column className="details-container" width={9}>
                <img src={glovesImgUrl} alt="Guantes"/>
                <img src={helmetImgUrl} alt="Casco"/>
                <img src={trunkImgUrl} alt="Baúl"/>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached>
            <Grid verticalAlign='middle'>
              <Grid.Column  width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Patentamiento Online</h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="fw-bold fs-large fs-medium txt-dark-gray"><span className="fw-normal">AR$ </span>3.800</span>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached>
            <Grid verticalAlign='middle'>
              <Grid.Column  width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Llegando al domicilio </h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="txt-green fs-large fw-bold uppercase">¡gratis!</span>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column className="details-container" width={9}>
                <p className="txt-dark-gray">
                  <Icon name="home" />
                  Mi dirección 1234 - Mi barrio
                </p>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment className="white-segment" attached>
            <Grid verticalAlign="middle">
              <Grid.Column  width={2}>
                <img width="100%" src="https://elenabeser.com/wp-content/uploads/2015/06/lock@2x.png" alt="un seguro"/>
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Seguro Pepito - Un plan</h3>
                <div className="fs-large fs-medium txt-dark-gray">AR$ <span className="fw-bold"> 900 </span> por mes</div>
                <div className="fs-small">Te protegemos contra todo lo que te imagines</div>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment className="btn-displaced-container" attached>

            <p className="fs-huge txt-center">AR$ <span className="fs-big fw-bold">20.450</span>/ mes </p>

            <Grid verticalAlign="middle">
              <Grid.Column className="details-container" width={11}>
                <div className="txt-dark-gray">
                Elegiste pagar con MercadoPago
                </div>
              </Grid.Column>
              <Grid.Column className="details-container"  width={5}>
                <Button size="small" className="btn-outline" secondary>Cambiar</Button>
              </Grid.Column>
            </Grid>
            <div className="txt-center">
              <Button className="btn-displaced" size="massive" primary>Comprar</Button>
            </div>
          </Segment>

        </Card>
      </div>
    );
  };
}

export default PurchaseSummary;
