import React, { Component } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';

class TradeInSection extends Component {
  render() {
    return (
      <Segment className="dashboard-card" inverted>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" name="arrow right" />
            </Grid.Column>
            <Grid.Column width={9}>
              <h3 className="fw-bold fs-big">
                Vender tu moto en Hero
              </h3>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button fluid primary>
                Quiero vender mi moto
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={15}>
              <div>Cargá los datos de tu moto y te ayudamos a venderla</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default TradeInSection;
