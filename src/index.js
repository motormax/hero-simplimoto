/* eslint-disable react/jsx-filename-extension */
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import './gruveo';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './store';
import i18n from './i18n';

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </I18nextProvider>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
