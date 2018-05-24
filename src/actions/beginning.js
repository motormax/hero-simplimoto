import actionTypes from './actionTypes';

export const changeBikeModel = bikeModel => ({
  type: actionTypes.changeBikeModel, bikeModel,
});

export const noop = () => ({ type: 'NOOP' });

