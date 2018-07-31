import actionTypes from './actionTypes';

export const changeBikeModel = bikeModel => ({
  type: actionTypes.changeBikeModel, bikeModel,
});

export const userFetched = user => ({
  type: actionTypes.userFetched,
  user,
});

export const startedFetchingUser = () => ({
  type: actionTypes.startedFetchingUser,
});

export const insuranceSelected = (quote, brokerName) => ({
  type: actionTypes.insuranceSelected,
  quote,
  broker: brokerName,
});

export const noop = () => ({ type: 'NOOP' });

