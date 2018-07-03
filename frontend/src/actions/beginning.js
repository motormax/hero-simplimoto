import actionTypes from './actionTypes';

export const changeBikeModel = bikeModel => ({
  type: actionTypes.changeBikeModel, bikeModel,
});

export const userFetched = (user) => ({
  type: actionTypes.userFetched,
  user,
});

export const noop = () => ({ type: 'NOOP' });

