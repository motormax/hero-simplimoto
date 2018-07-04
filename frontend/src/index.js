/* eslint-disable react/jsx-filename-extension */
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import { I18nextProvider } from 'react-i18next';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './store';
import i18n from './i18n';
import { userFetched } from './actions/beginning';


const userId = window.localStorage.getItem('userId');
if (userId) {
  store.dispatch(userFetched({ id: userId }));
}

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <Route component={App} />
      </ConnectedRouter>
    </I18nextProvider>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}

