import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import CurrentBill from './CurrentBill';
import FundingSection from './Sections/FundingSection';


class DashboardPage extends Component {
  static propTypes = {
    stages: propTypes.shape({
      isDefault: propTypes.bool,
    }).isRequired,
  }

  render() {
    const { stages } = this.props;

    return (
      <div >
        <h1>Dashboard</h1>
        <FundingSection funding={stages.funding} />
        <CurrentBill />
      </div>
    );
  }
}

const mapStateToProps = store => ({ stages: store.main.stages });

export default translate('translations')(connect(mapStateToProps)(DashboardPage));
