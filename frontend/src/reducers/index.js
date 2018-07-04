/* eslint-env browser */

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
      };
    default:
      return ({
        ...state,
        funding: fundingReducer(state.funding, action),
      });
  }
};

export default {
  main: reducer,
};
