/* eslint-env browser */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';

import { loadSDK, getPaymentMethod } from '../FinancingPage/mercadoPagoHelper';

import FinancingInfo from '../DashboardPage/Sections/FinancingInfo';
import gatewayErrorCodes from './gatewayErrors';

class CreditCardPayment extends Component {
  static propTypes = {
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
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
      creditCardToken: '',
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
      console.log(response);
      const newData = this.state.paymentMethod;
      newData.paymentMethodId = response[0].id;
      this.setState({ paymentMethod: newData });
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

    window.Mercadopago.createToken(this.state.paymentMethod, this.sdkResponseHandler);
    return false;
  };

  sdkResponseHandler = (status, response) => {
    if (status !== 200 && status !== 201) {
      this.handleGatewayError(status, response);
    } else {
      this.setState({ creditCardToken: response.id });
      console.log(`Token! ${response.id}`);
      console.log(response);
    }
  };

  handleGatewayError = (status, response) => {
    response.cause.forEach((errorCause) => {
      const errorObj = gatewayErrorCodes.find(error => error.code === errorCause.code);
      const newErrors = this.state.errors;
      newErrors[errorObj.field] = true;
      newErrors.description += `${errorObj.message}\n`;
      this.setState({ errors: newErrors });
    });
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    return (
      <div>
        <Form id="pay" onSubmit={this.handleSubmit} error={error} ref={this.paymentMethodForm}>
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
          <Form.Input
            fluid
            required
            label="Código de seguridad"
            type="text"
            data-checkout="securityCode"
            name="securityCode"
            placeholder="123"
            value={this.state.paymentMethod.securityCode}
            error={this.state.errors.securityCode}
            onChange={this.handleFormDataChange}
          />
          <Form.Input
            fluid
            required
            label="Mes de vencimiento de la tarjeta"
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
            label="Año de vencimiento de la tarjeta"
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
          <input
            type="hidden"
            name="paymentMethodId"
            data-checkout="paymentMethodId"
            value={this.state.paymentMethod.paymentMethodId}
          />

          <FinancingInfo
            financingSelected={this.props.financingSelected}
            financingForm={this.props.financingForm}
            accessoriesPrice={this.props.accessoriesPrice}
            motorcycle={this.props.motorcycle}
          />

          <Message
            error
            header="Error"
            content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.description)}
          />
          <Button type="submit" size="big" primary>Confirmar</Button>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  lead: state.main.lead,
  motorcycle: state.main.lead.motorcycle,
  accessoriesPrice: state.main.accessories.totalPrice,
  insurancePrice: state.main.insurance.price,
  financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
});

export default translate('financing')(connect(mapStateToProps)(CreditCardPayment));

