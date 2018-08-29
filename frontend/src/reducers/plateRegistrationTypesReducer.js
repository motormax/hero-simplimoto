import actionTypes from '../actions/actionTypes';

const initialState = [];

export default function plateRegistrationTypesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingPlateRegistrationTypes:
      return { isLoading: true };
    case actionTypes.plateRegistrationTypesFetched:
      return action.plateRegistrationTypes || initialState;
    default:
      return state;
  }
}
