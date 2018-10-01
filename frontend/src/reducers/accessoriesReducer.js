import _ from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
  totalPrice: 0,
  allAccessories: [],
  chosenAccessories: [],
  hasFetchedAllAccessories: false,
  hasFetchedChosenAccessories: false,
  isLoading: true,
};

export default function accessoriesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.leadFetched:
      return {
        ...initialState,
        isLoading: state.isLoading,
        hasFetchedAllAccessories: state.hasFetchedAllAccessories,
        allAccessories: state.allAccessories,
      };
    case actionTypes.addAccessoryToChosens: {
      const { accessoryId } = action;
      const { allAccessories, chosenAccessories } = state;
      chosenAccessories.push(_.find(allAccessories, accessory => accessory.id === accessoryId));
      const newTotalPrice = _.sum(chosenAccessories.map(accessory => _.toNumber(accessory.price)));

      return {
        ...state,
        totalPrice: newTotalPrice,
        chosenAccessories,
      };
    }
    case actionTypes.deleteAccessoryFromChosens: {
      const { accessoryId } = action;
      const { chosenAccessories } = state;
      const newChosenAccessories = _.filter(
        chosenAccessories,
        accessory => accessory.id !== accessoryId,
      );
      const newTotalPrice =
        _.sum(newChosenAccessories.map(accessory => _.toNumber(accessory.price)));

      return {
        ...state,
        totalPrice: newTotalPrice,
        chosenAccessories: newChosenAccessories,
      };
    }
    case actionTypes.startedFetchingAllAccessories:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.allAccessoriesFetched: {
      return {
        ...state,
        isLoading: false,
        allAccessories: action.allAccessories,
        hasFetchedAllAccessories: true,
      };
    }
    case actionTypes.startedFetchingChosenAccessories:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.chosenAccessoriesFetched: {
      const { chosenAccessories } = action;
      const totalPrice = _.sum(chosenAccessories.map(accessory => _.toNumber(accessory.price)));

      return {
        ...state,
        isLoading: false,
        totalPrice,
        chosenAccessories,
        hasFetchedChosenAccessories: true,
      };
    }
    default:
      return state;
  }
}
