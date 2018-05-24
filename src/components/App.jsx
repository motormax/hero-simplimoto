import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { translate } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';

import './App.css';
import DashboardPage from './DashboardPage/DashboardPage';
import CustomizationPage from './CustomizationPage/CustomizationPage';
import DashboardIMGPage from './ImagePages/DashboardIMGPage';
import HomeIMGPage from './ImagePages/HomeIMGPage';
import MainPage from './MainPage';

class App extends React.Component {
  static propTypes = {
    t: propTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <div className="App">
        <h1>{t('simplimoto')}</h1>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/dashboard-img" component={DashboardIMGPage} />
          <Route path="/home-img" component={HomeIMGPage} />
          <Route path="/customization" component={CustomizationPage} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  funding: store.main.stages.funding,
});

export default translate('index')(connect(mapStateToProps)(App));
