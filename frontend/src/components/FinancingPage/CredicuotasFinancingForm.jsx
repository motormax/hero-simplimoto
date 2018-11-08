import axios from 'axios';
import humps from 'humps';
import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Form, Icon, Label, Radio, Segment } from 'semantic-ui-react';
import { startedFetchingCredicuotasInstallments, credicuotasInstallmentsFetched } from '../../actions/credicuotas';
import PurchaseCalculator from '../calculator';
import { financingSelected } from '../../actions/financingChoices';

class CredicuotasFinancingForm extends Component {
  static propTypes = {
    motorcyclePrice: propTypes.number.isRequired,
    accessoriesPrice: propTypes.number.isRequired,
    plateRegistrationData: propTypes.shape({
      plateRegistrationType: propTypes.shape({
        price: propTypes.string,
      }),
    }),
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
    fetchInstallments: propTypes.func.isRequired,
    selectFinancing: propTypes.func.isRequired,
    cancelFinancing: propTypes.func.isRequired,
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
        ...props.financingForm,
        paymentMethodId: 'CREDICUOTAS',
        paymentMethodLogo: 'https://www.prestamosfrescos.com/ar/assets/design/Credicuotas-logo.png',
        paymentMethodName: 'CREDICUOTAS',
        issuerId: '',
        issuerName: '',
        issuearLogo: '',
      },
    };
  }

  componentDidMount() {
    this.getInstallments();
  }

  getInstallments() {
    this.props.fetchInstallments(this.calculator().totalAmount());
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

  handleSubmit() {
    return this.state; // TODO
  }

  enableContinueButton() {
    return this.state.financingForm.installments;
  }

  handleInstallmentSelected(installment) {
    const newData = this.state.financingForm;
    newData.installments = installment.installments;
    newData.message = installment.message;
    newData.costs = 'CREDICUOTAS';
    newData.monthlyAmount = installment.amount;
    this.setState({ financingForm: newData });
  }

  render() {
    return (
      <Card className="page-column-card financing-page">
        <Form onSubmit={this.handleSubmit}>

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
  // financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
  motorcyclePrice: state.main.lead.motorcycle.price,
  lead: state.main.lead,
  accessoriesPrice: state.main.accessories.totalPrice,
  plateRegistrationData: state.main.plateRegistration.plateRegistrationData,
  installments: state.main.credicuotas.installments,
});

const mapDispatchToProps = dispatch => ({
  fetchInstallments: async (amount) => {
    dispatch(startedFetchingCredicuotasInstallments());
    const { data: { data } } = await axios.get(`/api/credicuotas/installments?amount=${amount}`);
    dispatch(credicuotasInstallmentsFetched(data));
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(CredicuotasFinancingForm);