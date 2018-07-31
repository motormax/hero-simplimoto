/* eslint-env browser */

import dateYourBikeReducer from './dateYourBikeReducer';
import deliveryReducer from './deliveryReducer';
import fundingReducer from './fundingReducer';
import actionTypes from '../actions/actionTypes';


const defaultState = {
  currentBikeModel: 'DASH',
  stages: undefined,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.userFetched:
      window.localStorage.setItem('userId', action.user.id);

      return {
        ...state,
        user: action.user,
        funding: fundingReducer(undefined, action),
        dateYourBike: dateYourBikeReducer(undefined, action),
        delivery: deliveryReducer(undefined, action),
      };
    case actionTypes.startedFetchingUser:
      return {
        ...state,
        user: { isLoading: true },
      };
    case actionTypes.insuranceSelected:
      window.localStorage.setItem('insurancePrice', action.quote.price);
      window.localStorage.setItem('insuranceBroker', action.broker);

      return {
        ...state,
        insurancePrice: action.quote.price,
        insuranceBroker: action.broker,
      };
    default:
      return ({
        ...state,
        funding: fundingReducer(state.funding, action),
        dateYourBike: dateYourBikeReducer(state.dateYourBike, action),
        delivery: deliveryReducer(state.delivery, action),
      });
  }
};

export default {
  main: reducer,
};
