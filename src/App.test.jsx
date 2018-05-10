/* eslint-env jest, browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';

import App from './App';
import { store } from './store';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
      <App store={store} />
    </MemoryRouter>
    , div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
