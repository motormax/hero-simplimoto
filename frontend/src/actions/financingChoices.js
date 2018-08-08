import actionTypes from './actionTypes';

export const financingSelected = financingForm => ({
  type: actionTypes.financingSelected,
  financingForm,
});

export const noop = () => ({ type: 'NOOP' });

