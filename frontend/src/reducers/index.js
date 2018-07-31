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
    case actionTypes.leadFetched:
      window.localStorage.setItem('leadId', action.lead.id);

      return {
        ...state,
        lead: action.lead,
        funding: fundingReducer(undefined, action),
        dateYourBike: dateYourBikeReducer(undefined, action),
        delivery: deliveryReducer(undefined, action),
      };
    case actionTypes.startedFetchingLead:
      return {
        ...state,
        lead: { isLoading: true },
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
