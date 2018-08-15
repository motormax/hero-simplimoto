import actionTypes from '../actions/actionTypes';

const initialState = {
  financingSelected: false,
  financingForm: {
    paymentMethodId: '',
    issuerId: '',
    installments: 1,
    paymentMethodName: '',
    paymentMethodLogo: '',
    issuerLogo: '',
    issuerName: '',
    message: '',
    costs: '',
    monthlyAmount: 0,
  },
};

export default function financingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.financingSelected:
      return {
        financingSelected: true,
        financingForm: action.financingForm,
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
