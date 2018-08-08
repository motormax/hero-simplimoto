import React, { Component } from 'react';
import propTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { deliveryFetched, startedFetchingDelivery } from '../../../actions/deliveryChoices';

class DeliverySection extends Component {
  static propTypes = {
    fetchDelivery: propTypes.func.isRequired,
    changeToDelivery: propTypes.func.isRequired,
    lead: propTypes.shape({ id: propTypes.number.isRequired }).isRequired,
    delivery: propTypes.shape({ id: propTypes.number.isRequired }).isRequired,
  };

  componentDidMount() {
    if (!this.props.delivery.id) {
      this.props.fetchDelivery(this.props.lead.id);
    }
  }

  displayLegend() {
    const { delivery } = this.props;
    if (delivery.address != null) { // llevenme la moto a mi casa
      return (
        <p className="txt-med-gray fs-medium">
          Te la llevamos a {delivery.address.street}.
        </p>
      );
    }

    if (delivery.pickup_location != null) { // voy al concesionario
      return (
        <p className="txt-med-gray fs-medium">
          Venís a buscar la moto al concesionario {delivery.pickup_location}.
        </p>
      );
    }

    return (
      <p className="txt-med-gray fs-medium">
       Decinos dónde querés recibir la moto <span className="fw-bold">¡y te la llevamos sin cargo!</span>
      </p>
    );
  }

  render() {
    const { delivery } = this.props;
    const isOk = true;
    const color = isOk ? 'darkgray' : 'red';

    if (delivery.isLoading) {
      return <div>Cargando</div>;
    }

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: delivery.id ? '#21ba45' : color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              {delivery.id ? <Icon size="large" color="green" name="check" /> : <Icon size="large" color={color} name="arrow right" />}

            </Grid.Column>
            <Grid.Column width={9}>
              <h3 className="fw-bold fs-big">
                ¿Cómo queres recibirla? <span className="fw-bold uppercase txt-green fs-tinny" > ¡gratis! </span>
              </h3>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button className="btn-outline" fluid secondary onClick={() => this.props.changeToDelivery()}>Ingresar
                drección del envío
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={12}>
              {this.displayLegend()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  lead: state.main.lead,
  delivery: state.main.delivery,
});

const mapDispatchToProps = dispatch => ({
  fetchDelivery: async (leadId) => {
    dispatch(startedFetchingDelivery());
    const { data: { data: deliveryChoice } } = await axios.get(`/api/leads/${leadId}/delivery_choice`);
    dispatch(deliveryFetched(deliveryChoice || {}));
  },
  changeToDelivery: () => {
    dispatch(push('/delivery'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliverySection);
