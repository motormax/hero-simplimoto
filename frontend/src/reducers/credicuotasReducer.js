import actionTypes from '../actions/actionTypes';

const initialState = {
  installments: undefined,
  loading: false,
};

export default function credicuotasReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingCredicuotasInstallments:
      return { isLoading: true };
    case actionTypes.credicuotasInstallmentsFetched:
      return {
        installments: action.installments,
      };
    default:
      return state;
  }
}
