import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Icon, List, Divider, Image, Segment } from 'semantic-ui-react';
import axios from 'axios';

// import bankImage from './../images/banks-logos/icbc-logo.png';
import availableMotorcycles from '../motorcycles/availableMotorcycles';
import { registrationPrice } from './Sections/PlateRegistrationSection';
import { startedFetchingInsuranceChoice, insuranceChoiceFetched } from '../../actions/insuranceChoices';

const moneyFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 0,
});


class CheckoutSummary extends Component {
  static propTypes = {
    fetchInsuranceChoice: propTypes.func.isRequired,
    changeToSelectInsurance: propTypes.func.isRequired,
    insuranceBroker: propTypes.string,
    insurancePrice: propTypes.string,
    insurancePolicy: propTypes.string,
    insuranceBrokerLogo: propTypes.string,
    insuranceSelected: propTypes.bool,
    insuranceOptOut: propTypes.bool,
    accessoriesPrice: propTypes.number.isRequired,
    insuranceChoice: propTypes.shape({
      quote_price: propTypes.number,
      quote_policy: propTypes.string,
      quote_more_info: propTypes.string,
      quote_broker_name: propTypes.string,
      quote_broker_logo_url: propTypes.string,
      opt_in_or_out: propTypes.string,
    }).isRequired,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
  };
  static defaultProps = {
    insuranceBroker: '',
    insurancePrice: '',
    insurancePolicy: '',
    insuranceBrokerLogo: '',
    insuranceSelected: false,
    insuranceOptOut: false,
  };

  componentDidMount() {
    if (!this.props.insuranceChoice) {
      this.props.fetchInsuranceChoice(this.props.lead.id);
    }
  }

  render() {
    let {
      insurancePrice, insurancePolicy, insuranceBrokerLogo,
      insuranceBroker, insuranceSelected, insuranceOptOut,
    } = this.props;

    const {
      motorcycle, changeToSelectInsurance, accessoriesPrice,
    } = this.props;

    if (this.props.insuranceChoice && this.props.insuranceChoice.opt_in_or_out === 'heroInsurance') {
      insuranceBroker = this.props.insuranceChoice.quote_broker_name;
      insurancePrice = this.props.insuranceChoice.quote_price;
      insurancePolicy = this.props.insuranceChoice.quote_policy;
      insuranceBrokerLogo = this.props.insuranceChoice.quote_broker_logo_url;
      insuranceSelected = true;
      insuranceOptOut = false;
    } else if (this.props.insuranceChoice && this.props.insuranceChoice.opt_in_or_out === 'personalInsurance') {
      insuranceSelected = true;
      insuranceOptOut = true;
    }

    const bikeDisplayName = availableMotorcycles[motorcycle.name].displayName;
    const bikePrice = motorcycle.price;
    // const bankName = 'ICBC';

    const totalPrice = bikePrice + registrationPrice + accessoriesPrice;

    let insuranceSection;
    if (insuranceSelected) {
      const insuranceItems = [];
      if (insuranceOptOut) {
        insuranceItems.push(<List.Content>Voy a contratar mi propio seguro</List.Content>);
      } else {
        insuranceItems.push(<Image className="bike-image" src={insuranceBrokerLogo} />);
        insuranceItems.push(<List.Content>{insuranceBroker}<div className="fw-normal">{insurancePolicy}</div></List.Content>);
        insuranceItems.push(<List.Content><span className="fs-big">${insurancePrice}</span>/mes</List.Content>);
      }
      const insuranceSelection = insuranceItems.map(item => (
        <List.Item>
          {item}
        </List.Item>));

      insuranceSection = (
        <div className="txt-center">
          <List className="summary-list" horizontal fluid>
            {insuranceSelection}
          </List>
          <Button
            className="btn-outline"
            secondary
            onClick={() => changeToSelectInsurance()}
          >Cambiar
          </Button>
          <div className="margin-top-tinny txt-med-gray txt-center">{insurancePolicy ? 'Al momento de concretar la compra te pediremos más datos para completar el seguro de tu moto' : ''}</div>
        </div>
      );
    } else {
      insuranceSection = (
        <List className="summary-list">
          <List.Item className="summary-list-btn-container">
            <Icon name="arrow right" />
            <List.Content>Seguro</List.Content>
            <Button
              className="btn-outline"
              fluid
              secondary
              onClick={() => changeToSelectInsurance()}
            >Elegir seguro
            </Button>
          </List.Item>
        </List>
      );
    }
    return (
      <div className="checkoutSummary">
        <Card fluid>
          <h3 className="summary-title">Resumen de tu moto</h3>

          <Card.Content>
            <List className="summary-list" verticalAlign="middle">
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>{moneyFormatter.format(bikePrice)}</span>
                </List.Content>
                <List.Content>{bikeDisplayName}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡gratis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Personalización</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>{moneyFormatter.format(accessoriesPrice)}</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Accesorios</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>{moneyFormatter.format(registrationPrice)}</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Patentamiento online</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡gratis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Entrega a domicilio</List.Content>
              </List.Item>
            </List>

            <Divider />

            <List className="summary-list">
              <List.Item>
                <Icon name="arrow right" />
                <List.Content>Financiación</List.Content>
              </List.Item>
            </List>

            <div>
              <p className="final-price">AR$
                <span className="final-price-number">{moneyFormatter.format(totalPrice)}</span>
              </p>
            </div>
            {/*
            <div className="finnancial-bank">
              <img src={bankImage} alt={bankName} />
              <div className="right-column txt-dark-gray">
                <p className="fw-bold fs-small">Préstamo {bankName}</p>
                <p className="fs-tinny">85 cuotas de AR$ {moneyFormatter.format(totalPrice / 85)}
                </p>
                <p className="fs-large">CFT: 48.12%</p>
              </div>
            </div>
            */}

          </Card.Content>

          <Segment className="bg-backgroung_gray" attached>
            {insuranceSection}
          </Segment>

          <Card.Content className="btn-displaced-container txt-center">
            <Button className="btn-displaced" size="huge" primary disabled>Preparar la compra
            </Button>
          </Card.Content>
        </Card>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInsuranceChoice: async (leadId) => {
    dispatch(startedFetchingInsuranceChoice());
    const { data: { data: insuranceChoice } } = await axios.get(`/api/leads/${leadId}/insurance`);
    dispatch(insuranceChoiceFetched(insuranceChoice));
  },
  changeToSelectInsurance: () => {
    dispatch(push('/insurance'));
  },
});

const mapStateToProps = state => ({
  user: state.main.user,
  accessoriesPrice: state.main.accessories.totalPrice,
  insuranceBroker: state.main.insurance.broker,
  insurancePrice: state.main.insurance.price,
  insurancePolicy: state.main.insurance.policy,
  insuranceBrokerLogo: state.main.insurance.brokerLogo,
  insuranceSelected: state.main.insurance.selected,
  insuranceOptOut: state.main.insurance.optOut,
});

export default translate('checkout')(connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary));
export { moneyFormatter };
