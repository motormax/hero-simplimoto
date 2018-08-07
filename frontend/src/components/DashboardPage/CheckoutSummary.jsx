import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Divider, Icon, Image, List } from 'semantic-ui-react';

// import bankImage from './../images/banks-logos/icbc-logo.png';
import availableMotorcycles from '../motorcycles/availableMotorcycles';
import { registrationPrice } from './Sections/PlateRegistrationSection';

const moneyFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 0,
});


class CheckoutSummary extends Component {
  static propTypes = {
    changeToSelectInsurance: propTypes.func.isRequired,
    insuranceBroker: propTypes.string,
    insurancePrice: propTypes.string,
    insurancePolicy: propTypes.string,
    insuranceBrokerLogo: propTypes.string,
    insuranceSelected: propTypes.bool,
    insuranceOptOut: propTypes.bool,
    accessoriesPrice: propTypes.number.isRequired,
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

  render() {
    const {
      motorcycle, insurancePrice, insurancePolicy, insuranceBrokerLogo,
      insuranceBroker, changeToSelectInsurance, insuranceSelected, insuranceOptOut,
      accessoriesPrice,
    } = this.props;
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
        insuranceItems.push(<List.Content><Image
          className="bike-image"
          src={insuranceBrokerLogo}
        />
          {insuranceBroker} </List.Content>);
        insuranceItems.push(<List.Content>{insurancePolicy}</List.Content>);
        insuranceItems.push(<List.Content>${insurancePrice}/mes</List.Content>);
      }
      const insuranceSelection = insuranceItems.map(item => (
        <List.Item className="summary-list-btn-container">
          <Icon name="arrow right" />
          {item}
        </List.Item>));

      insuranceSection = (
        <List className="summary-list">
          {insuranceSelection}
          <List.Item className="summary-list-btn-container">
            <Button
              className="btn-outline"
              fluid
              secondary
              onClick={() => changeToSelectInsurance()}
            >Cambiar
            </Button>
          </List.Item>
        </List>
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
        </Card>

        <Card fluid>
          <Card.Content className="btn-displaced-container">
            {insuranceSection}
            <Button className="btn-displaced" size="huge" primary disabled>Preparar la compra
            </Button>
          </Card.Content>
        </Card>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
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
