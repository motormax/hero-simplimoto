import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Icon, List, Divider, Image, Segment } from 'semantic-ui-react';

import bankImage from './../images/banks-logos/icbc-logo.png';
import availableMotorcycles from '../motorcycles/availableMotorcycles';

const moneyFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 0,
});


class CheckoutSummary extends Component {
  static propTypes = {
    changeToSelectInsurance: propTypes.func.isRequired,
    broker: propTypes.string,
    price: propTypes.string,
    policy: propTypes.string,
    brokerLogo: propTypes.string,
    insuranceSelected: propTypes.bool,
    insuranceOptOut: propTypes.bool,
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
  };
  static defaultProps = {
    broker: '',
    price: '',
    policy: '',
    brokerLogo: '',
    insuranceSelected: false,
    insuranceOptOut: false,
  };

  render() {
    const { motorcycle } = this.props;
    const bikeDisplayName = availableMotorcycles[motorcycle.name].displayName;
    const bikePrice = motorcycle.price;
    const bankName = 'ICBC';

    let insuranceSection;
    if (this.props.insuranceSelected) {
      const insuranceItems = [];
      if (this.props.insuranceOptOut) {
        insuranceItems.push(<List.Content>Voy a contratar mi propio seguro</List.Content>);
      } else {
        insuranceItems.push(<Image className="bike-image" src={this.props.brokerLogo} />);
        insuranceItems.push(<List.Content>{this.props.broker}<div className="fw-normal">{this.props.policy}</div></List.Content>);
        insuranceItems.push(<List.Content><span className="fs-big">${this.props.price}</span>/mes</List.Content>);
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
          <Button className="btn-outline" secondary onClick={() => this.props.changeToSelectInsurance()}>Cambiar</Button>
          <div className="margin-top-tinny txt-med-gray txt-center">{this.props.policy ? 'Al momento de concretar la compra te pediremos más datos para completar el seguro de tu moto' : ''}</div>
        </div>
      );
    } else {
      insuranceSection = (
        <List className="summary-list">
          <List.Item className="summary-list-btn-container">
            <Icon name="arrow right" />
            <List.Content>Seguro</List.Content>
            <Button className="btn-outline" fluid secondary onClick={() => this.props.changeToSelectInsurance()}>Elegir seguro</Button>
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
                  <span>{moneyFormatter.format(1200)}</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Accesorios</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>{moneyFormatter.format(1200)}</span>
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
              <p className="final-price">AR$<span className="final-price-number">{moneyFormatter.format(10000)}</span>/ month </p>
            </div>

            <div className="finnancial-bank">
              <img src={bankImage} alt={bankName} />
              <div className="right-column txt-dark-gray">
                <p className="fw-bold fs-small">Préstamo {bankName}</p>
                <p className="fs-tinny">85 cuotas de AR$ {moneyFormatter.format(1300)}-</p>
                <p className="fs-large">CFT: 48.12%</p>
              </div>
            </div>

          </Card.Content>

          <Segment className="bg-backgroung_gray" attached>
            {insuranceSection}
          </Segment>

          <Card.Content className="btn-displaced-container txt-center">
            <Button className="btn-displaced" size="huge" primary disabled>Preparar la compra</Button>
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
  broker: state.main.insurance.broker,
  price: state.main.insurance.price,
  policy: state.main.insurance.policy,
  brokerLogo: state.main.insurance.brokerLogo,
  insuranceSelected: state.main.insurance.selected,
  insuranceOptOut: state.main.insurance.optOut,
});

export default translate('checkout')(connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary));
