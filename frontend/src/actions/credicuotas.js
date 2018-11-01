import actionTypes from './actionTypes';

export const startedFetchingCredicuotasInstallments = () => ({
  type: actionTypes.startedFetchingCredicuotasInstallments,
});

export const credicuotasInstallmentsFetched = installments => ({
  type: actionTypes.credicuotasInstallmentsFetched,
  installments,
});
