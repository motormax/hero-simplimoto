import actionTypes from './actionTypes';

export const insuranceSelected = (quote, query) => ({
  type: actionTypes.insuranceSelected,
  quote,
  query,
});

export const insuranceOptOut = () => ({
  type: actionTypes.insuranceOptOut,
});

export const noop = () => ({ type: 'NOOP' });

