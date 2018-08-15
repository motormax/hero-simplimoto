/* eslint-env browser */

import dateYourBikeReducer from './dateYourBikeReducer';
import deliveryReducer from './deliveryReducer';
import fundingReducer from './fundingReducer';
import plateRegistrationDataReducer from './plateRegistrationDataReducer';
import { insuranceViewReducer, insuranceChoiceReducer } from './insuranceReducer';
import accessoriesReducer from './accessoriesReducer';
import financingReducer from './financingReducer';
import actionTypes from '../actions/actionTypes';
import customizationsReducer from './customizationsReducer';


const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
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
        insurance: insuranceViewReducer(undefined, action),
        insuranceChoice: insuranceChoiceReducer(undefined, action),
        accessories: accessoriesReducer(undefined, action),
        financing: financingReducer(undefined, action),
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
        insurance: insuranceViewReducer(state.insurance, action),
        insuranceChoice: insuranceChoiceReducer(state.insuranceChoice, action),
        accessories: accessoriesReducer(state.accessories, action),
        financing: financingReducer(state.financing, action),
      });
  }
};

export default {
  main: reducer,
};
