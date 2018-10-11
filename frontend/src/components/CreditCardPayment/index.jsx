/* eslint-env browser */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Form, Message, Label, Popup, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import MaskedInput from 'react-text-mask';

import { cancelPurchase } from '../../actions/beginning';

import { loadSDK, getPaymentMethod } from '../FinancingPage/mercadoPagoHelper';

import FinancingInfo from '../DashboardPage/Sections/FinancingInfo';
import { gatewayErrorCodes, gatewayDefaultErrorCodes } from './gatewayErrors';

class CreditCardPayment extends Component {
  static propTypes = {
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
    lead: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
    changeFinancing: propTypes.func.isRequired,
    backToDashboard: propTypes.func.isRequired,
    createPurchaseOrder: propTypes.func.isRequired,
    financingSelected: propTypes.bool.isRequired,
    financingForm: propTypes.shape({
      message: propTypes.string.isRequired,
      costs: propTypes.string.isRequired,
      monthlyAmount: propTypes.number.isRequired,
      issuerLogo: propTypes.string.isRequired,
      issuerName: propTypes.string.isRequired,
      paymentMethodName: propTypes.string.isRequired,
      paymentMethodLogo: propTypes.string.isRequired,
      paymentMethodId: propTypes.string.isRequired,
      issuerId: propTypes.string.isRequired,
      installments: propTypes.number.isRequired,
    }).isRequired,
    accessoriesPrice: propTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      docTypes: [],
      paymentMethod: {
        cardNumber: '',
        email: '',
        securityCode: '',
        cardExpirationMonth: '',
        cardExpirationYear: '',
        cardholderName: '',
        docType: '',
        docNumber: '',
        paymentMethodId: '',
      },
      binMatchFinance: false,
      submitInProgress: false,
      errors: {
        cardNumber: false,
        securityCode: false,
        email: false,
        cardExpirationMonth: false,
        cardExpirationYear: false,
        cardholderName: false,
        docType: false,
        docNumber: false,
        description: '',
      },
    };
  }

  componentDidMount() {
    loadSDK(this.handleSDKLoaded);
  }

  setPaymentMethodInfo = (status, response) => {
    if (status === 200) {
      console.log(response); // eslint-disable-line no-console
      const newData = this.state.paymentMethod;
      newData.paymentMethodId = response[0].id;
      this.setState({ paymentMethod: newData });
      const binMatchFinance = newData.paymentMethodId === this.props.financingForm.paymentMethodId;
      this.setState({ binMatchFinance });
    }
  };

  identificationTypesCallback = (status, response) => {
    if (status === 200) {
      const docTypes = response.map(docType => ({
        key: docType.id,
        text: docType.name,
        value: docType.id,
      }));
      this.setState({ docTypes });
    }
  };

  handleCreditCardNumberDataChange = (event) => {
    const creditCardNumber = this.handleFormDataChange(event);
    getPaymentMethod(creditCardNumber, this.setPaymentMethodInfo);
  };

  handleSDKLoaded = () => {
    window.Mercadopago.getIdentificationTypes(this.identificationTypesCallback);
  };

  handleFormSelectDataChange = (e, { value }) => {
    const newData = this.state.paymentMethod;
    newData.docType = value;
    this.setState({ paymentMethod: newData });
  };

  handleFormDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state.paymentMethod;
    newData[inputName] = value;
    this.setState({ paymentMethod: newData });
    return value;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitInProgress: true });

    window.Mercadopago.createToken(this.state.paymentMethod, this.sdkResponseHandler);
    return false;
  };

  sdkResponseHandler = async (status, response) => {
    if (status !== 200 && status !== 201) {
      this.setState({ submitInProgress: false });
      this.handleGatewayError(status, response);
    } else {
      try {
        const creditCardToken = response.id;
        console.log(`Token! ${creditCardToken}`); // eslint-disable-line no-console
        console.log(response); // eslint-disable-line no-console
        await this.props.createPurchaseOrder(
          this.props.lead.id, creditCardToken,
          this.state.paymentMethod.email,
        );
      } catch (error) {
        this.setState({ submitInProgress: false });
        if (error.response.data.user_message) {
          const newErrors = this.state.errors;
          newErrors.description = `${error.response.data.user_message}\n`;
          this.setState({ errors: newErrors });
        } else {
          throw error;
        }
      }
    }
  };

  handleGatewayError = (status, response) => {
    window.Mercadopago.clearSession();
    response.cause.forEach((errorCause) => {
      const errorObj = gatewayErrorCodes.find(error => error.code === errorCause.code) ||
        gatewayDefaultErrorCodes;
      const newErrors = this.state.errors;
      newErrors[errorObj.field] = true;
      newErrors.description = `${errorObj.message}\n`;
      this.setState({ errors: newErrors });
    });
  };

  canConfirm = () => !!(
    this.state.binMatchFinance && !this.submitInProgress()
  );

  submitInProgress = () => !!(
    this.state.submitInProgress
  );

  render() {
    const cvvLabel = (
      <span>CVV&nbsp;
        <Popup trigger={<span><Icon className="info circle" /></span>}>
          <Popup.Header>Código de seguridad</Popup.Header>
          <Popup.Content>
                  El <b>CVV</b> en su tarjeta de crédito o débito es un número de
                  3 o 4 dígitos que se encuentra
                  en el reverso de su tarjeta. <br />
                  En su tarjeta de crédito o débito de marca American Express®,
                  es un código numérico de 4 dígitos
                  que se encuentra en el frente.
          </Popup.Content>
        </Popup>
      </span>
    );
    const error = Object.values(this.state.errors)
      .some(Boolean);

    let creditCardInputs;
    if (this.state.binMatchFinance) {
      creditCardInputs = (
        <div>
          <Form.Group>
            <Form.Input
              fluid
              required
              label={cvvLabel}
              type="text"
              data-checkout="securityCode"
              name="securityCode"
              placeholder="123"
              width={4}
              value={this.state.paymentMethod.securityCode}
              error={this.state.errors.securityCode}
              onChange={this.handleFormDataChange}
            />

            <Form.Input
              fluid
              required
              label="Mes de vencimiento"
              width={6}
            >
              <MaskedInput
                type="text"
                length="2"
                data-checkout="cardExpirationMonth"
                name="cardExpirationMonth"
                value={this.state.paymentMethod.cardExpirationMonth}
                error={this.state.errors.cardExpirationMonth}
                onChange={this.handleFormDataChange}
                mask={[/\d/, /\d/]}
                placeholder="12"
              />
            </Form.Input>
            <Form.Input
              fluid
              required
              label="Año de vencimiento"
              width={6}
            >
              <MaskedInput
                type="text"
                length="4"
                data-checkout="cardExpirationYear"
                name="cardExpirationYear"
                placeholder="2018"
                value={this.state.paymentMethod.cardExpirationYear}
                error={this.state.errors.cardExpirationYear}
                onChange={this.handleFormDataChange}
                mask={[/\d/, /\d/, /\d/, /\d/]}
              />
            </Form.Input>
          </Form.Group>
          <Form.Input
            fluid
            required
            label="Nombre completo como figura en la tarjeta"
            type="text"
            data-checkout="cardholderName"
            name="cardholderName"
            placeholder="Juan Perez"
            value={this.state.paymentMethod.cardholderName}
            error={this.state.errors.cardholderName}
            onChange={this.handleFormDataChange}
          />
          <Form.Select
            fluid
            required
            options={this.state.docTypes}
            label="Tipo de documento"
            type="text"
            data-checkout="docType"
            name="docType"
            value={this.state.paymentMethod.docType}
            error={this.state.errors.docType}
            onChange={this.handleFormSelectDataChange}
          />
          <Form.Input
            fluid
            required
            label="Nro de documento"
            type="text"
            data-checkout="docNumber"
            name="docNumber"
            placeholder="5123456"
            value={this.state.paymentMethod.docNumber}
            error={this.state.errors.docNumber}
            onChange={this.handleFormDataChange}
          />
        </div>
      );
    }
    let cardNumberErrorMessage;
    if (!this.state.binMatchFinance && !!this.state.paymentMethod.paymentMethodId) {
      cardNumberErrorMessage = (
        <Label basic color="red" pointing key="red">
        La tarjeta ingresada no coincide con el financiamiento seleccionado.
        Por favor ingrese una nueva tarjeta o cambie el método de pago.
        </Label>
      );
    }
    return (
      <div>
        <Form id="pay" onSubmit={this.handleSubmit} error={error} ref={this.paymentMethodForm}>
          <Segment attached>
            <FinancingInfo
              financingSelected={this.props.financingSelected}
              financingForm={this.props.financingForm}
              accessoriesPrice={this.props.accessoriesPrice}
              motorcycle={this.props.motorcycle}
            />

            <div className="txt-center margin-top-tinny">
              <Button
                size="small"
                className="btn-outline"
                secondary
                onClick={() => {
                  this.props.changeFinancing();
                }}
              >
                  Cambiar método de pago
              </Button>
            </div>

          </Segment>

          <Segment attached>

            <Form.Input
              fluid
              required
              label="Email"
              type="email"
              name="email"
              placeholder="user@example.com"
              value={this.state.paymentMethod.email}
              error={this.state.errors.email}
              onChange={this.handleFormDataChange}
            />
            <Form.Input
              fluid
              required
              label="Número de tarjeta"
            >
              <MaskedInput
                type="text"
                placeholder="4509 9535 6623 3704"
                name="cardNumber"
                data-checkout="cardNumber"
                value={this.state.paymentMethod.cardNumber}
                error={this.state.errors.cardNumber}
                onChange={this.handleCreditCardNumberDataChange}
                mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
              />
            </Form.Input>
            <div className="txt-center">
              <a href="https://www.mercadopago.com.ar/ayuda/costos-financiacion_621" target="_blanck">
                <Icon.Group size="large">
                  <Icon className="shield alternate" />
                  <Icon corner className="check circle" />
                </Icon.Group>
              Tu compra esta protegida por <strong>mercadopago</strong>
              </a>
            </div>

            {cardNumberErrorMessage}

            {creditCardInputs}

            <input
              type="hidden"
              name="paymentMethodId"
              data-checkout="paymentMethodId"
              value={this.state.paymentMethod.paymentMethodId}
            />

            <Message
              error
              header="Lo sentimos hubo un error al procesar la solicitud"
              content={this.state.errors.description}
            />
          </Segment>
          <Segment attached className="txt-center">
            <Button
              type="submit"
              size="big"
              disabled={!this.canConfirm()}
              primary
              loading={this.submitInProgress()}
            >Comprar
            </Button>
            <Button
              size="large"
              secondary
              onClick={() => {
                  this.props.backToDashboard();
                }}
            >Volver
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeFinancing: () => {
    dispatch(push('/financing'));
  },
  backToDashboard: async () => {
    dispatch(push('/dashboard'));
  },
  createPurchaseOrder: async (leadId, creditCardToken, email) => {
    const response = await axios.post(
      `/api/leads/${leadId}/purcharse_order`,
      {
        credit_card_token: creditCardToken,
        email,
      },
    );
    console.log(response); // eslint-disable-line no-console
    dispatch(cancelPurchase());
    dispatch(push('/success'));
  },
});

const mapStateToProps = state => ({
  lead: state.main.lead,
  motorcycle: state.main.lead.motorcycle,
  accessoriesPrice: state.main.accessories.totalPrice,
  financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
});

export default translate('financing')(connect(mapStateToProps, mapDispatchToProps)(CreditCardPayment));
