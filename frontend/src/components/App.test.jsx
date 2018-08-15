/* eslint-env jest, browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import createAppStore from '../store';
import i18n from '../i18n';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const { store } = createAppStore();

  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <App store={store} />
        </I18nextProvider>
      </MemoryRouter>
    </Provider>
    , div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
