/* eslint-env browser */

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
        delivery: deliveryReducer(undefined, action),
      };
    case actionTypes.startedFetchingUser:
      return {
        ...state,
        user: { isLoading: true },
      };
    default:
      return ({
        ...state,
        funding: fundingReducer(state.funding, action),
        delivery: deliveryReducer(state.delivery, action),
      });
  }
};

export default {
  main: reducer,
};
