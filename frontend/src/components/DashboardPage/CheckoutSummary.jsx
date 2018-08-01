import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Icon, List, Divider, Image } from 'semantic-ui-react';

import bankImage from './../images/banks-logos/icbc-logo.png';

class CheckoutSummary extends Component {
  static propTypes = {
    changeToSelectInsurance: propTypes.func.isRequired,
    broker: propTypes.string,
    price: propTypes.string,
    policy: propTypes.string,
    brokerLogo: propTypes.string,
    insuranceSelected: propTypes.bool,
    insuranceOptOut: propTypes.bool,
  };
  static defaultProps = {
    broker: '',
    price: '',
    policy: '',
    brokerLogo: '',
    insuranceSelected: false,
    insuranceOptOut: false,
  }

  render() {
    const bikeName = 'Moto Piola';
    const bankName = 'ICBC';

    let insuranceSection;
    if (this.props.insuranceSelected) {
      const insuranceItems = [];
      if (this.props.insuranceOptOut) {
        insuranceItems.push(<List.Content>Voy a contratar mi propio seguro</List.Content>);
      } else {
        insuranceItems.push(<List.Content><Image className="bike-image" src={this.props.brokerLogo} /> {this.props.broker}</List.Content>);
        insuranceItems.push(<List.Content>{this.props.policy}</List.Content>);
        insuranceItems.push(<List.Content>${this.props.price}/mes</List.Content>);
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
            <Button className="btn-outline" fluid secondary onClick={() => this.props.changeToSelectInsurance()}>Cambiar</Button>
          </List.Item>
        </List>
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
          <h3 className="summary-title">Resúmen de tu Moto</h3>

          <Card.Content>
            <List className="summary-list" verticalAlign="middle">
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>30,000</span>
                </List.Content>
                <List.Content>{bikeName}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡grátis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Personalización</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>1,200</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Accesorios</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>1,200</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Patentamiento online</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡grátis!</span>
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
              <p className="final-price">AR$<span className="final-price-number">10,000</span>/ month </p>
            </div>

            <div className="finnancial-bank">
              <img src={bankImage} alt={bankName} />
              <div className="right-column txt-dark-gray">
                <p className="fw-bold fs-small">Préstamo {bankName}</p>
                <p className="fs-tinny">85 cuotas de AR$ 1,300-</p>
                <p className="fs-large">CFT: 48.12%</p>
              </div>
            </div>

          </Card.Content>
        </Card>

        <Card fluid>
          <Card.Content className="btn-displaced-container">
            {insuranceSection}
            <Button className="btn-displaced" size="huge" secondary>Preparar la Compra</Button>
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
