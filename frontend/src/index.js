/* eslint-disable react/jsx-filename-extension */
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import Analytics from 'react-router-ga';
import axios from 'axios';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createAppStoreAndHistory from './store';
import i18n from './i18n';
import { leadFetched, startedFetchingLead } from './actions/beginning';

const { store, history } = createAppStoreAndHistory();

const leadId = window.localStorage.getItem('leadId');
if (leadId) {
  store.dispatch(startedFetchingLead());
  axios.get(`/api/leads/${leadId}`).then((response) => {
    store.dispatch(leadFetched(response.data.data));
  });
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConnectedRouter history={history}>
          <Analytics id="UA-121891800-1" debug>
            <Route component={App} />
          </Analytics>
        </ConnectedRouter>
      </I18nextProvider>
    </Provider>
    , document.getElementById('root'),
  );
};
render();
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render();
  });
}

