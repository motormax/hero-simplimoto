import actionTypes from '../actions/actionTypes';

const initialState = {};

export default function deliveryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingDelivery:
      return { isLoading: true };
    case actionTypes.deliveryFetched:
      return action.delivery;
    default:
      return state;
  }
}
