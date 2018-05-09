import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import logo from './logo.svg';
import './App.css';

const Coso = () => (
  <div>This shows up if the route is /thing</div>
);

const App = ({ nombre }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Bienvenido a {nombre}</h1>
    </header>
    <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
      <Route path="/thing" component={Coso} />
    </p>
  </div>);

App.propTypes = {
  nombre: propTypes.string.isRequired,
};


const mapStateToProps = store => ({
  nombre: store.main.nombre,
});

export default connect(mapStateToProps)(App);
