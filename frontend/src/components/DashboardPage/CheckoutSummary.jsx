import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Card, Icon, List, Divider, Image, Segment } from 'semantic-ui-react';
import axios from 'axios';
import humps from 'humps';
import _ from 'lodash';

import availableMotorcycles from '../motorcycles/availableMotorcycles';
import ConfirmationButton from './ConfirmationButton';
import { startedFetchingInsuranceChoice, insuranceChoiceFetched } from '../../actions/insuranceChoices';
import PurchaseCalculator from '../calculator';
import { getInstallments, filterInstallmentLabels, loadSDK } from '../FinancingPage/mercadoPagoHelper';
import { financingChanged } from '../../actions/financingChoices';
import FinancingInfo from './Sections/FinancingInfo';
import { PERSONAL_INSURANCE } from '../InsurancePage/constants';

export const moneyFormatter = new Intl.NumberFormat('es-AR', {
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

    plateRegistrationData: propTypes.shape({
      plateRegistrationType: propTypes.shape({
        price: propTypes.string,
      }),
    }),

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
      provider: propTypes.string.isRequired,
      message: propTypes.string.isRequired,
      costs: propTypes.string.isRequired,
      monthlyAmount: propTypes.number.isRequired,
      issuerLogo: propTypes.string.isRequired,
      issuerName: propTypes.string.isRequired,
      paymentMethodName: propTypes.string.isRequired,
      paymentMethodLogo: propTypes.string.isRequired,
      paymentMethodId: propTypes.string.isRequired,
      issuerId: propTypes.string.isRequired,
      installments: propTypes.number,
      cashAmount: propTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    loadSDK(() => {
      this.fetchInstallmentsIfNeeded();
    });
    if (!this.props.insuranceChoice.optInOrOut) {
      this.props.fetchInsuranceChoice(this.props.lead.id);
    }
  }

  componentDidUpdate({ accessoriesPrice, plateRegistrationData }) {
    const hasPlateRegistrationChanged =
      !_.isEqual(this.props.plateRegistrationData, plateRegistrationData);
    const hasAccessoriesPriceChanged =
      this.props.accessoriesPrice !== accessoriesPrice;

    if (hasAccessoriesPriceChanged || hasPlateRegistrationChanged) {
      this.fetchInstallmentsIfNeeded();
    }
  }

  calculator = () => {
    const { motorcycle, accessoriesPrice } = this.props;
    const plateRegistrationPrice = this.plateRegistrationPrice();
    return new PurchaseCalculator(
      motorcycle.price,
      accessoriesPrice,
      plateRegistrationPrice,
    );
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

  isPlateRegistrationDataValid = () =>
    this.props.plateRegistrationData && this.props.plateRegistrationData.plateRegistrationType;

  plateRegistrationPrice = () =>
    (this.isPlateRegistrationDataValid() ?
      parseFloat(this.props.plateRegistrationData.plateRegistrationType.price) : 0.0);

  plateRegistrationItem = () => {
    if (this.isPlateRegistrationDataValid()) {
      return (
        <List.Item>
          <List.Content className="price-column" floated="right">
            <span>{moneyFormatter.format(this.plateRegistrationPrice())}</span>
            <span className="fw-normal fs-small txt-med-gray">$</span>
          </List.Content>
          <Icon name="arrow right" />
          <List.Content>Patentamiento online</List.Content>
        </List.Item>
      );
    }
    return null;
  };

  // XXX: This method may hit mercadopago too many times, sign of a bad design
  fetchInstallmentsIfNeeded = () => {
    if (this.props.financingSelected &&
      this.props.financingForm.provider === 'MERCADOPAGO') {
      getInstallments(
        this.props.financingForm.paymentMethodId,
        this.props.financingForm.issuerId,
        this.calculator().totalAmount() - this.props.financingForm.cashAmount,
        this.fetchInstallmentsCallback,
      );
    }
  };

  shouldShowFinancingSummary() {
    if (!this.props.financingForm) {
      return true;
    }

    return this.props.financingForm.provider !== 'BANK_TRANSFER';
  }

  render() {
    const {
      insuranceChoice: {
        quotePrice,
        quotePolicy,
        quoteBrokerLogoUrl,
        quoteBrokerName,
        optInOrOut,
      },
      motorcycle,
      changeToSelectInsurance,
      accessoriesPrice,
    } = this.props;

    const cashAmount = this.props.financingForm && this.props.financingForm.cashAmount;
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
            <p key="price"><span className="fs-big">${quotePrice}</span>/mes</p>
          </List.Content>
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

    return (
      <div className="checkoutSummary">
        <Card fluid>
          <h3 className="summary-title">Resumen de tu moto</h3>

          <Card.Content>
            <List className="summary-list" verticalAlign="middle">
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span>{moneyFormatter.format(bikePrice)}</span>
                  <span className="fw-normal fs-small txt-med-gray">$</span>
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
                  <span>{moneyFormatter.format(accessoriesPrice)}</span>
                  <span className="fw-normal fs-small txt-med-gray">$</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Accesorios</List.Content>
              </List.Item>
              {this.plateRegistrationItem()}
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡gratis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Entrega a domicilio</List.Content>
              </List.Item>
            </List>

            {
              cashAmount > 0 && (
                <div>
                  <Divider />

                  <List className="summary-list" verticalAlign="middle">
                    <List.Item>
                      <List.Content className="price-column" floated="right">
                        <span>{moneyFormatter.format(cashAmount)}</span>
                        <span className="fw-normal fs-small txt-med-gray">$</span>
                      </List.Content>
                      <Icon name="arrow right" />
                      <List.Content>Pago en efectivo</List.Content>
                    </List.Item>
                  </List>
                </div>
              )
            }

            {
              this.shouldShowFinancingSummary() &&
              <React.Fragment>
                <Divider />

                <List className="summary-list">
                  <List.Item>
                    <Icon name="arrow right" />
                    <List.Content>Financiación</List.Content>
                  </List.Item>
                </List>

                <FinancingInfo
                  financingSelected={this.props.financingSelected}
                  financingForm={this.props.financingForm}
                  accessoriesPrice={this.props.accessoriesPrice}
                  motorcycle={this.props.motorcycle}
                  plateRegistrationPrice={this.plateRegistrationPrice()}
                />
              </React.Fragment>
            }

          </Card.Content>

          <Segment className="bg-backgroung_gray" attached>
            {insuranceSection}
          </Segment>

          <Card.Content className="btn-displaced-container txt-center">
            <ConfirmationButton />
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
  changeFinancing: (financingForm) => {
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
  plateRegistrationData: state.main.plateRegistration.plateRegistrationData,
});

export default translate('checkout')(connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary));
