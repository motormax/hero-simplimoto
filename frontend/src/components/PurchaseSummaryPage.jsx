import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Segment, Grid, Icon } from 'semantic-ui-react';
import { moneyFormatter } from './DashboardPage/CheckoutSummary';

import availableAccessories from './motorcycles/availableAccessories';
import availableColors from './motorcycles/availableColors';
import CreditCardPayment from './CreditCardPayment';

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
  };

  addressText = () => {
    const { delivery } = this.props;

    if (delivery.address) {
      return (
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
              <p className="txt-dark-gray">
                <Icon name="home" />
                {delivery.address.street}
              </p>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }
    if (delivery.pickup_location !== null) {
      return (
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={2}>
              <Icon className="txt-dark-gray" size="large" name="arrow right" />
            </Grid.Column>
            <Grid.Column width={9}>
              <h3 className="fw-bold fs-big">Se entrega en: </h3>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column width={2} />
            <Grid.Column className="details-container" width={9}>
              <p className="txt-dark-gray">
                Concesionario {delivery.pickup_location}.
              </p>
            </Grid.Column>
          </Grid>
        </Segment>
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
      lead, accessories, insuranceChoice,
    } = this.props;

    if (!this.props.lead.id) {
      return <div>Cargando</div>;
    }


    const hasInsuranceChoice = Object.values(insuranceChoice).some(hasInsuranceChoice => hasInsuranceChoice);

    const hasAccessories = Object.values(accessories.selectedAccessories).some(hasAccessory => hasAccessory);

    const AccessoryPage = <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={2}>
            <Icon className="txt-dark-gray" size="large" name="arrow right" />
          </Grid.Column>
          <Grid.Column width={9}>
            <h3 className="fw-bold fs-big">Con accesorios: </h3>
          </Grid.Column>
          <Grid.Column width={5}>
            <span className="fw-bold fs-large fs-medium txt-dark-gray"><span className="fw-normal">$ </span>{accessories.totalPrice}</span>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={2} />
          <Grid.Column className="details-container" width={9}>
            { Object.keys(accessories.selectedAccessories).map(accesoryName =>
              accessories.selectedAccessories[accesoryName] &&
                <img src={availableAccessories[accesoryName].imgUrl} alt={accesoryName} />)}
          </Grid.Column>
        </Grid>
      </Segment>;

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
                <span className="fw-bold fs-large fs-medium txt-dark-gray"><span className="fw-normal">$ </span>{lead.motorcycle.price}</span>
              </Grid.Column>
            </Grid>
          </Segment>

          {hasAccessories ? AccessoryPage : null}

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

          {this.addressText()}

          <Segment className="white-segment" attached>
              {
                hasInsuranceChoice ?
                <Grid verticalAlign="middle">
                  <Grid.Column width={2}>
                    <img width="100%" src={insuranceChoice.quoteBrokerLogoUrl} alt="un seguro" />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <h3 className="fw-bold fs-big">{insuranceChoice.quoteBrokerName} - {insuranceChoice.quotePolicy}</h3>
                    <div className="fs-large fs-medium txt-dark-gray">
                    {'AR$ '}
                    <span className="fw-bold">{moneyFormatter.format(insuranceChoice.quotePrice)}</span> por mes
                    </div>
                  </Grid.Column>
                </Grid> :
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
              }
          </Segment>

          <Segment className="btn-displaced-container" attached>
            <CreditCardPayment />
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
  insuranceChoice: store.main.insuranceChoice,
  plateRegistration: store.main.plateRegistrationData,
  customization: store.main.customization,
  accessories: store.main.accessories,
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSummary);
