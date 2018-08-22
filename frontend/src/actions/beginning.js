import actionTypes from './actionTypes';

export const cancelPurchase = () => ({
  type: actionTypes.cancelPurchase,
});

export const leadFetched = lead => ({
  type: actionTypes.leadFetched,
  lead,
});

export const startedFetchingLead = () => ({
  type: actionTypes.startedFetchingLead,
});

export const noop = () => ({ type: 'NOOP' });

export const changeBikeColor = bikeColorIndex => ({
  type: actionTypes.changeBikeColor, bikeColorIndex,
});

export const toggleAccessorySelection = accesoryName => ({
  type: actionTypes.toggleAccessorySelection, accesoryName,
});
