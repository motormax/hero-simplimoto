import actionTypes from './actionTypes';

export const changeBikeModel = bikeModel => ({
  type: actionTypes.changeBikeModel, bikeModel,
});

export const changeBikeColor = bikeColorIndex => ({
  type: actionTypes.changeBikeColor, bikeColorIndex,
});

export const leadFetched = lead => ({
  type: actionTypes.leadFetched,
  lead,
});

export const startedFetchingLead = () => ({
  type: actionTypes.startedFetchingLead,
});

export const noop = () => ({ type: 'NOOP' });

