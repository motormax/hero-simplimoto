import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { moneyFormatter } from './DashboardPage/CheckoutSummary';

import availableAccessories from './motorcycles/availableAccessories';
import availableColors from './motorcycles/availableColors';

class PurchaseSummary extends Component {
  static defaultProps = {
    delivery: {},
    insurance: {},
    lead: {},
  };

  static propTypes = {
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
    delivery: propTypes.shape({
      id: propTypes.number.isRequired,
    }),
    insurance: propTypes.shape({
      selected: propTypes.bool.isRequired,
    }),
    customization: propTypes.shape({
      id: propTypes.number.isRequired,
    }).isRequired,
    accessories: propTypes.shape({
      selectedAccessories: propTypes.any.isRequired,
      totalPrice: propTypes.number.isRequired,
    }).isRequired,
  };


  addressText = () => {
    const { delivery } = this.props;

    if (delivery.address) {
      return (
        <p className="txt-dark-gray">
          <Icon name="home" />
          {delivery.address.street}
        </p>
      );
    }
    if (delivery.pickup_location !== null) {
      return (
        <p className="txt-dark-gray">
          <Icon name="home" />
          Venís a buscar la moto al concesionario {delivery.pickup_location}.
        </p>
      );
    }

    // This should never happen since at this point the lead must have picked a delivery method
    return undefined;
  };

  motorcycleImage = () => {
    const { lead, customization } = this.props;

    return availableColors[lead.motorcycle.name][customization.color].bikeImageURL;
  };

  render() {
    const {
      lead, accessories, insurance,
    } = this.props;

    if (!this.props.lead.id) {
      return <div>Cargando</div>;
    }

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">Estás comprando una ...</h2>

        <Card className="page-column-card page-column-card_slim">
          <Segment className="bike-container" attached>
            <img src={this.motorcycleImage()} alt="Hunk negra" />
          </Segment>
          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">{lead.motorcycle.name} </h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="fw-bold fs-large fs-medium txt-dark-gray">
                  <span className="fw-normal">AR$ </span>
                  {moneyFormatter.format(lead.motorcycle.price)}
                </span>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Con accesorios: </h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="fw-bold fs-large fs-medium txt-dark-gray">
                  <span className="fw-normal">AR$ </span>
                  {moneyFormatter.format(accessories.totalPrice)}
                </span>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={2} />
              <Grid.Column className="details-container" width={9}>
                {Object.keys(accessories.selectedAccessories).map(accesoryName =>
                  accessories.selectedAccessories[accesoryName] &&
                  <img src={availableAccessories[accesoryName].imgUrl} alt={accesoryName} />)}
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Patentamiento</h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="fw-bold fs-large fs-medium txt-dark-gray">
                  <span className="fw-normal">AR$ </span>
                  {moneyFormatter.format(3800)}
                </span>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={2}>
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
              <Grid.Column width={2} />
              <Grid.Column className="details-container" width={9}>
                {this.addressText()}
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment className="white-segment" attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={2}>
                <img width="100%" src={insurance.brokerLogo} alt="un seguro" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">{insurance.broker} - {insurance.policy}</h3>
                <div className="fs-large fs-medium txt-dark-gray">
                  {'AR$ '}
                  <span className="fw-bold">{moneyFormatter.format(insurance.price)}</span> por mes
                </div>
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
              <Grid.Column className="details-container" width={5}>
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
  }
}

const mapDispatchToProps = undefined;

const mapStateToProps = store => ({
  lead: store.main.lead,
  financing: store.main.financing,
  delivery: store.main.delivery,
  insurance: store.main.insurance,
  plateRegistration: store.main.plateRegistrationData,
  customization: store.main.customization,
  accessories: store.main.accessories,
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSummary);
