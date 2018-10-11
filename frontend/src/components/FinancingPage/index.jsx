/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import MercadoPagoFinancingForm from './MercadoPagoFinancingForm';
import SoonAvailableForm from './SoonAvailableForm';

import afluentaImg from '../images/afluenta.png';
import heroFinancialImg from '../images/hero-financial-logo.png';


export const MERCADO_PAGO_PAYMENT_METHOD = 'mercadoPago';
export const TRANSFERENCIA_PAYMENT_METHOD = 'bankTransfer';
export const CREDICUOTAS_PAYMENT_METHOD = 'credicuotas';
export const AFLUENTA_PAYMENT_METHOD = 'afluenta';
export const HERO_FINANCIAL_PAYMENT_METHOD = 'heroFinancial';
export const BITCOIN_PAYMENT_METHOD = 'bitcoin';
export const RENTAL_PAYMENT_METHOD = 'rental';
export const LEASING_PAYMENT_METHOD = 'leasing';
export const DEBIN_PAYMENT_METHOD = 'debin';

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
        return <SoonAvailableForm comingSoonText="Próximamente podrás pagar por medio de una transferencia bancaria." />;
      case CREDICUOTAS_PAYMENT_METHOD:
        return <SoonAvailableForm comingSoonText="Próximamente podrás financiar tu compra con CrediCuotas." />;
      case AFLUENTA_PAYMENT_METHOD:
        return <SoonAvailableForm comingSoonText="Próximamente podrás financiar tu compra con Afluenta." />;
      case HERO_FINANCIAL_PAYMENT_METHOD:
        return <SoonAvailableForm comingSoonText="Próximamente podrás financiar tu compra con Hero Financials." />;
      case BITCOIN_PAYMENT_METHOD:
        return <SoonAvailableForm comingSoonText="Próximamente podrás pagar utilizando tu billetera virtual de Bitcoins." />;
      case RENTAL_PAYMENT_METHOD:
        return <SoonAvailableForm comingSoonText="Próximamente podrás alquilar tu moto." />;
      case LEASING_PAYMENT_METHOD:
        return <SoonAvailableForm comingSoonText="Próximamente podrás obtener tu moto mediante un Leasing." />;
      case DEBIN_PAYMENT_METHOD:
        return <SoonAvailableForm comingSoonText="Próximamente podrás pagar tu compra directamente desde tu cuenta bancaria." />;
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

              className={this.classNameFor(TRANSFERENCIA_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(TRANSFERENCIA_PAYMENT_METHOD)}
            >
              <div>
                <Icon.Group size="huge">
                  <Icon name="comment" />
                  <Icon inverted size="tiny" className="dollar sign" />
                </Icon.Group>
                <span className="fs-big fw-bold">Transferencia Bancaria</span>
              </div>

            </Card>
            <Card

              className={this.classNameFor(CREDICUOTAS_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(CREDICUOTAS_PAYMENT_METHOD)}
            >
              <img src="https://www.prestamosfrescos.com/ar/assets/design/Credicuotas-logo.png" alt="Credicuotas" />

            </Card>
            <Card
              className={this.classNameFor(AFLUENTA_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(AFLUENTA_PAYMENT_METHOD)}
            >
              <img
                src={afluentaImg}
                alt="Afluenta"
              />

            </Card>
            <Card

              className={this.classNameFor(HERO_FINANCIAL_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(HERO_FINANCIAL_PAYMENT_METHOD)}
            >
              <img
                src={heroFinancialImg}
                alt="Hero Financial"
              />

            </Card>
            <Card

              className={this.classNameFor(BITCOIN_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(BITCOIN_PAYMENT_METHOD)}
            >
              <img
                src="https://en.bitcoin.it/w/images/en/c/cb/BC_Logotype.png"
                alt="bitcoin"
              />

            </Card>
            <Card

              className={this.classNameFor(RENTAL_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(RENTAL_PAYMENT_METHOD)}

            >
              <div>
                <Icon name="motorcycle" size="huge" />
                <span className="fs-big fw-bold">Alquilá tu moto</span>
              </div>

            </Card>
            <Card

              className={this.classNameFor(LEASING_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(LEASING_PAYMENT_METHOD)}

            >
              <div>
                <Icon name="motorcycle" size="huge" />
                <span className="fs-huge fw-bold">Leasing</span>
              </div>

            </Card>
            <Card

              className={this.classNameFor(DEBIN_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(DEBIN_PAYMENT_METHOD)}

            >
              <div>
                <Icon name="university" size="huge" />
                <span className="fs-large fw-bold">Buscá la oferta con tu banco</span>
              </div>
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
