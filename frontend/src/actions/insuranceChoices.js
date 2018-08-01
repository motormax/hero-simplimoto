import actionTypes from './actionTypes';

export const insuranceSelected = (quote, brokerName, brokerLogo) => ({
  type: actionTypes.insuranceSelected,
  quote,
  broker: brokerName,
  brokerLogo,
});

export const insuranceOptOut = () => ({
  type: actionTypes.insuranceOptOut,
});

export const noop = () => ({ type: 'NOOP' });

