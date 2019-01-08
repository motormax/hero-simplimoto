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
  },
};

export default function financingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingFinancing:
      return {
        isLoading: true,
      };
    case actionTypes.financingSelected:
      return action.financingForm ? {
        financingSelected: true,
        financingForm: action.financingForm,
      } : initialState;
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
