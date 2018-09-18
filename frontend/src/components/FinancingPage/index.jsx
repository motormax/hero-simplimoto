/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import MercadoPagoFinancingForm from './MercadoPagoFinancingForm';

export const MERCADO_PAGO_PAYMENT_METHOD = 'mercadoPago';
export const TRANSFERENCIA_PAYMENT_METHOD = 'bankTransfer';
export const CREDICUOTAS_PAYMENT_METHOD = 'credicuotas';

class FinancingPage extends Component {
  static propTypes = {
    paymentMethod: propTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: this.props.paymentMethod,
    };
  }

  classNameFor = paymentMethod => classNames('financing-option', { selected: paymentMethod === this.state.paymentMethod });

  choosingPaymentOption = (paymentMethod) => {
    this.setState({ paymentMethod });
  };

  formForPaymentMethod = () => {
    switch (this.state.paymentMethod) {
      case MERCADO_PAGO_PAYMENT_METHOD:
        return <MercadoPagoFinancingForm />;
      case TRANSFERENCIA_PAYMENT_METHOD:
        return false;
      case CREDICUOTAS_PAYMENT_METHOD:
        return false;
      case null:
        return false;
      default:
        return false;
    }
  };

  render() {
    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">¿Como queres financiarte?</h2>
        <p className="fs-huge txt-med-gray txt-center">Elegí el metodo de financiación más conveniente.</p>
        <div className="page-column-card margin-bottom">
          <Card.Group centered>
            <Card
              link
              className={this.classNameFor(MERCADO_PAGO_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(MERCADO_PAGO_PAYMENT_METHOD)}
            >
              <img
                src="https://www.mercadopago.com/org-img/Manual/ManualMP/imgs/isologoHorizontal.png"
                alt="Mercadopago"
              />
            </Card>
            <Card
              link
              className={this.classNameFor(TRANSFERENCIA_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(TRANSFERENCIA_PAYMENT_METHOD)}
            >
              <div>
                <Icon.Group size="huge">
                  <Icon name="comment" />
                  <Icon inverted color="white" size="tiny" name="dollar sign" />
                </Icon.Group>
                <span className="fs-big fw-bold">Transferencia Bancaria</span>
              </div>
            </Card>
            <Card
              link
              className={this.classNameFor(CREDICUOTAS_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(CREDICUOTAS_PAYMENT_METHOD)}
            >
              <img src="https://www.prestamosfrescos.com/ar/assets/design/Credicuotas-logo.png" alt="Credicuotas" />
            </Card>
          </Card.Group>
        </div>
        {this.formForPaymentMethod()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentMethod: state.main.financing.financingSelected ? MERCADO_PAGO_PAYMENT_METHOD : null,
});

export default translate('financing')(connect(mapStateToProps)(FinancingPage));
