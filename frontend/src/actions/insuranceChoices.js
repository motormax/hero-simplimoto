import actionTypes from './actionTypes';

export const insuranceSelected = (quote, brokerName, brokerLogo, query) => ({
  type: actionTypes.insuranceSelected,
  quote,
  broker: brokerName,
  brokerLogo,
  query,
});

export const insuranceOptOut = query => ({
  type: actionTypes.insuranceOptOut,
  query,
});

export const noop = () => ({ type: 'NOOP' });

