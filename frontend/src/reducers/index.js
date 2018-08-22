/* eslint-env browser */

import dateYourBikeReducer from './dateYourBikeReducer';
import deliveryReducer from './deliveryReducer';
import fundingReducer from './fundingReducer';
import plateRegistrationDataReducer from './plateRegistrationDataReducer';
import insuranceReducer from './insuranceReducer';
import accessoriesReducer from './accessoriesReducer';
import actionTypes from '../actions/actionTypes';
import customizationsReducer from './customizationsReducer';


const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.cancelPurchase:
      window.localStorage.removeItem('leadId');
      return defaultState;
    case actionTypes.leadFetched:
      window.localStorage.setItem('leadId', action.lead.id);

      return {
        ...state,
        lead: action.lead,
        customization: customizationsReducer(undefined, action),
        funding: fundingReducer(undefined, action),
        dateYourBike: dateYourBikeReducer(undefined, action),
        delivery: deliveryReducer(undefined, action),
        plateRegistrationData: plateRegistrationDataReducer(undefined, action),
        insurance: insuranceReducer(undefined, action),
        accessories: accessoriesReducer(undefined, action),
      };
    case actionTypes.startedFetchingLead:
      return {
        ...state,
        lead: { isLoading: true },
      };
    default:
      return ({
        ...state,
        customization: customizationsReducer(state.customization, action),
        funding: fundingReducer(state.funding, action),
        dateYourBike: dateYourBikeReducer(state.dateYourBike, action),
        delivery: deliveryReducer(state.delivery, action),
        plateRegistrationData: plateRegistrationDataReducer(state.plateRegistrationData, action),
        insurance: insuranceReducer(state.insurance, action),
        accessories: accessoriesReducer(state.accessories, action),
      });
  }
};

export default {
  main: reducer,
};
