import { createStore } from 'redux';

const reducer = (state = { nombre: 'dani' }, action) => {
  switch (action.type) {
    case 'CAMBIAR_NOMBRE':
      return { nombre: action.nombre };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
