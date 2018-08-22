import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { translate } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import './App.css';
import DashboardPage from './DashboardPage/DashboardPage';
import MainPage from './MainPage/MainPage';
import DeliveryPage from './DeliveryPage';
import DateYourBikePage from './DateYourBikePage';
import PlateRegistrationPage from './PlateRegistrationPage';
import Footer from './Footer';
import InsurancePage from './InsurancePage';
import PurchaseSummaryPage from './PurchaseSummaryPage';
import HunkSpecs from './Specs/HunkSpecs';
import IgnitorSpecs from './Specs/IgnitorSpecs';
import DashSpecs from './Specs/DashSpecs';
import HunkSportSpecs from './Specs/HunkSportSpecs';

import logoUrl from './hero-logo.png';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <img className="logo" alt="Hero digital" src={logoUrl} />
        </header>
        <Container className="main-container">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/delivery" component={DeliveryPage} />
            <Route path="/date" component={DateYourBikePage} />
            <Route path="/insurance" component={InsurancePage} />
            <Route path="/plate-registration" component={PlateRegistrationPage} />
            <Route path="/summary" component={PurchaseSummaryPage} />
            <Route path="/hunk-specs" component={HunkSpecs} />
            <Route path="/ignitor-specs" component={IgnitorSpecs} />
            <Route path="/dash-specs" component={DashSpecs} />
            <Route path="/hunk-sport-specs" component={HunkSportSpecs} />
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  funding: store.main.funding,
});

export default translate('index')(connect(mapStateToProps)(App));
