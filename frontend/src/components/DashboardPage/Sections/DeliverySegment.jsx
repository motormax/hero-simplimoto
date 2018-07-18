import React, { Component } from 'react';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';


class DeliverySegment extends Component {
  render() {
    const isOk = true;
    const color = isOk ? 'darkgray' : 'red';

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color={color} name="arrow right" />
            </Grid.Column>
            <Grid.Column width={8}>
              <h3 className="fw-bold fs-big">Entrega a domicilio <span className="fw-bold uppercase txt-green fs-tinny">¡grátis!</span></h3>
            </Grid.Column>
            <Grid.Column width={7}>
              <Button className="btn-outline" fluid secondary onClick={() => this.props.changeToDelivery()} >Ingresar drección del envio</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={12}>
              <p className="txt-med-gray fs-medium">Decinos dónde querés recibir la moto <span className="fw-bold">¡y te la llevamos sin cargo!</span></p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default DeliverySegment;
