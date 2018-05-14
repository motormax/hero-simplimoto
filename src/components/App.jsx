import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { translate } from 'react-i18next';

import logo from './logo.svg';
import './App.css';

import GruveoEmbed from '../gruveo';

const Coso = () => (
  <div>This shows up if the route is /thing</div>
);


class App extends React.Component {
  static propTypes = {
    nombre: propTypes.string.isRequired,
    t: propTypes.func.isRequired,
  };

  render() {
    const { nombre, t } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bienvenido a {nombre}</h1>
        </header>
        <p className="App-intro">
          {t('contenido', { nombre })}
          <Route path="/thing" component={Coso} />
        </p>
        <GruveoEmbed />
      </div>
    );
  }
}

App.propTypes = {
  nombre: propTypes.string.isRequired,
  t: propTypes.func.isRequired,
};


const mapStateToProps = store => ({
  nombre: store.main.nombre,
});

export default translate('translations')(connect(mapStateToProps)(App));
