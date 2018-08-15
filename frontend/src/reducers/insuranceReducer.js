import actionTypes from '../actions/actionTypes';
import { PROVINCE_CABA, HERO_INSURANCE } from '../components/InsurancePage/constants';

const initialState = {
  insuranceForm: {
    optInOrOut: HERO_INSURANCE,
    province: PROVINCE_CABA,
    postalCode: '',
    age: 0,
  },
};

export default function insuranceReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.insuranceSelected:
      return {
        selected: true,
        optOut: false,
        price: action.quote.price,
        policy: action.quote.policy,
        broker: action.broker,
        brokerLogo: action.brokerLogo,
        insuranceForm: action.insuranceForm,
      };
    case actionTypes.insuranceOptOut:
      return {
        selected: true,
        optOut: true,
        insuranceForm: action.insuranceForm,
      };
    default:
      return state;
  }
}
