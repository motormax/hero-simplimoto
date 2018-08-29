import actionTypes from './actionTypes';

export const plateRegistrationTypesFetched = plateRegistrationTypes => ({
  type: actionTypes.plateRegistrationTypesFetched,
  plateRegistrationTypes,
});

export const startedFetchingPlateRegistrationTypes = () => ({
  type: actionTypes.startedFetchingPlateRegistrationTypes,
});
