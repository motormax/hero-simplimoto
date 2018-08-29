import actionTypes from './actionTypes';

export const plateRegistrationFetched = (plateRegistrationData, plateRegistrationTypes) => ({
  type: actionTypes.plateRegistrationFetched,
  plateRegistrationData,
  plateRegistrationTypes,
});

export const startedFetchingPlateRegistration = () => ({
  type: actionTypes.startedFetchingPlateRegistration,
});
