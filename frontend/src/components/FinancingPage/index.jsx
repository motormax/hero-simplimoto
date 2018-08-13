import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Form, Card, Radio, Label, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';


import loadSDK from './mercadoPagoHelper';
import { financingSelected } from '../../actions/financingChoices';

class FinancingPage extends Component {
  static propTypes = {
    motorcycle: propTypes.shape({
      price: propTypes.string.isRequired,
    }).isRequired,
    selectFinancing: propTypes.func.isRequired,
    cancelFinancing: propTypes.func.isRequired,
    financingSelected: propTypes.bool.isRequired,
    financingForm: propTypes.shape({
      paymentMethodId: propTypes.string.isRequired,
      issuerId: propTypes.string.isRequired,
      message: propTypes.string.isRequired,
      costs: propTypes.string.isRequired,
      installments: propTypes.number.isRequired,
      monthlyAmount: propTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
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

  handleSDKLoaded = () => {
    window.Mercadopago.setPublishableKey('TEST-5cf66383-f185-4848-a5d1-367710c38f62');
    window.Mercadopago.getAllPaymentMethods(this.fetchPaymentMethodsCallback);
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
      if (this.props.financingSelected) {
        window.Mercadopago.getIssuers(this.state.financingForm.paymentMethodId, this.fetchIssuerCallback);
      }
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
      if (this.props.financingSelected) {
        window.Mercadopago.getInstallments(
          {
            issuer_id: this.state.financingForm.issuerId,
            amount: this.props.motorcycle.price,
            payment_method_id: this.state.financingForm.paymentMethodId,
          },
          this.fetchInstallmentsCallback,
        );
      }
    }
  };

  fetchInstallmentsCallback = (status, response) => {
    if (status === 200) {
      const installments = [];
      response.forEach((installment) => {
        installment.payer_costs.forEach((costs) => {
          const label = costs.labels.filter(l => l.startsWith('CFT')).join(' ');
          installments.push({
            message: costs.recommended_message,
            installments: costs.installments,
            label,
            monthlyAmount: costs.installment_amount,
          });
        });
      });
      if (installments.length > 0) {
        const newData = this.state.financingForm;
        const firstInstallment = installments[0];
        newData.message = firstInstallment.message;
        newData.costs = firstInstallment.label;
        newData.monthlyAmount = firstInstallment.monthlyAmount;
        this.setState({ financingForm: newData });
      }

      this.setState({ installmentOptions: installments });
    }
  };

  handlePaymentMethodChange = (e, { value }) => {
    const newData = this.state.financingForm;
    newData.paymentMethodId = value;
    const paymentMethodOption = this.state.paymentMethodOptions.find(o => o.value === value);
    newData.paymentMethodName = paymentMethodOption.text;
    newData.paymentMethodLogo = paymentMethodOption.image.src;
    this.setState({ financingForm: newData });
    window.Mercadopago.getIssuers(value, this.fetchIssuerCallback);
  };

  handleIssuerChange = (e, { value }) => {
    const newData = this.state.financingForm;
    newData.issuerId = value;
    const issuerdOption = this.state.issuerOptions.find(o => o.value === value);
    newData.issuerName = issuerdOption.text;
    newData.issuerLogo = issuerdOption.image.src;
    this.setState({ financingForm: newData });
    window.Mercadopago.getInstallments(
      {
        issuer_id: value,
        amount: this.props.motorcycle.price,
        payment_method_id: this.state.financingForm.paymentMethodId,
      },
      this.fetchInstallmentsCallback,
    );
  };

  disableContinueButton = () => {
    return (this.state.financingForm.issuerId.length == 0 &&
      this.state.installmentOptions.length == 0);
  }

  handleInstallmentSelected = (e, { value }) => {
    const newData = this.state.financingForm;
    newData.installments = value.installments;
    newData.message = value.message;
    newData.costs = value.label;
    newData.monthlyAmount = value.monthlyAmount;
    this.setState({ financingForm: newData });
  };

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
              value={installment}
              checked={this.state.financingForm.installments === installment.installments}
              onChange={this.handleInstallmentSelected}
            /><Label size="tiny">{installment.label}</Label>
          </Form.Field>
        ));

      installmentList = (
        <Segment attached>
          <Form.Field>
            <label>Elegi las cuotas</label>
          </Form.Field>
          {installmentItems}
        </Segment>
      );
    }

    let issuerDropdown;
    if (this.state.issuerOptions.length > 0) {
      issuerDropdown = (
        <Segment attached>
          <Form.Field>
            <Form.Select
              fluid
              search
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

      let creditCardList =
        this.state.paymentMethodOptions.map(creditCardItem => {
          const activeBtn = classNames(
            "square-btn",
            this.state.financingForm.paymentMethodId === creditCardItem.value ? "active" : " ",
          );
          const activeTxt = classNames(
            "txt-center fs-small",
            this.state.financingForm.paymentMethodId === creditCardItem.value ? "txt-green" : " ",
          );
          return <label className="square-item">
            <Radio
              style={{ display: 'none' }}
              name='creditCardList'
              value={creditCardItem.value}
              checked={this.state.financingForm.paymentMethodId === creditCardItem.value}
              onChange={this.handlePaymentMethodChange}
            />
            <div className={activeBtn}><img src={creditCardItem.image.src} /></div>
            <p className={activeTxt}>{creditCardItem.text}</p>
          </label>
        });
    const creditCardOptions = (
      <Segment attached>
      <Form.Field className="square-btn-container">
        {creditCardList}
        </Form.Field>
      </Segment>
    );


    let continueButtonAttributes = this.disableContinueButton() ? {disabled: true} : {};

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">¿Como queres financiarte?</h2>
        <p className="fs-huge txt-med-gray txt-center">Elegí el metodo de financiación más conveniente.</p>
        <Card className="page-column-card financing-page">
          <Form onSubmit={this.handleSubmit} error={error}>
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
            </Form.Field>

            {creditCardOptions}
            {issuerDropdown}
            {installmentList}

            <Segment attached="bottom" className="txt-center">
              <Button
                size="large"
                primary
                {...continueButtonAttributes}
                onClick={() => {
                  this.props.selectFinancing(this.state.financingForm);
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
      </div>
    );
  }
}


const mapStateToProps = state => ({
  financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
  motorcycle: state.main.lead.motorcycle,
});

const mapDispatchToProps = dispatch => ({
  selectFinancing: async (financingForm) => {
    dispatch(financingSelected(financingForm));
    dispatch(push('/dashboard'));
  },
  cancelFinancing: async () => {
    dispatch(push('/dashboard'));
  },
});

export default translate('financing')(connect(mapStateToProps, mapDispatchToProps)(FinancingPage));
