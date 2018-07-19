import actionTypes from './actionTypes';

export const deliveryFetched = delivery => ({
  type: actionTypes.deliveryFetched,
  delivery,
});

export const startedFetchingDelivery = () => ({
  type: actionTypes.startedFetchingDelivery,
});
