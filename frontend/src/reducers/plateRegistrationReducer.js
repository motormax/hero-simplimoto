import actionTypes from '../actions/actionTypes';
import { HERO_PLATE_REGISTRATION } from '../components/PlateRegistrationPage/constants';


const initialState = {
  plateRegistrationData: {
    optInOrOut: HERO_PLATE_REGISTRATION,
  },
  plateRegistrationTypes: [],
};

export default function plateRegistrationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingPlateRegistration:
      return { isLoading: true };
    case actionTypes.plateRegistrationFetched:
      return {
        plateRegistrationData: action.plateRegistrationData || {},
        plateRegistrationTypes: action.plateRegistrationTypes || {},
      };
    case actionTypes.changePlateRegistrationData:
      return {
        ...state,
        plateRegistrationData: action.plateRegistrationData,
      };
    default:
      return state;
  }
}
