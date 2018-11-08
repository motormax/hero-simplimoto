import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';

import PurchaseCalculator from '../../calculator';

const moneyFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


class FinancingInfo extends Component {
    static propTypes = {
      financingSelected: propTypes.bool,
      accessoriesPrice: propTypes.number.isRequired,
      motorcycle: propTypes.shape({
        price: propTypes.number.isRequired,
      }).isRequired,
      financingForm: propTypes.shape({
        message: propTypes.string.isRequired,
        costs: propTypes.string.isRequired,
        monthlyAmount: propTypes.number.isRequired,
        issuerLogo: propTypes.string.isRequired,
        issuerName: propTypes.string.isRequired,
        paymentMethodName: propTypes.string.isRequired,
        paymentMethodLogo: propTypes.string.isRequired,
        installments: propTypes.number,
      }),
      plateRegistrationPrice: propTypes.number.isRequired,
    };

    calculator = () => new PurchaseCalculator(
      this.props.motorcycle.price,
      this.props.accessoriesPrice,
      this.props.plateRegistrationPrice,
    );

    render() {
      const financingAmount = this.props.financingSelected ?
        this.props.financingForm.monthlyAmount :
        this.calculator().totalAmount();

      const financingPeriod = this.props.financingSelected &&
        (this.props.financingForm.installments > 1) ?
        '/ mes' : '';

      let financingInfo;
      if (this.props.financingSelected) {
        financingInfo = (
          <div className="finnancial-bank">
            <img
              src={this.props.financingForm.paymentMethodLogo}
              alt={this.props.financingForm.paymentMethodName}
            />
            {this.props.financingForm.issuerLogo &&
            <img
              src={this.props.financingForm.issuerLogo}
              alt={this.props.financingForm.issuerName}
            />}
            <div>
              <p className="fs-small">{this.props.financingForm.message}</p>
              <p className="fs-tinny">{this.props.financingForm.costs}</p>
            </div>
          </div>
        );
      }
      return (
        <div>
          <p className="final-price">
                $<span className="final-price-number">{moneyFormatter.format(financingAmount)}</span>
            {financingPeriod}
          </p>
          {financingInfo}
        </div>
      );
    }
}

export default translate('financingInfo')(FinancingInfo);
