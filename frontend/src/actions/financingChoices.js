import actionTypes from './actionTypes';

export const financingSelected = financingForm => ({
  type: actionTypes.financingSelected,
  financingForm,
});

export const financingChanged = financingForm => ({
  type: actionTypes.financingChanged,
  financingForm,
});

export const noop = () => ({ type: 'NOOP' });

