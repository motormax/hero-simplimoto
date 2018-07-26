import actionTypes from '../actions/actionTypes';

const initialState = {};

export default function dateYourBikeReducerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingAppointment:
      return { isLoading: true };
    case actionTypes.appointmentFetched:
      return action.appointmentDate || initialState;
    default:
      return state;
  }
}
