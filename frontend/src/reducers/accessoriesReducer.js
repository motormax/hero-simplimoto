import _ from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
  totalPrice: 0,
  selectedAccessories: {},
  allAccessories: [],
};

export default function accessoriesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.toggleAccessorySelection: {
      const { accesoryName } = action;
      const { selectedAccessories, allAccessories } = state;

      const newSelectedAccessories = Object.assign(
        {},
        selectedAccessories,
        { [accesoryName]: !selectedAccessories[accesoryName] },
      );

      const newTotalPrice = _.sum(_.filter(
        allAccessories,
        accessory => newSelectedAccessories[accessory.name],
      ).map(accesory => Number(accesory.price)));

      return {
        ...state,
        totalPrice: newTotalPrice,
        selectedAccessories: newSelectedAccessories,
      };
    }
    case actionTypes.startedFetchingAllAndChosenAccessories:
      return { isLoading: true };
    case actionTypes.allAndChosenAccessoriesFetched: {
      const { allAccessories, chosenAccessories } = action;
      const selectedAccessories = {};
      let totalPrice = 0;

      allAccessories.forEach((accessory) => {
        selectedAccessories[accessory.name] =
          chosenAccessories.some(chosenAccesory => chosenAccesory.name === accessory.name);
        totalPrice += Number(accessory.price);
      });

      return {
        allAccessories,
        selectedAccessories,
        totalPrice,
      };
    }
    default:
      return state;
  }
}
