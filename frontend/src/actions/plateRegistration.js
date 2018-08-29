import actionTypes from './actionTypes';

export const plateRegistrationFetched = (plateRegistrationData, plateRegistrationTypes) => ({
  type: actionTypes.plateRegistrationFetched,
  plateRegistrationData,
  plateRegistrationTypes,
});

export const startedFetchingPlateRegistration = () => ({
  type: actionTypes.startedFetchingPlateRegistration,
});

export const changePlateRegistrationData = plateRegistrationData => ({
  type: actionTypes.changePlateRegistrationData,
  plateRegistrationData,
});
