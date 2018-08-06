import actionTypes from '../actions/actionTypes';
import availableAccessories from '../components/motorcycles/availableAccessories';

const initialState = {
  totalPrice: 0,
  selectedAccessories: {},
};

Object.keys(availableAccessories).forEach((name) => {
  initialState.selectedAccessories[name] = true;
  initialState.totalPrice += availableAccessories[name].price;
});

export default function accessoriesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.toggleAccessorySelection: {
      const { accesoryName } = action;
      const { selectedAccessories } = state;

      // toggle accessory selection
      selectedAccessories[accesoryName] = !selectedAccessories[accesoryName];

      // compute new total price
      let totalPrice = 0;
      Object.keys(availableAccessories).forEach((name) => {
        if (selectedAccessories[name]) {
          totalPrice += availableAccessories[name].price;
        }
      });

      return { totalPrice, selectedAccessories };
    }
    default:
      return state;
  }
}
