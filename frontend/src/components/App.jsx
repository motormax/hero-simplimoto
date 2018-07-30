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
import DeliverySection from './DeliveryPage';
import DateYourBikeSection from './DashboardPage/Sections/DateYourBikeSection';
import Footer from './Footer';

import logoUrl from './hero-logo.png';
import ignitorImgUrl from './images/ignitor.png';


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
            <Route path="/delivery" component={DeliverySection} />
            <Route path="/date" component={DateYourBikeSection} />
          </Switch>
        </Container>
        <Footer bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  funding: store.main.funding,
});

export default translate('index')(connect(mapStateToProps)(App));
