import actionTypes from './actionTypes';

export const insuranceSelected = (quote, brokerName, brokerLogo, insuranceForm) => ({
  type: actionTypes.insuranceSelected,
  quote,
  broker: brokerName,
  brokerLogo,
  insuranceForm,
});

export const insuranceOptOut = insuranceForm => ({
  type: actionTypes.insuranceOptOut,
  insuranceForm,
});

export const noop = () => ({ type: 'NOOP' });

