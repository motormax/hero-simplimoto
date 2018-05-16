import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';


class FundingSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    funding: propTypes.shape({}).isRequired,
  }

  render() {
    const { t, funding } = this.props;

    return (
      <div>
        <h2>{t('title')}</h2>
        <div>{`Financiado?: ${funding.isDefault}`}</div>
      </div>
    );
  }
}

export default translate('funding')(FundingSection);
