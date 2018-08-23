import actionTypes from './actionTypes';

export const insuranceChoiceFetched = insuranceChoice => ({
  type: actionTypes.insuranceChoiceFetched,
  insuranceChoice,
});

export const startedFetchingInsuranceChoice = () => ({
  type: actionTypes.startedFetchingInsuranceChoice,
});
