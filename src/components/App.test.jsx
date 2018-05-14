/* eslint-env jest, browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import { store } from '../store';
import i18n from '../i18n';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <App store={store} />
      </I18nextProvider>
    </MemoryRouter>
    , div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
