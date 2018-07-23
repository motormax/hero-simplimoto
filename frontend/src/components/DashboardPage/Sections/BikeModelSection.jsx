import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';


class BikeModelSection extends Component {
  static propTypes = {
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { motorcycle } = this.props;

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: '#21ba45' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color="green" name="check" />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">Modelo de moto ({motorcycle.name})</h3>
              <p className="txt-med-gray fs-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc pulvinar tristique nisi et posuere
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button className="btn-outline" fluid secondary>Cambiar</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default BikeModelSection;
