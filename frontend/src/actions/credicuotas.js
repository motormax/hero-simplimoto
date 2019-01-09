import actionTypes from './actionTypes';

export const startedFetchingCredicuotasInstallments = () => ({
  type: actionTypes.startedFetchingCredicuotasInstallments,
});

export const credicuotasInstallmentsFetched = installments => ({
  type: actionTypes.credicuotasInstallmentsFetched,
  installments,
});

export const startedFetchingCredicuotasPersonalInstallments = () => ({
  type: actionTypes.startedFetchingCredicuotasPersonalInstallments,
});

export const credicuotasPersonalInstallmentsFetched = installments => ({
  type: actionTypes.credicuotasPersonalInstallmentsFetched,
  installments,
});

export const startedFetchingCredicuotasVerificationCode = () => ({
  type: actionTypes.startedFetchingCredicuotasVerificationCode,
});

export const credicuotasVerificationCodeFetched = ({ verification_id: verificationId }) => ({
  type: actionTypes.credicuotasVerificationCodeFetched,
  verificationId,
});
