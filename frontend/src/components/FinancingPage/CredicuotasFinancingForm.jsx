import axios from 'axios';
import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Icon, Label, Radio, Segment } from 'semantic-ui-react';
import { startedFetchingCredicuotasInstallments, credicuotasInstallmentsFetched } from '../../actions/credicuotas';
import PurchaseCalculator from '../calculator';

const STEPS = ['DNI_AND_PHONE', 'PHONE_VERIFICATION', 'INSTALLMENTS'];

class CredicuotasFinancingForm extends Component {
  static propTypes = {
    motorcyclePrice: propTypes.number.isRequired,
    accessoriesPrice: propTypes.number.isRequired,
    plateRegistrationData: propTypes.shape({
      plateRegistrationType: propTypes.shape({
        price: propTypes.string,
      }),
    }),
    requestVerification: propTypes.func.isRequired,
    fetchInstallmentsWithDNI: propTypes.func.isRequired,
    installments: propTypes.arrayOf(propTypes.shape({
      installments: propTypes.number.isRequired,
      message: propTypes.string.isRequired,
      label: propTypes.string,
    })),
  };

  constructor(props) {
    super(props);
    this.state = {
      financingForm: {
        step: STEPS[0],
        installments: undefined,
        dni: '',
        phone: '', // TODO: Maybe we can extract these from the state
        verification: '',
        canSubmit: false,
        verificationId: '',
      },
      errors: {
        dni: undefined,
        phone: undefined,
      },
    };
  }

  componentDidMount() {
    // this.getInstallments();
  }

  // getInstallments() {
  //   this.props.fetchInstallments(this.calculator().totalAmount());
  // }

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
    if (this.state.financingForm.step === STEPS[0]) {
      if (!this.isDniValid()) {
        this.setState({ errors: { dni: true } });
        return;
      }
      if (!this.isPhoneValid()) {
        this.setState({ errors: { phone: true } });
      }
      this.props.requestVerification(this.state.financingForm.phone, (verificationId) => {
        this.setState({
          financingForm: {
            ...this.state.financingForm,
            step: STEPS[1],
            canSubmit: false,
            verificationId,
          },
        });
      });
      return;
    }

    if (this.state.financingForm.step === STEPS[1]) {
      if (!this.isVerificationValid()) {
        this.setState({ errors: { verification: true } });
        return;
      }

      this.setState({
        financingForm: {
          ...this.state.financingForm,
          step: STEPS[2],
          canSubmit: false,
        },
      });
      this.props.fetchInstallmentsWithDNI(
        this.state.financingForm.dni,
        this.state.financingForm.verificationId,
        this.state.financingForm.verification,
        this.calculator().totalAmount(),
      );
    }
    console.log(this.state);
  };

  enableContinueButton() {
    return this.state.financingForm.canSubmit;
  }

  isDniValid = () => {
    const { financingForm: { dni } } = this.state;
    return dni && dni.length > 6 && /\d*/.test(dni);
  };

  isPhoneValid = () => {
    const { financingForm: { phone } } = this.state;
    return phone && phone.length > 9;
  };

  isVerificationValid = () => {
    const { financingForm: { verification } } = this.state;
    return verification && verification.length > 3 && /\d*/.test(verification);
  };

  handleFinancingFormDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newFinancingFormData = this.state.financingForm;
    newFinancingFormData[inputName] = value;

    if (newFinancingFormData.step === STEPS[0] && this.isDniValid() && this.isPhoneValid()) {
      newFinancingFormData.canSubmit = true;
    } else {
      // newFinancingFormData.canSubmit = false;
    }

    if (newFinancingFormData.step === STEPS[1] && this.isVerificationValid()) {
      newFinancingFormData.canSubmit = true;
    } else {
      // newFinancingFormData.canSubmit = false;
    }

    this.setState({ financingForm: newFinancingFormData });
  };

  handleInstallmentSelected(installment) {
    const newData = this.state.financingForm;
    newData.installments = installment.installments;
    newData.message = installment.message;
    newData.costs = installment.label;
    newData.monthlyAmount = installment.monthlyAmount;
    newData.canSubmit = true;
    this.setState({ financingForm: newData });
  }

  render() {
    return (
      <Card className="page-column-card financing-page">
        <Form onSubmit={this.handleSubmit}>
          <Segment attached padded>
            <p className="txt-dark-gray fw-bold fs-huge">Completá tus datos!</p>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                required
                label="DNI (Sin puntos ni espacios)"
                type="text"
                name="dni"
                minLength={7}
                maxLength={8}
                value={this.state.financingForm.dni}
                error={this.state.errors.dni}
                onChange={this.handleFinancingFormDataChange}
                placeholder="23456789"
                readOnly={this.state.financingForm.step !== STEPS[0]}
              />
              <Form.Input
                fluid
                required
                label="Teléfono Celular"
                type="text"
                minLength={8}
                maxLength={14}
                name="phone"
                value={this.state.financingForm.phone}
                error={this.state.errors.phone}
                onChange={this.handleFinancingFormDataChange}
                placeholder="1199999999"
                readOnly={this.state.financingForm.step !== STEPS[0]}
              />
            </Form.Group>
          </Segment>

          {
            this.state.financingForm.step !== STEPS[0] &&
            <Segment attached padded>
              <p className="txt-dark-gray fw-bold fs-huge">Enviamos un código de verificación a tu celular</p>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="Ingresá el código de verificación que recibiste"
                  type="number"
                  name="verification"
                  value={this.state.financingForm.verification}
                  error={this.state.errors.verification}
                  onChange={this.handleFinancingFormDataChange}
                  placeholder="1234"
                  readOnly={this.state.financingForm.step === STEPS[2]}
                />
              </Form.Group>
            </Segment>
          }

          {
            this.state.financingForm.step === STEPS[2] &&
            <Segment attached>
              <p className="txt-dark-gray fw-bold fs-huge">¿En cuantas cuotas?</p>
              <div className="txt-center">
                <span className="dp-inline-block txt-left">
                  {this.props.installments && this.props.installments.map(installment => (
                    <Form.Field key={installment.installments}>
                      <Radio
                        label={installment.message}
                        name="installment_id"
                        checked={this.state.financingForm.installments === installment.installments}
                        onChange={() => this.handleInstallmentSelected(installment)}
                      /><Label size="small">{installment.label}</Label>
                    </Form.Field>
                  ))
                  }
                </span>
              </div>
            </Segment>
          }

          <Segment attached className="txt-center">
            <a href="https://clientes.credicuotas.com.ar" target="_blanck">
              <Icon.Group size="large">
                <Icon className="shield alternate" />
                <Icon corner className="check circle" />
              </Icon.Group>
              Estamos financiando tu compra a través de <strong>credicuotas</strong>
            </a>
          </Segment>

          <Segment attached="bottom" className="txt-center">
            <Button
              size="large"
              primary
              disabled={!this.enableContinueButton()}
              onClick={() => {
                // this.props.selectFinancing(this.props.lead.id, this.state.financingForm);
              }}
            >Continuar
            </Button>
            <Button
              size="large"
              secondary
              onClick={() => {
                // this.props.cancelFinancing();
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
  // financingSelected: state.main.financing.financingSelected,
  // financingForm: state.main.financing.financingForm,
  motorcyclePrice: state.main.lead.motorcycle.price,
  // lead: state.main.lead,
  accessoriesPrice: state.main.accessories.totalPrice,
  plateRegistrationData: state.main.plateRegistration.plateRegistrationData,
  installments: state.main.credicuotas.installments,
});

const mapDispatchToProps = dispatch => ({
  requestVerification: async (phoneNumber, callback) => {
    const { data: { data: { verification_id: verificationId } } } = await axios.post(`api/credicuotas/send_code?phone_number=${phoneNumber}`);
    // console.log(response);
    callback(verificationId);
  },
  fetchInstallmentsWithDNI: async (dni, verificationId, verificationCode, amount) => {
    dispatch(startedFetchingCredicuotasInstallments());
    const { data: { data } } = await axios.get(`/api/credicuotas/installments?dni=${dni}&verification_id=${verificationId}&verification_code=${verificationCode}&amount=${amount}`)
    dispatch(credicuotasInstallmentsFetched(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CredicuotasFinancingForm);
