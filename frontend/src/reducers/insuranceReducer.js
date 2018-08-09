import actionTypes from '../actions/actionTypes';
import { PROVINCE_CABA, HERO_INSURANCE, PERSONAL_INSURANCE } from '../components/InsurancePage/constants';

const initialState = {
  optInOrOut: HERO_INSURANCE,
  query: {
    province: PROVINCE_CABA,
    postalCode: '',
    age: 1,
  },
};

export default function deliveryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.insuranceSelected:
      return {
        selected: true,
        optOut: false,
        broker: action.quote.brokerName,
        price: action.quote.price,
        policy: action.quote.policy,
        optInOrOut: HERO_INSURANCE,
        query: action.query,
      };
    case actionTypes.insuranceOptOut:
      return {
        selected: true,
        optOut: true,
        optInOrOut: PERSONAL_INSURANCE,
      };
    default:
      return state;
  }
}
