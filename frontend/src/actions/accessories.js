import actionTypes from './actionTypes';

export const allAccessoriesFetched = allAccessories => ({
  type: actionTypes.allAccessoriesFetched,
  allAccessories,
});

export const startedFetchingAllAccessories = () => ({
  type: actionTypes.startedFetchingAllAccessories,
});

export const chosenAccessoriesFetched = chosenAccessories => ({
  type: actionTypes.chosenAccessoriesFetched,
  chosenAccessories,
});

export const startedFetchingChosenAccessories = () => ({
  type: actionTypes.startedFetchingChosenAccessories,
});

export const addAccessoryToChosens = accessoryId => ({
  type: actionTypes.addAccessoryToChosens, accessoryId,
});

export const deleteAccessoryFromChosens = accessoryId => ({
  type: actionTypes.deleteAccessoryFromChosens, accessoryId,
});
