import actionTypes from '../actions/actionTypes';

const initialState = {
  financingSelected: false,
  financingForm: {
    provider: '',
    paymentMethodId: '',
    paymentMethodName: '',
    paymentMethodLogo: '',
    issuerId: '',
    issuerLogo: '',
    issuerName: '',
    installments: null,
    message: '',
    costs: '',
    monthlyAmount: 0,
    cashAmount: 0,
  },
};

export default function financingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingFinancing:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.financingSelected:
      return action.financingForm ? {
        financingSelected: true,
        financingForm: action.financingForm,
      } : initialState;
    case actionTypes.cashAmountConfirmed:
      return {
        ...state,
        financingForm: {
          cashAmount: action.cashAmount,
        },
      };
    case actionTypes.financingChanged:
      return {
        financingSelected: true,
        financingForm: {
          ...state.financingForm,
          message: action.financingForm.message,
          costs: action.financingForm.costs,
          monthlyAmount: action.financingForm.monthlyAmount,
        },
      };
    default:
      return state;
  }
}
