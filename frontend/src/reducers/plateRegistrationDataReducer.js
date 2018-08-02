import actionTypes from '../actions/actionTypes';

const initialState = {};

export default function plateRegistrationDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingPlateRegistrationData:
      return { isLoading: true };
    case actionTypes.plateRegistrationDataFetched:
      return action.plateRegistrationData || initialState;
    default:
      return state;
  }
}
