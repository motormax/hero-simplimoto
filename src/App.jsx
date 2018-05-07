import React from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Bienvenido a react</h1>
    </header>
    <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>);


const mapStateToProps = state => ({
  nombre: state.nombre || 'lucas',
});

export default connect(mapStateToProps)(App);