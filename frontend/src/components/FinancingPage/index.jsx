/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Card, Form, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import MercadoPagoFinancingForm from './MercadoPagoFinancingForm';
import CredicuotasFinancingForm from './CredicuotasFinancingForm';
import BankTransferForm from './BankTransferForm';
import SoonAvailableForm from './SoonAvailableForm';

import afluentaImg from '../images/afluenta.png';
import heroFinancialImg from '../images/hero-financial-logo.png';
import PurchaseCalculator from '../calculator';


export const MERCADO_PAGO_PAYMENT_METHOD = 'mercadoPago';
export const TRANSFERENCIA_PAYMENT_METHOD = 'bankTransfer';
export const CREDICUOTAS_PAYMENT_METHOD = 'credicuotas';
export const AFLUENTA_PAYMENT_METHOD = 'afluenta';
export const HERO_FINANCIAL_PAYMENT_METHOD = 'heroFinancial';
export const BITCOIN_PAYMENT_METHOD = 'bitcoin';
export const RENTAL_PAYMENT_METHOD = 'rental';
export const LEASING_PAYMENT_METHOD = 'leasing';
export const DEBIN_PAYMENT_METHOD = 'debin';

const TOTAL_FINANCING = 'TOTAL_FINANCING';
const PARTIAL_FINANCING = 'PARTIAL_FINANCING';

// XXXX: Preguntar por el wording, así como está, la opcion de pago por transferencia
// se accede despues de seleccionar "Quiero financiar mi moto totalmente", wrong
const financingOptions = [
  {
    key: TOTAL_FINANCING,
    text: 'Quiero financiar mi moto totalmente',
    value: TOTAL_FINANCING,
  },
  {
    key: PARTIAL_FINANCING,
    text: 'Quiero pagar parte de la moto en efectivo',
    value: PARTIAL_FINANCING,
  },
];

class FinancingPage extends Component {
  static propTypes = {
    paymentMethod: propTypes.string,
    motorcyclePrice: propTypes.number.isRequired,
    accessoriesPrice: propTypes.number.isRequired,
    plateRegistrationData: propTypes.shape({
      plateRegistrationType: propTypes.shape({
        price: propTypes.string,
      }),
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: this.props.paymentMethod,
      financing: TOTAL_FINANCING,
      cashAmount: 0,
    };
  }

  classNameFor = paymentMethod => classNames('financing-option', { selected: paymentMethod === this.state.paymentMethod });

  choosingPaymentOption = (paymentMethod, clearCashAmount = true) => {
    if (clearCashAmount) {
      this.setState({ cashAmount: 0 });
    }
    this.setState({ paymentMethod });
  };

  handleFinancingChange = (e, { value }) => {
    this.setState({ financing: value });
  };

  formForPaymentMethod = () => {
    switch (this.state.paymentMethod) {
      case MERCADO_PAGO_PAYMENT_METHOD:
        return <MercadoPagoFinancingForm cashAmount={this.state.cashAmount} />;
      case TRANSFERENCIA_PAYMENT_METHOD:
        return <BankTransferForm />;
      case CREDICUOTAS_PAYMENT_METHOD:
        return <CredicuotasFinancingForm cashAmount={this.state.cashAmount} />;
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
        return <SoonAvailableForm comingSoonText="Próximamente podrás ver las ofertas de distintos bancos para elegir cómo financiar tu moto." />;
      default:
        return false;
    }
  };

  financingMethods() {
    if (this.state.financing === PARTIAL_FINANCING) {
      return (
        <div className="page-column-card margin-bottom">
          <Card.Group centered>
            <Card
              link
              className={this.classNameFor(MERCADO_PAGO_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(MERCADO_PAGO_PAYMENT_METHOD, false)}
            >
              <img
                src="https://www.mercadopago.com/org-img/Manual/ManualMP/imgs/isologoHorizontal.png"
                alt="Mercadopago"
              />
            </Card>
            <Card

              className={this.classNameFor(CREDICUOTAS_PAYMENT_METHOD)}
              onClick={() => this.choosingPaymentOption(CREDICUOTAS_PAYMENT_METHOD, false)}
            >
              <img src="https://www.prestamosfrescos.com/ar/assets/design/Credicuotas-logo.png" alt="Credicuotas" />

            </Card>
          </Card.Group>
        </div>
      );
    }
    return (
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
    );
  }

  handleCashAmountChange = (e) => {
    this.setState({ cashAmount: Math.min(e.target.value || 0, this.totalAmount()) });
  };

  handleFinancedAmountChange = (e) => {
    this.setState({ cashAmount: Math.max(this.totalAmount() - (e.target.value || 0), 0) });
  };

  isPlateRegistrationDataValid = () =>
    this.props.plateRegistrationData && this.props.plateRegistrationData.plateRegistrationType;

  plateRegistrationPrice = () =>
    (this.isPlateRegistrationDataValid() ?
      parseFloat(this.props.plateRegistrationData.plateRegistrationType.price) : 0.0);

  calculator = () => {
    const { motorcyclePrice, accessoriesPrice } = this.props;
    return new PurchaseCalculator(motorcyclePrice, accessoriesPrice, this.plateRegistrationPrice());
  };

  totalAmount = () => this.calculator().totalAmount();

  render() {
    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">¿Cómo querés financiarte?</h2>

        <div className="margin-bottom">
          <Card className="page-column-card">
            <Card.Content>
              <Form.Select
                fluid
                options={financingOptions}
                value={this.state.financing}
                onChange={this.handleFinancingChange}
                className="fs-big"
              />
            </Card.Content>
          </Card>
        </div>

        {
          this.state.financing === PARTIAL_FINANCING &&
          (
            <div className="page-column-card margin-bottom">
              <p className="fs-huge txt-med-gray txt-center">Cuanto vas a pagar en efectivo?</p>
              <Card.Group className="page-column-card margin-bottom" centered>
                <Card>
                  <input
                    type="range"
                    min="1"
                    max={this.totalAmount()}
                    value={this.state.cashAmount}
                    onChange={this.handleCashAmountChange}
                  />
                </Card>
              </Card.Group>
              <Card.Group centered>
                <div>
                  <p className="fs-big txt-med-gray txt-center">Dinero en efectivo</p>
                  <input
                    type="text"
                    value={this.state.cashAmount}
                    onChange={this.handleCashAmountChange}
                  />
                </div>
                <div>
                  <p className="fs-big txt-med-gray txt-center">|     |</p>
                </div>
                <div>
                  <p className="fs-big txt-med-gray txt-center">Valor financiado</p>
                  <input
                    type="text"
                    value={this.totalAmount() - this.state.cashAmount}
                    onChange={this.handleFinancedAmountChange}
                  />
                </div>
              </Card.Group>
            </div>
          )
        }

        <p className="fs-huge txt-med-gray txt-center">Elegí el metodo de financiación más conveniente.</p>

        {this.financingMethods()}

        {this.formForPaymentMethod()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  motorcyclePrice: state.main.lead.motorcycle.price,
  accessoriesPrice: state.main.accessories.totalPrice,
  plateRegistrationData: state.main.plateRegistration.plateRegistrationData,
  paymentMethod: (() => {
    const provider = state.main.financing.financingForm
      && state.main.financing.financingForm.provider;
    if (provider === 'MERCADOPAGO') {
      return MERCADO_PAGO_PAYMENT_METHOD;
    } else if (provider === 'CREDICUOTAS') {
      return CREDICUOTAS_PAYMENT_METHOD;
    }
    return null;
  })(),
});

export default translate('financing')(connect(mapStateToProps)(FinancingPage));
