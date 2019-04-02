/* eslint-env browser */
import axios from 'axios';
import humps from 'humps';
import propTypes from 'prop-types';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Form, Icon, Label, Radio, Segment } from 'semantic-ui-react';
import PurchaseCalculator from '../calculator';
import { financingSelected } from '../../actions/financingChoices';
import {
  startedFetchingCredicuotasPersonalInstallments,
  startedFetchingCredicuotasVerificationCode,
  credicuotasPersonalInstallmentsFetched,
  credicuotasVerificationCodeFetched,
} from '../../actions/credicuotas';

const DNI_AND_PHONE = 'DNI_AND_PHONE';
const PHONE_VERIFICATION = 'PHONE_VERIFICATION';
const SELECT_CUIT = 'SELECT_CUIT';
const INSTALLMENTS = 'INSTALLMENTS';

class CredicuotasFinancingPage extends Component {
  static propTypes = {
    motorcyclePrice: propTypes.number.isRequired,
    accessoriesPrice: propTypes.number.isRequired,
    fetchInstallments: propTypes.func.isRequired,
    fetchCuitInstallments: propTypes.func.isRequired,
    requestVerificationCode: propTypes.func.isRequired,
    verificationId: propTypes.string,
    cancelFinancing: propTypes.func.isRequired,
    selectFinancing: propTypes.func.isRequired,
    installments: propTypes.arrayOf(propTypes.shape({
      installments: propTypes.number.isRequired,
      message: propTypes.string.isRequired,
      label: propTypes.string,
    })),
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    plateRegistrationData: propTypes.shape({
      plateRegistrationType: propTypes.shape({
        price: propTypes.string,
      }),
    }),
    financingForm: propTypes.shape({
      paymentMethodId: propTypes.string.isRequired,
      issuerId: propTypes.string,
      message: propTypes.string.isRequired,
      costs: propTypes.string.isRequired,
      installments: propTypes.number,
      monthlyAmount: propTypes.number.isRequired,
      cashAmount: propTypes.number.isRequired,
    }).isRequired,
    verificationCodeLoading: propTypes.bool.isRequired,
    personalInstallmentsLoading: propTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      step: DNI_AND_PHONE,
      dni: '',
      phone: '',
      verification: '',
      canSubmit: false,
      financingForm: Object.assign({}, props.financingForm, { provider: 'CREDICUOTAS' }),
      errors: {
        dni: undefined,
        phone: undefined,
      },
      cuitAlternatives: undefined,
    };
  }

  enableContinueButton() {
    return this.state.canSubmit;
  }

  handleInstallmentSelected(installment) {
    const newData = this.state;
    newData.financingForm.installments = installment.installments;
    newData.financingForm.message = installment.message;
    newData.financingForm.monthlyAmount = installment.amount;
    newData.canSubmit = true;
    this.setState(newData);
  }

  handleCuitAlternativeSelected(cuit) {
    const newData = this.state;
    newData.currentCuitAlternative = cuit;
    newData.canSubmit = true;
    this.setState(newData);
  }

  calculator = () => {
    const { motorcyclePrice, accessoriesPrice } = this.props;
    return new PurchaseCalculator(motorcyclePrice, accessoriesPrice, this.plateRegistrationPrice());
  };

  isPlateRegistrationDataValid = () =>
    this.props.plateRegistrationData && this.props.plateRegistrationData.plateRegistrationType;

  plateRegistrationPrice = () =>
    (this.isPlateRegistrationDataValid() ?
      parseFloat(this.props.plateRegistrationData.plateRegistrationType.price) : 0.0);

  handleSubmit = () => {
    if (this.state.step === DNI_AND_PHONE) {
      if (!this.isDniValid()) {
        this.setState({ errors: { dni: true } });
        return;
      }
      if (!this.isPhoneValid()) {
        this.setState({ errors: { phone: true } });
      }
      this.props.requestVerificationCode(this.state.phone);
      this.setState({
        step: PHONE_VERIFICATION,
        canSubmit: false,
      });
      return;
    }

    if (this.state.step === PHONE_VERIFICATION) {
      if (!this.isVerificationValid()) {
        this.setState({ errors: { verification: true } });
        return;
      }

      this.setState({
        step: INSTALLMENTS,
        canSubmit: false,
      });

      this.props.fetchInstallments(
        this.state.dni,
        this.props.verificationId,
        this.state.verification,
        this.effectiveAmount(),
      ).catch(({ response }) => {
        if (response.status === 409) {
          const { data: { error: { customerList } } } = response;
          if (customerList) {
            this.setState({ step: SELECT_CUIT, cuitAlternatives: customerList });
          }
        }
      });
      return;
    }

    if (this.state.step === SELECT_CUIT) {
      this.setState({
        step: INSTALLMENTS,
        canSubmit: false,
      });

      this.props.fetchCuitInstallments(
        this.state.currentCuitAlternative,
        this.props.verificationId,
        this.state.verification,
        this.effectiveAmount(),
      );
      return;
    }

    if (this.state.step === INSTALLMENTS) {
      this.props.selectFinancing(this.props.lead.id, this.state.financingForm);
    }
  };

  effectiveAmount() {
    return this.calculator().totalAmount() - this.props.financingForm.cashAmount;
  }

  isDniValid = () => {
    const { dni } = this.state;
    return dni && dni.length > 6 && dni.length < 9 && /\d*/.test(dni);
  };

  isPhoneValid = () => {
    const { phone } = this.state;
    return phone && phone.length > 9;
  };

  isVerificationValid = () => {
    const { verification } = this.state;
    return verification && verification.length > 3 && /\d*/.test(verification);
  };

  handleFinancingFormDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newState = this.state;
    newState[inputName] = value;
    if (newState.step === DNI_AND_PHONE) {
      if (this.isDniValid() && this.isPhoneValid()) {
        newState.canSubmit = true;
      }
    }
    if (newState.step === PHONE_VERIFICATION) {
      if (this.isVerificationValid()) {
        newState.canSubmit = true;
      }
    }
    this.setState(newState);
  };

  personalInstallments() {
    if (this.props.personalInstallmentsLoading) {
      return 'Cargando...';
    }

    return (
      <span className="dp-inline-block txt-left">
        {this.props.installments && this.props.installments.map(installment => (
          <Form.Field key={installment.installments}>
            <Radio
              label={installment.message}
              name="installment_id"
              checked={this.state.financingForm.installments === installment.installments}
              onChange={() => this.handleInstallmentSelected(installment)}
            />
            <Label size="small">{installment.label}</Label>
          </Form.Field>))}
      </span>
    );
  }

  verificationCode() {
    if (this.props.verificationCodeLoading) {
      return 'Cargando...';
    }

    return (
      <Form.Group widths="equal">
        <Form.Input
          fluid
          required
          label="Ingresá el código de verificación que recibiste"
          type="number"
          name="verification"
          value={this.state.verification}
          error={this.state.errors.verification}
          onChange={this.handleFinancingFormDataChange}
          placeholder="1234"
          readOnly={this.state.step === INSTALLMENTS}
        />
      </Form.Group>
    );
  }

  render() {
    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">Tu préstamo personalizado</h2>

        <Card className="page-column-card" style={{ width: 'fit-content', marginBottom: '20px' }}>
          <img src="https://www.prestamosfrescos.com/ar/assets/design/Credicuotas-logo.png" alt="Credicuotas" />
        </Card>

        <Card className="page-column-card">
          <Form onSubmit={this.handleSubmit}>

            <Segment attached padded>
              <p className="txt-dark-gray fw-bold fs-huge">Completá tus datos</p>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="DNI (Sin puntos ni espacios)"
                  type="text"
                  name="dni"
                  minLength={7}
                  maxLength={8}
                  value={this.state.dni}
                  error={this.state.errors.dni}
                  onChange={this.handleFinancingFormDataChange}
                  placeholder="23456789"
                  readOnly={this.state.step !== DNI_AND_PHONE}
                />
                <Form.Input
                  fluid
                  required
                  label="Teléfono Celular"
                  type="text"
                  minLength={8}
                  maxLength={14}
                  name="phone"
                  value={this.state.phone}
                  error={this.state.errors.phone}
                  onChange={this.handleFinancingFormDataChange}
                  placeholder="1199999999"
                  readOnly={this.state.step !== DNI_AND_PHONE}
                />
              </Form.Group>
            </Segment>

            {
              [PHONE_VERIFICATION, SELECT_CUIT, INSTALLMENTS].includes(this.state.step) &&
              <Segment attached padded>
                <p className="txt-dark-gray fw-bold fs-huge">Revisá tu Celular</p>
                { this.verificationCode() }
              </Segment>
            }

            {
              this.state.cuitAlternatives &&
              [SELECT_CUIT, INSTALLMENTS].includes(this.state.step) &&
              <Segment attached padded>
                <p className="txt-dark-gray fw-bold fs-huge">Elegí tu CUIL/CUIT</p>
                <div className="txt-center">
                  <span className="dp-inline-block txt-left">
                    {this.state.cuitAlternatives.map(alternative => (
                      <Form.Field key={alternative.cuit}>
                        <Radio
                          label={alternative.cuit}
                          name="alternative_id"
                          checked={this.state.currentCuitAlternative === alternative.cuit}
                          onChange={() => this.handleCuitAlternativeSelected(alternative.cuit)}
                        />
                        <Label size="small">{alternative.nombrecompleto}</Label>
                      </Form.Field>))}
                  </span>
                </div>
              </Segment>
            }

            {
              this.state.step === INSTALLMENTS &&
              <Segment attached>
                <p className="txt-dark-gray fw-bold fs-huge">¿En cuantas cuotas?</p>
                <div className="txt-center">
                  {this.personalInstallments()}
                </div>
              </Segment>
            }

            <Segment attached="bottom" className="txt-center">
              <Button
                size="large"
                primary
                disabled={!this.enableContinueButton()}
              >
                Confirmar
              </Button>
              <Button
                size="large"
                secondary
                className="btn-outline"
                type="button"
                onClick={this.props.cancelFinancing}
              >
                <Icon name="chevron left" />
                Volver
              </Button>
            </Segment>

          </Form>

        </Card>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  financingForm: state.main.financing.financingForm,
  motorcyclePrice: state.main.lead.motorcycle.price,
  lead: state.main.lead,
  accessoriesPrice: state.main.accessories.totalPrice,
  plateRegistrationData: state.main.plateRegistration.plateRegistrationData,
  installments: state.main.credicuotas.personalInstallments.installments,
  verificationId: state.main.credicuotas.verificationCode.verificationId,
  verificationCodeLoading: state.main.credicuotas.verificationCode.loading,
  personalInstallmentsLoading: state.main.credicuotas.personalInstallments.loading,
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
  fetchInstallments: async (dni, verificationId, verificationCode, amount) => {
    dispatch(startedFetchingCredicuotasPersonalInstallments());
    const { data: { data } } = await axios.get(`/api/credicuotas/personal_installments?dni=${dni}&verification_id=${verificationId}&verification_code=${verificationCode}&amount=${amount}`);
    dispatch(credicuotasPersonalInstallmentsFetched(data));
  },
  fetchCuitInstallments: async (cuit, verificationId, verificationCode, amount) => {
    dispatch(startedFetchingCredicuotasPersonalInstallments());
    const { data: { data } } = await axios.get(`/api/credicuotas/personal_installments_cuit?cuit=${cuit}&verification_id=${verificationId}&verification_code=${verificationCode}&amount=${amount}`);
    dispatch(credicuotasPersonalInstallmentsFetched(data));
  },
  requestVerificationCode: async (phoneNumber) => {
    dispatch(startedFetchingCredicuotasVerificationCode());
    const { data: { data } } = await axios.post(`/api/credicuotas/send_code?phone_number=${phoneNumber}`);
    dispatch(credicuotasVerificationCodeFetched(data));
  },
  cancelFinancing: async () => {
    dispatch(push('/dashboard'));
  },
});

export default translate('credicuotasFinancing')(connect(mapStateToProps, mapDispatchToProps)(CredicuotasFinancingPage));
