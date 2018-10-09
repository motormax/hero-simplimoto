/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import humps from 'humps';
import { translate } from 'react-i18next';
import { Button, Form, Card, Radio, Label, Segment, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import { loadSDK, getInstallments, filterInstallmentLabels } from './mercadoPagoHelper';
import { financingSelected } from '../../actions/financingChoices';
import PurchaseCalculator from '../calculator';

class MercadoPagoFinancingForm extends Component {
  static propTypes = {
    motorcyclePrice: propTypes.number.isRequired,
    accessoriesPrice: propTypes.number.isRequired,
    selectFinancing: propTypes.func.isRequired,
    cancelFinancing: propTypes.func.isRequired,
    financingSelected: propTypes.bool.isRequired,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    financingForm: propTypes.shape({
      paymentMethodId: propTypes.string.isRequired,
      issuerId: propTypes.string,
      message: propTypes.string.isRequired,
      costs: propTypes.string.isRequired,
      installments: propTypes.number,
      monthlyAmount: propTypes.number.isRequired,
    }).isRequired,

    plateRegistrationData: propTypes.shape({
      plateRegistrationType: propTypes.shape({
        price: propTypes.string,
      }),
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentMethodOptions: [],
      issuerOptions: [],
      installmentOptions: [],
      financingForm: Object.assign({}, props.financingForm),
      errors: {
        paymentMethodId: false,
      },
    };
  }

  componentDidMount() {
    loadSDK(this.handleSDKLoaded);
  }

  calculator = () => {
    const { motorcyclePrice, accessoriesPrice } = this.props;
    return new PurchaseCalculator(motorcyclePrice, accessoriesPrice, this.plateRegistrationPrice());
  };

  handleSDKLoaded = () => {
    window.Mercadopago.getAllPaymentMethods((status, response) => {
      this.fetchPaymentMethodsCallback(status, response);
      if (this.props.financingSelected) {
        window.Mercadopago.getIssuers(
          this.state.financingForm.paymentMethodId,
          this.fetchIssuerCallback,
        );
        getInstallments(
          this.state.financingForm.paymentMethodId,
          this.state.financingForm.issuerId,
          this.calculator().totalAmount(),
          this.fetchInstallmentsCallback,
        );
      }
    });
  };

  handleSdkError = (callbackName, status, response) => {
    console.log(`Failed ${callbackName}`); // eslint-disable-line no-console
    console.log(status); // eslint-disable-line no-console
    console.log(response); // eslint-disable-line no-console
    toast.error("Lo sentimos! Se produjo un error, por favor reintente nuevamente en unos segundos", {
      position: toast.POSITION.TOP_RIGHT
    });
    throw new Error(`Error [${status}] in call ${callbackName}`);
  };

  fetchPaymentMethodsCallback = (status, response) => {
    if (status === 200) {
      const paymentMethods = response.filter(method => method.payment_type_id === 'credit_card').map(method => ({
        key: method.id,
        text: method.name,
        value: method.id,
        image: { avatar: false, src: method.secure_thumbnail },
      }));
      this.setState({ paymentMethodOptions: paymentMethods });
    } else {
      this.handleSdkError('fetchPaymentMethodsCallback', status, response);
    }
  };

  fetchIssuerCallback = (status, response) => {
    if (status === 200) {
      const issuers = response.map(issuer => ({
        key: issuer.id,
        text: issuer.name,
        value: issuer.id,
        image: { avatar: false, src: issuer.secure_thumbnail },
      }));
      this.setState({ issuerOptions: issuers });
      if (issuers.length === 0) {
        getInstallments(
          this.state.financingForm.paymentMethodId,
          this.state.financingForm.issuerId,
          this.calculator().totalAmount(),
          this.fetchInstallmentsCallback,
        );
      }
    } else {
      this.handleSdkError('fetchIssuerCallback', status, response);
    }
  };

  fetchInstallmentsCallback = (status, response) => {
    if (status === 200) {
      const installments = [];
      response.forEach((installment) => {
        installment.payer_costs.forEach((costs) => {
          installments.push({
            message: costs.recommended_message,
            installments: costs.installments,
            label: filterInstallmentLabels(costs.labels),
            monthlyAmount: costs.installment_amount,
          });
        });
      });
      this.setState({ installmentOptions: installments });
    } else {
      this.handleSdkError('fetchInstallmentCallback', status, response);
    }
  };

  clearStateObjWhenIssuerChanged = financingForm => ({
    installmentOptions: [],
    financingForm: {
      ...financingForm,
      message: null,
      costs: null,
      installments: null,
      monthlyAmount: null,
    },
  });

  clearStateObjWhenPaymentChanged = (financingForm) => {
    const newState = this.clearStateObjWhenIssuerChanged(financingForm);
    return {
      ...newState,
      issuerOptions: [],
      financingForm: {
        ...newState.financingForm,
        issuerId: null,
        issuerLogo: null,
        issuerName: null,
      },
    };
  };

  handlePaymentMethodChange = (e, { value }) => {
    const newState = this.clearStateObjWhenPaymentChanged(this.state.financingForm);

    const newFinancingForm = newState.financingForm;
    newFinancingForm.paymentMethodId = value;

    const paymentMethodOption = this.state.paymentMethodOptions.find(o => o.value === value);
    newFinancingForm.paymentMethodName = paymentMethodOption.text;
    newFinancingForm.paymentMethodLogo = paymentMethodOption.image.src;
    this.setState(newState);

    window.Mercadopago.getIssuers(value, this.fetchIssuerCallback);
  };

  handleIssuerChange = (e, { value }) => {
    const newState = this.clearStateObjWhenIssuerChanged(this.state.financingForm);
    const newFinancingForm = newState.financingForm;
    newFinancingForm.issuerId = value;
    const issuerdOption = this.state.issuerOptions.find(o => o.value === value);
    newFinancingForm.issuerName = issuerdOption.text;
    newFinancingForm.issuerLogo = issuerdOption.image.src;
    this.setState(newState);

    window.Mercadopago.getInstallments(
      {
        issuer_id: value,
        amount: this.calculator().totalAmount(),
        payment_method_id: this.state.financingForm.paymentMethodId,
      },
      this.fetchInstallmentsCallback,
    );
  };

  disableContinueButton = () => !this.state.financingForm.installments;

  handleInstallmentSelected = (e, installment) => {
    const newData = this.state.financingForm;
    newData.installments = installment.installments;
    newData.message = installment.message;
    newData.costs = installment.label;
    newData.monthlyAmount = installment.monthlyAmount;
    this.setState({ financingForm: newData });
  };

  isPlateRegistrationDataValid = () =>
    this.props.plateRegistrationData && this.props.plateRegistrationData.plateRegistrationType;

  plateRegistrationPrice = () =>
    (this.isPlateRegistrationDataValid() ?
      parseFloat(this.props.plateRegistrationData.plateRegistrationType.price) : 0.0);

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    let installmentList;
    if (this.state.installmentOptions.length > 0) {
      const installmentItems =
        this.state.installmentOptions.map(installment => (
          <Form.Field>
            <Radio
              label={installment.message}
              name="installment_id"
              checked={this.state.financingForm.installments === installment.installments}
              onChange={e => this.handleInstallmentSelected(e, installment)}
            /><Label size="small">{installment.label}</Label>
          </Form.Field>
        ));

      installmentList = (
        <Segment attached>
          <p className="txt-dark-gray fw-bold fs-huge">¿En cuantas cuotas?</p>
          <div className="txt-center">
            <span className="dp-inline-block txt-left">
              {installmentItems}
            </span>
          </div>
        </Segment>
      );
    }

    let issuerDropdown;
    if (this.state.issuerOptions.length > 0) {
      issuerDropdown = (
        <Segment className="not-border-bottom" attached>
          <p className="txt-dark-gray fw-bold fs-huge">¿De que banco es tu tarjeta?</p>
          <Form.Field>
            <Form.Select
              fluid
              search
              className="text-and-images-select"
              placeholder="Elegí el banco emisor"
              options={this.state.issuerOptions}
              name="issuer_id"
              value={this.state.financingForm.issuerId}
              onChange={this.handleIssuerChange}
            />
          </Form.Field>
        </Segment>
      );
    }

    const creditCardList =
      this.state.paymentMethodOptions.map((creditCardItem) => {
        const activeBtn = classNames(
          'square-btn',
          this.state.financingForm.paymentMethodId === creditCardItem.value ? 'active' : ' ',
        );
        const activeTxt = classNames(
          'txt-center fs-small',
          this.state.financingForm.paymentMethodId === creditCardItem.value ? 'txt-green' : ' ',
        );
        return (
          <label className="square-item" key={creditCardItem.value}>
            <Radio
              style={{ display: 'none' }}
              name="creditCardList"
              value={creditCardItem.value}
              checked={this.state.financingForm.paymentMethodId === creditCardItem.value}
              onChange={this.handlePaymentMethodChange}
            />
            <div className={activeBtn}>
              <img src={creditCardItem.image.src} alt="" />
            </div>
            <p className={activeTxt}>{creditCardItem.text}</p>
          </label>
        );
      });
    const creditCardOptions = (
      <Segment className="not-border-bottom" attached>
        <p className="txt-dark-gray fw-bold fs-huge">Elegí tu tarjeta de credito</p>
        <Form.Field className="square-btn-container">
          {creditCardList}
        </Form.Field>
      </Segment>
    );

    return (
      <Card className="page-column-card financing-page">
        <Form onSubmit={this.handleSubmit} error={error}>
          {/*
            Reemplazar con pagar por transferencia
              <Form.Field>
              <Form.Select
                fluid
                search
                placeholder="Elegí tu tarjeta de crédito"
                options={this.state.paymentMethodOptions}
                name="payment_method_id"
                value={this.state.financingForm.paymentMethodId}
                onChange={this.handlePaymentMethodChange}
                className="fs-big"
              />
            </Form.Field> */}

          {creditCardOptions}
          {issuerDropdown}
          {installmentList}

          <Segment attached className="txt-center">
            <a href="https://www.mercadopago.com.ar/cuotas" target="_blanck">
              <Icon.Group size="large">
                <Icon name="shield alternate" />
                <Icon corner name="check circle" />
              </Icon.Group>
              Estamos financiando tu compra a través de <strong>mercadopago</strong>
            </a>
          </Segment>

          <Segment attached="bottom" className="txt-center">
            <Button
              size="large"
              primary
              disabled={this.disableContinueButton()}
              onClick={() => {
                this.props.selectFinancing(this.props.lead.id, this.state.financingForm);
              }}
            >Continuar
            </Button>
            <Button
              size="large"
              secondary
              onClick={() => {
                this.props.cancelFinancing();
              }}
            >Volver
            </Button>
          </Segment>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
  motorcyclePrice: state.main.lead.motorcycle.price,
  lead: state.main.lead,
  accessoriesPrice: state.main.accessories.totalPrice,
  plateRegistrationData: state.main.plateRegistration.plateRegistrationData,
});

const mapDispatchToProps = dispatch => ({
  selectFinancing: async (leadId, financingForm) => {
    await axios.post(
      `/api/leads/${leadId}/financing_data`,
      {
        financing_data: humps.decamelizeKeys(financingForm),
      },
    );
    dispatch(financingSelected(financingForm));
    dispatch(push('/dashboard'));
  },
  cancelFinancing: async () => {
    dispatch(push('/dashboard'));
  },
});

export default translate('financing')(connect(mapStateToProps, mapDispatchToProps)(MercadoPagoFinancingForm));
