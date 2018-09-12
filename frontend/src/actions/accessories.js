import actionTypes from './actionTypes';

export const allAccessoriesFetched = allAccessories => ({
  type: actionTypes.allAccessoriesFetched,
  allAccessories,
});

export const startedFetchingAllAccessories = () => ({
  type: actionTypes.startedFetchingAllAccessories,
});

export const toggleAccessorySelection = accesoryName => ({
  type: actionTypes.toggleAccessorySelection, accesoryName,
});
