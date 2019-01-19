import actionTypes from '../actions/actionTypes';

const initialState = {
  installments: {
    installments: undefined,
    loading: false,
  },
  verificationCode: {
    verificationId: undefined,
    loading: false,
  },
  personalInstallments: {
    installments: undefined,
    loading: false,
  },
};

export default function credicuotasReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingCredicuotasInstallments:
      return {
        ...state,
        installments: { loading: true },
      };
    case actionTypes.credicuotasInstallmentsFetched:
      return {
        ...state,
        installments: {
          loading: false,
          installments: action.installments,
        },
      };
    case actionTypes.startedFetchingCredicuotasPersonalInstallments:
      return {
        ...state,
        personalInstallments: { loading: true },
      };
    case actionTypes.credicuotasPersonalInstallmentsFetched:
      return {
        ...state,
        personalInstallments: {
          loading: false,
          installments: action.installments,
        },
      };
    case actionTypes.startedFetchingCredicuotasVerificationCode:
      return {
        ...state,
        verificationCode: { loading: true },
      };
    case actionTypes.credicuotasVerificationCodeFetched:
      return {
        ...state,
        verificationCode: {
          loading: false,
          verificationId: action.verificationId,
        },
      };
    default:
      return state;
  }
}
