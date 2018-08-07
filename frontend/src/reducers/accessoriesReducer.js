import _ from 'lodash';
import actionTypes from '../actions/actionTypes';
import availableAccessories from '../components/motorcycles/availableAccessories';

const initialState = {
  totalPrice: 0,
  selectedAccessories: {},
};

Object.keys(availableAccessories)
  .forEach((name) => {
    initialState.selectedAccessories[name] = true;
    initialState.totalPrice += availableAccessories[name].price;
  });

export default function accessoriesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.toggleAccessorySelection: {
      const { accesoryName } = action;
      const { selectedAccessories } = state;

      const newSelectedAccessories = Object.assign(
        {},
        selectedAccessories,
        { [accesoryName]: !selectedAccessories[accesoryName] },
      );

      const newTotalPrice = _.sum(_.filter(
        availableAccessories,
        (value, name) => newSelectedAccessories[name],
      ).map(accesory => accesory.price));

      return {
        totalPrice: newTotalPrice,
        selectedAccessories: newSelectedAccessories,
      };
    }
    default:
      return state;
  }
}
