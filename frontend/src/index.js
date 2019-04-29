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
import moment from 'moment';
import 'moment/locale/es';
import { toast } from 'react-toastify';

import './index.css';
import App from './components/App';
import unregisterServiceWorker from './unregisterServiceWorker';
import createAppStoreAndHistory from './store';
import i18n from './i18n';
import { leadFetched, startedFetchingLead } from './actions/beginning';

moment.locale('es');

const { store, history } = createAppStoreAndHistory();

const leadId = window.localStorage.getItem('leadId');
if (leadId) {
  store.dispatch(startedFetchingLead());
  axios.get(`/api/leads/${leadId}`).then((response) => {
    store.dispatch(leadFetched(response.data.data));
  });
}
axios.interceptors.response.use(response => response, (error) => {
  // Do something with response error
  if (error.response.status === 500) {
    toast.error('Lo sentimos! Se produjo un error, por favor reintente nuevamente en unos segundos', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return Promise.reject(error);
});

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
unregisterServiceWorker();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render();
  });
}

