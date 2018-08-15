import actionTypes from '../actions/actionTypes';
import { HERO_PLATE_REGISTRATION } from '../components/PlateRegistrationPage/constants';

const initialState = {
  opt_in_or_out: HERO_PLATE_REGISTRATION,
};

export default function plateRegistrationDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingPlateRegistrationData:
      return {
        isLoading: true,
        opt_in_or_out: action.optInOrOut,
      };
    case actionTypes.plateRegistrationDataFetched:
      return action.plateRegistrationData || initialState;
    default:
      return state;
  }
}
