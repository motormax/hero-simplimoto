import actionTypes from './actionTypes';

export const insuranceSelected = (quote, brokerName, query) => ({
  type: actionTypes.insuranceSelected,
  quote,
  brokerName: brokerName,
  query,
});

export const insuranceOptOut = query => ({
  type: actionTypes.insuranceOptOut,
  query,
});

export const noop = () => ({ type: 'NOOP' });

