import actionTypes from '../actions/actionTypes';
import { PROVINCE_CABA, HERO_INSURANCE, PERSONAL_INSURANCE } from '../components/InsurancePage/constants';

const initialViewState = {
  optInOrOut: HERO_INSURANCE,
  query_province: PROVINCE_CABA,
  query_postal_code: '',
  query_age: 18,
};

export function insuranceViewReducer(state = initialViewState, action) {
  switch (action.type) {
    case actionTypes.insuranceSelected:
      return {
        selected: true,
        optOut: false,
        broker: action.quote.brokerName,
        price: action.quote.price,
        policy: action.quote.policy,
        optInOrOut: HERO_INSURANCE,
        insuranceChoice: action.insuranceChoice,
      };
    case actionTypes.insuranceOptOut:
      return {
        selected: true,
        optOut: true,
        optInOrOut: PERSONAL_INSURANCE,
        insuranceChoice: state.insuranceChoice,
      };
    default:
      return state;
  }
}

const initialInsuranceChoiceState = {
  opt_in_or_out: HERO_INSURANCE,
  query_province: PROVINCE_CABA,
  query_postal_code: '',
  query_age: 18,
};

export function insuranceChoiceReducer(state = initialInsuranceChoiceState, action) {
  switch (action.type) {
    case actionTypes.startedFetchingInsuranceChoice:
      return { isLoading: true };
    case actionTypes.insuranceChoiceFetched:
      return action.insuranceChoice || initialInsuranceChoiceState;
    default:
      return state;
  }
}
