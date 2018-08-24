import actionTypes from '../actions/actionTypes';

const initialInsuranceChoiceState = {};

export default function insuranceChoiceReducer(state = initialInsuranceChoiceState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingInsuranceChoice:
      return { isLoading: true };
    case actionTypes.insuranceChoiceFetched:
      return action.insuranceChoice || initialInsuranceChoiceState;
    default:
      return state;
  }
}
