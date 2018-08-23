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
import PlateRegistrationPage from './PlateRegistrationPage/index';
import Footer from './Footer';
import InsurancePage from './InsurancePage';
import FinancingPage from './FinancingPage';
import PurchaseSummaryPage from './PurchaseSummaryPage';
import SuccessPage from './SuccessPage';
import BikeSpecs from './Specs/BikeSpecs';

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
            <Route path="/financing" component={FinancingPage} />
            <Route path="/summary" component={PurchaseSummaryPage} />
            <Route path="/success" component={SuccessPage} />
            <Route path="/specs/:bikeName" component={BikeSpecs} />
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
