import actionTypes from './actionTypes';

export const insuranceSelected = (quote, insuranceChoice) => ({
  type: actionTypes.insuranceSelected,
  quote,
  insuranceChoice,
});

export const insuranceOptOut = () => ({
  type: actionTypes.insuranceOptOut,
});

export const noop = () => ({ type: 'NOOP' });

export const insuranceChoiceFetched = insuranceChoice => ({
  type: actionTypes.insuranceChoiceFetched,
  insuranceChoice,
});

export const startedFetchingInsuranceChoice = () => ({
  type: actionTypes.startedFetchingInsuranceChoice,
});
