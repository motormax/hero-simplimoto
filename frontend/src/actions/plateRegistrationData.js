import actionTypes from './actionTypes';

export const plateRegistrationDataFetched = plateRegistrationData => ({
  type: actionTypes.plateRegistrationDataFetched,
  plateRegistrationData,
});

export const startedFetchingPlateRegistrationData = () => ({
  type: actionTypes.startedFetchingPlateRegistrationData,
});
