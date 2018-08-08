import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Form, Card, Radio, Label, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import loadSDK from './mercadoPagoHelper';
import { financingSelected } from '../../actions/financingChoices';

class FinancingPage extends Component {
  static propTypes = {
    selectFinancing: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      paymentMethodOptions: [],
      issuerOptions: [],
      installmentOptions: [],
      financingForm: {
        paymentMethodId: '',
        issuerId: '',
        installments: 1,
        paymentMethodLogo: '',
        issuerLogo: '',
        message: '',
        costs: '',
        monthlyAmount: 0,
      },
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
    }
  };

  fetchInstallmentsCallback = (status, response) => {
    if (status === 200) {
      console.log("here!!");
      console.log(response);
      const installments = [];
      console.log(installments);
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
      console.log("boom");
      console.log(installments);
      this.setState({ installmentOptions: installments });
    }
  };

  handlePaymentMethodChange = (e, { value }) => {
    const newData = this.state.financingForm;
    newData.paymentMethodId = value;
    this.setState({ financingForm: newData });
    window.Mercadopago.getIssuers(value, this.fetchIssuerCallback);
  };

  handleIssuerChange = (e, { value }) => {
    const newData = this.state.financingForm;
    newData.issuerId = value;
    this.setState({ financingForm: newData });
    window.Mercadopago.getInstallments(
      {
        issuer_id: value,
        amount: 20000,
        payment_method_id: this.state.financingForm.paymentMethodId,
      },
      this.fetchInstallmentsCallback,
    );
  };

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
        <Segment vertical>
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
        <Form.Field>
          <Form.Select
            fluid
            search
            placeholder="Elegí el banco emisor"
            options={this.state.issuerOptions}
            name="issuer_id"
            value={this.state.financingForm.issuerId}
            onChange={this.handleIssuerChange}
            className="fs-big"
          />
        </Form.Field>
      );
    }

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">¿Como queres financiarte?</h2>
        <p className="fs-huge txt-med-gray txt-center">Elegí el metodo de financiación más conveniente.</p>
        <Card className="page-column-card">
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

            <Segment vertical>
              {issuerDropdown}
            </Segment>

            {installmentList}

            <Segment attached="bottom" className="txt-center">
              <Button
                size="large"
                primary
                onClick={() => {
                  this.props.selectFinancing(this.state.financingForm);
                }}
              >Continuar
              </Button>
            </Segment>
          </Form>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  financingForm: store.main.financing.financingForm,
});

const mapDispatchToProps = dispatch => ({
  selectFinancing: async (financingForm) => {
    dispatch(financingSelected(financingForm));
    dispatch(push('/dashboard'));
  },
});

export default translate('financing')(connect(mapStateToProps, mapDispatchToProps)(FinancingPage));

