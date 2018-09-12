import actionTypes from './actionTypes';

export const allAndChosenAccessoriesFetched = (allAccessories, chosenAccessories) => ({
  type: actionTypes.allAndChosenAccessoriesFetched,
  allAccessories,
  chosenAccessories,
});

export const startedFetchingAllAndChosenAccessories = () => ({
  type: actionTypes.startedFetchingAllAndChosenAccessories,
});

export const toggleAccessorySelection = accesoryName => ({
  type: actionTypes.toggleAccessorySelection, accesoryName,
});
