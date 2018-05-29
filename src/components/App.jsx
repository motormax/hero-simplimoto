import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { translate } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';

import './App.css';
import DashboardPage from './DashboardPage/DashboardPage';
import CustomizationPage from './CustomizationPage/CustomizationPage';
import Dashboard01IMGPage from './ImagePages/Dashboard01IMGPage';
import FinancingIMGLoadingPage from './ImagePages/FinancingIMGLoadingPage';
import FinancingIMGOptionsPage from './ImagePages/FinancingIMGOptionsPage';
import FinancingIMGPage from './ImagePages/FinancingIMGPage';
import HomeIMGPage from './ImagePages/HomeIMGPage';
import MainPage from './MainPage';
import DateYourBikeIMGPage from './ImagePages/DateYourBikeIMGPage';
import LiveTourPresenterPage from './LiveTourPage/LiveTourPresenterPage';
import LiveTourUserPage from './LiveTourPage/LiveTourUserPage';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/customization" component={CustomizationPage} />
          <Route path="/dashboard-img" component={Dashboard01IMGPage} />
          <Route path="/home-img" component={HomeIMGPage} />
          <Route path="/financing-img" component={FinancingIMGPage} />
          <Route path="/financing-loading-img" component={FinancingIMGLoadingPage} />
          <Route path="/financing-options-img" component={FinancingIMGOptionsPage} />
          <Route path="/dateyourbike-img" component={DateYourBikeIMGPage} />
          <Route path="/live-tour-presenter" component={LiveTourPresenterPage} />
          <Route path="/live-tour" component={LiveTourUserPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  funding: store.main.stages.funding,
});

export default translate('index')(connect(mapStateToProps)(App));
