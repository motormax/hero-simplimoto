const reducer = (state = { nombre: 'dani' }, action) => {
  switch (action.type) {
    case 'CAMBIAR_NOMBRE':
      return { nombre: action.nombre };
    default:
      return state;
  }
};

export default {
  main: reducer,
};

