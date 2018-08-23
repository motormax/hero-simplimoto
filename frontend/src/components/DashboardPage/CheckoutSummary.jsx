import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Icon, List, Divider, Image, Segment } from 'semantic-ui-react';
import axios from 'axios';
import humps from 'humps';

import availableMotorcycles from '../motorcycles/availableMotorcycles';
import { registrationPrice } from './Sections/PlateRegistrationSection';
import { startedFetchingInsuranceChoice, insuranceChoiceFetched } from '../../actions/insuranceChoices';
import PurchaseCalculator from '../calculator';
import { getInstallments, filterInstallmentLabels } from '../FinancingPage/mercadoPagoHelper';
import { financingChanged } from '../../actions/financingChoices';
import { PERSONAL_INSURANCE } from '../InsurancePage/constants';

const moneyFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

class CheckoutSummary extends Component {
  static propTypes = {
    fetchInsuranceChoice: propTypes.func.isRequired,
    changeToSelectInsurance: propTypes.func.isRequired,
    changeFinancing: propTypes.func.isRequired,

    insuranceChoice: propTypes.shape({
      optInOrOut: propTypes.string,
      accessoriesPrice: propTypes.string,
    }).isRequired,

    accessoriesPrice: propTypes.number,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
    }).isRequired,
    financingSelected: propTypes.bool,
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
    }),
  };

  componentDidMount() {
    if (!this.props.insuranceChoice.optInOrOut) {
      this.props.fetchInsuranceChoice(this.props.lead.id);
    }
  }

  componentDidUpdate({ accessoriesPrice }) {
    if (this.props.accessoriesPrice !== accessoriesPrice && this.props.financingSelected) {
      getInstallments(
        this.props.financingForm.paymentMethodId,
        this.props.financingForm.issuerId,
        this.calculator().totalAmount(),
        this.fetchInstallmentsCallback,
      );
    }
  }

  calculator = () => {
    const { motorcycle, accessoriesPrice } = this.props;
    return new PurchaseCalculator(motorcycle.price, accessoriesPrice, registrationPrice);
  };

  fetchInstallmentsCallback = (status, response) => {
    if (status === 200) {
      response.forEach((installment) => {
        installment.payer_costs.forEach((costs) => {
          if (this.props.financingForm.installments === costs.installments) {
            this.props.changeFinancing({
              message: costs.recommended_message,
              costs: filterInstallmentLabels(costs.labels),
              monthlyAmount: costs.installment_amount,
            });
          }
        });
      });
    }
  };

  render() {
    const {
      insuranceChoice: {
        quotePrice, quotePolicy, quoteBrokerLogoUrl,
        quoteBrokerName, optInOrOut,
      }, motorcycle, changeToSelectInsurance, accessoriesPrice,
    } = this.props;
    const insuranceSelected = !!optInOrOut;
    const insuranceOptOut = optInOrOut === PERSONAL_INSURANCE;

    const bikeDisplayName = availableMotorcycles[motorcycle.name].displayName;
    const bikePrice = motorcycle.price;

    let insuranceSection;
    if (insuranceSelected) {
      const insuranceSelection = insuranceOptOut ? (
        <List.Item key={insuranceOptOut}>
          <List.Content key="self-ensured">Voy a contratar mi propio seguro</List.Content>
        </List.Item>
      ) : (
        <List.Item key={insuranceOptOut}>
          <Image key="bike-image" className="bike-image" src={quoteBrokerLogoUrl} />
          <List.Content key="broker">{quoteBrokerName}
            <div className="fw-normal">{quotePolicy}</div>
          </List.Content>
          <List.Content key="price"><span className="fs-big">${quotePrice}</span>/mes</List.Content>
        </List.Item>
      );

      insuranceSection = (
        <div className="txt-center">
          <List className="summary-list" horizontal>
            {insuranceSelection}
          </List>
          <Button
            className="btn-outline"
            secondary
            onClick={() => changeToSelectInsurance()}
          >Cambiar
          </Button>
          <div className="margin-top-tinny txt-med-gray txt-center">
            {quotePolicy ?
              'Al momento de concretar la compra te pediremos más datos para completar el seguro de tu moto'
              : ''
            }
          </div>
        </div>
      );
    } else {
      insuranceSection = (
        <List className="summary-list">
          <List.Item className="summary-list-btn-container">
            <Icon name="arrow right" />
            <List.Content>Seguro</List.Content>
            <Button
              className="btn-outline"
              fluid
              secondary
              onClick={() => changeToSelectInsurance()}
            >Elegir seguro
            </Button>
          </List.Item>
        </List>
      );
    }

    const financingAmount = this.props.financingSelected ?
      this.props.financingForm.monthlyAmount :
      this.calculator().totalAmount();

    const financingPeriod = this.props.financingSelected ? '/ mes' : '';

    let financingInfo;
    if (this.props.financingSelected) {
      financingInfo = (
        <div className="finnancial-bank">
          <img
            src={this.props.financingForm.paymentMethodLogo}
            alt={this.props.financingForm.paymentMethodName}
          />
          <img
            src={this.props.financingForm.issuerLogo}
            alt={this.props.financingForm.issuerName}
          />
          <div>
            <p className="fs-small">{this.props.financingForm.message}</p>
            <p className="fs-tinny">{this.props.financingForm.costs}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="checkoutSummary">
        <Card fluid>
          <h3 className="summary-title">Resumen de tu moto</h3>

          <Card.Content>
            <List className="summary-list" verticalAlign="middle">
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">$</span>
                  <span>{moneyFormatter.format(bikePrice)}</span>
                </List.Content>
                <List.Content>{bikeDisplayName}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡gratis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Personalización</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">$</span>
                  <span>{moneyFormatter.format(accessoriesPrice)}</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Accesorios</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">$</span>
                  <span>{moneyFormatter.format(registrationPrice)}</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Patentamiento online</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡gratis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Entrega a domicilio</List.Content>
              </List.Item>
            </List>

            <Divider />

            <List className="summary-list">
              <List.Item>
                <Icon name="arrow right" />
                <List.Content>Financiación</List.Content>
              </List.Item>
            </List>

            <div>
              <p className="final-price">
                $
                <span className="final-price-number">{moneyFormatter.format(financingAmount)}</span>
                {financingPeriod}
              </p>
            </div>

            {financingInfo}

          </Card.Content>

          <Segment className="bg-backgroung_gray" attached>
            {insuranceSection}
          </Segment>

          <Card.Content className="btn-displaced-container txt-center">
            <Button className="btn-displaced" size="huge" primary disabled>Preparar la compra
            </Button>
          </Card.Content>
        </Card>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInsuranceChoice: async (leadId) => {
    dispatch(startedFetchingInsuranceChoice());
    const { data: { data: insuranceChoice } } = await axios.get(`/api/leads/${leadId}/insurance`);
    dispatch(insuranceChoiceFetched(humps.camelizeKeys(insuranceChoice)));
  },
  changeToSelectInsurance: () => {
    dispatch(push('/insurance'));
  },
  changeFinancing: async (financingForm) => {
    dispatch(financingChanged(financingForm));
  },
});

const mapStateToProps = state => ({
  lead: state.main.lead,
  motorcycle: state.main.lead.motorcycle,
  accessoriesPrice: state.main.accessories.totalPrice,
  insuranceChoice: state.main.insuranceChoice,
  financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
});

export default translate('checkout')(connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary));
export { moneyFormatter };
