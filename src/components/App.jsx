import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { translate } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';

import './App.css';
import DashboardPage from './DashboardPage/DashboardPage';
import CustomizationPage from './CustomizationPage/CustomizationPage';
import CustomizationIMGPage from './ImagePages/CustomizationIMGPage';
import Dashboard01IMGPage from './ImagePages/Dashboard01IMGPage';
import FinancingIMGLoadingPage from './ImagePages/FinancingIMGLoadingPage';
import FinancingIMGOptionsPage from './ImagePages/FinancingIMGOptionsPage';
import FinancingIMGPage from './ImagePages/FinancingIMGPage';
import HomeIMGPage from './ImagePages/HomeIMGPage';
import SuccessIMGPage from './ImagePages/SuccessIMGPage';
import InsuranceIMGPage from './ImagePages/InsuranceIMGPage';
import MainPage from './MainPage';
import DateYourBikeIMGPage from './ImagePages/DateYourBikeIMGPage';
import LiveTourPresenterPage from './LiveTourPage/LiveTourPresenterPage';
import LiveTourUserPage from './LiveTourPage/LiveTourUserPage';
import BikeSentIMGPage from './ImagePages/BikeSentIMGPage';
import Dashboard02IMGPage from './ImagePages/Dashboard02IMGPage';
import Dashboard03IMGPage from './ImagePages/Dashboard03IMGPage';
import Dashboard04IMGPage from './ImagePages/Dashboard04IMGPage';
import Dashboard05IMGPage from './ImagePages/Dashboard05IMGPage';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomeIMGPage} />
          <Route path="/home-img" component={HomeIMGPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/customization" component={CustomizationPage} />
          <Route path="/dashboard-img" component={Dashboard01IMGPage} />
          <Route path="/dashboard2-img" component={Dashboard02IMGPage} />
          <Route path="/dashboard3-img" component={Dashboard03IMGPage} />
          <Route path="/dashboard4-img" component={Dashboard04IMGPage} />
          <Route path="/dashboard5-img" component={Dashboard05IMGPage} />
          <Route path="/customization-img" component={CustomizationIMGPage} />
          <Route path="/financing-img" component={FinancingIMGPage} />
          <Route path="/financing-loading-img" component={FinancingIMGLoadingPage} />
          <Route path="/financing-options-img" component={FinancingIMGOptionsPage} />
          <Route path="/dateyourbike-img" component={DateYourBikeIMGPage} />
          <Route path="/bikesent-img" component={BikeSentIMGPage} />
          <Route path="/live-tour-presenter" component={LiveTourPresenterPage} />
          <Route path="/livetour-img" component={LiveTourUserPage} />
          <Route path="/insurance-img" component={InsuranceIMGPage} />
          <Route path="/success-img" component={SuccessIMGPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  funding: store.main.stages.funding,
});

export default translate('index')(connect(mapStateToProps)(App));
