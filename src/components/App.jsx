import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { translate } from 'react-i18next';

import './App.css';
import DashboardPage from './DashboardPage/DashboardPage';

class App extends React.Component {
  static propTypes = {
    t: propTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <div className="App">
        <h1>{t('Simplimoto')}</h1>
        <Route path="/dashboard" component={DashboardPage} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  funding: store.main.stages.funding,
});

export default translate('translations')(connect(mapStateToProps)(App));
