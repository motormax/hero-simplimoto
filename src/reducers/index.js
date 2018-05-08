/* eslint-env browser */

import { createStore } from 'redux';

const reducer = (state = { nombre: 'dani' }, action) => {
  switch (action.type) {
    case 'CAMBIAR_NOMBRE':
      return { nombre: action.nombre };
    default:
      return state;
  }
};

/* eslint-disable no-underscore-dangle */
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */

const store = createStore(reducer, devToolsExtension && devToolsExtension());


export default store;
