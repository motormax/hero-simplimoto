import React, { Component } from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Segment, Grid, Icon } from 'semantic-ui-react';
import { moneyFormatter } from './DashboardPage/CheckoutSummary';

import availableColors from './motorcycles/availableColors';
import CreditCardPayment from './CreditCardPayment';
import { PERSONAL_INSURANCE } from './InsurancePage/constants';

class PurchaseSummary extends Component {
  static defaultProps = {
    delivery: {},
    insuranceChoice: {},
    lead: {},
  };

  static propTypes = {
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
    delivery: propTypes.shape({
      id: propTypes.number.isRequired,
    }),
    insuranceChoice: propTypes.shape({
      selected: propTypes.bool.isRequired,
    }),
    customization: propTypes.shape({
      id: propTypes.number.isRequired,
    }).isRequired,
    accessories: propTypes.shape({
      selectedAccessories: propTypes.any.isRequired,
      totalPrice: propTypes.number.isRequired,
    }).isRequired,
    chosenAccessories: propTypes.arrayOf(propTypes.shape({
      id: propTypes.number,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      logoUrl: propTypes.string.isRequired,
    })),
  };

  deliveryTitle = () => {
    const { delivery } = this.props;

    if (delivery.pickup_location !== null) {
      return 'Retiro en concesionario';
    }
    return 'Llegando al domicilio';
  }

  deliveryFree = () => {
    const { delivery } = this.props;

    if (delivery.pickup_location !== null) {
      return '';
    }
    return '¡gratis!';
  }

  addressText = () => {
    const { delivery } = this.props;

    if (delivery.address) {
      return (delivery.address.street);
    }
    if (delivery.pickup_location !== null) {
      return (`Concesionario ${delivery.pickup_location}`);
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
      lead, accessories, insuranceChoice, chosenAccessories,
    } = this.props;

    const insuranceOptOut = insuranceChoice.optInOrOut === PERSONAL_INSURANCE;

    let insuranceSection;
    if (insuranceOptOut) {
      insuranceSection = (
        <Grid verticalAlign="middle">
          <Grid.Column width={2}>
            <Icon className="txt-dark-gray" size="large" name="unlock alternate" />
          </Grid.Column>
          <Grid.Column width={14}>
            <div className="fs-large txt-dark-gray">
              Decidiste asegurar tu moto por tu cuenta
            </div>
          </Grid.Column>
        </Grid>
      );
    } else {
      insuranceSection = (
        <Grid verticalAlign="middle">
          <Grid.Column width={2}>
            <img width="100%" src={insuranceChoice.quoteBrokerLogoUrl} alt="un seguro" />
          </Grid.Column>
          <Grid.Column width={9}>
            <h3 className="fw-bold fs-big">{insuranceChoice.quoteBrokerName} - {insuranceChoice.quotePolicy}</h3>
            <div className="fs-large fs-medium txt-dark-gray">
              <span className="fw-bold">$ {moneyFormatter.format(insuranceChoice.quotePrice)}</span> por mes
            </div>
          </Grid.Column>
        </Grid>
      );
    }

    if (!this.props.lead.id) {
      return <div>Cargando</div>;
    }

    let accesoriesSegment;

    const anyAccesoriesSelected = !_.isEmpty(chosenAccessories);

    if (anyAccesoriesSelected) {
      accesoriesSegment = (
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
                <span className="fw-normal">$</span>{moneyFormatter.format(accessories.totalPrice)}
              </span>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column width={2} />
            <Grid.Column className="details-container" width={9}>
              { chosenAccessories.map(accessory =>
                <img src={accessory.logoUrl} alt={accessory.name} />) }
            </Grid.Column>
          </Grid>
        </Segment>
      );
    } else {
      accesoriesSegment = (
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={2}>
              <Icon className="txt-dark-gray" size="large" name="arrow right" />
            </Grid.Column>
            <Grid.Column width={9}>
              <h3 className="fw-bold fs-big">Sin accesorios</h3>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }
    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">Estás comprando una ...</h2>

        <Card className="page-column-card page-column-card_slim">
          <Segment className="bike-container" attached>
            <img src={this.motorcycleImage()} alt={lead.motorcycle.name} />
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
                  <span className="fw-normal">$ </span>
                  {moneyFormatter.format(lead.motorcycle.price)}
                </span>
              </Grid.Column>
            </Grid>
          </Segment>

          {accesoriesSegment}


          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">Patentamiento</h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="fw-bold fs-large fs-medium txt-dark-gray"><span className="fw-normal">$ </span>3.800</span>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={2}>
                <Icon className="txt-dark-gray" size="large" name="arrow right" />
              </Grid.Column>
              <Grid.Column width={9}>
                <h3 className="fw-bold fs-big">{this.deliveryTitle()}</h3>
              </Grid.Column>
              <Grid.Column width={5}>
                <span className="txt-green fs-large fw-bold uppercase">{this.deliveryFree()}</span>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={2} />
              <Grid.Column className="details-container" width={9}>
                <p className="txt-dark-gray">
                  <Icon name="home" />
                  {this.addressText()}
                </p>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment className="white-segment" attached>
            {insuranceSection}
          </Segment>

          <CreditCardPayment />

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
  insuranceChoice: store.main.insuranceChoice,
  plateRegistration: store.main.plateRegistrationData,
  customization: store.main.customization,
  accessories: store.main.accessories,
  chosenAccessories: store.main.accessories.chosenAccessories,
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSummary);
