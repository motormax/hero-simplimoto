import actionTypes from '../actions/actionTypes';

const initialState = {};

export default function deliveryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.insuranceSelected:
      return {
        selected: true,
        optOut: false,
        price: action.quote.price,
        policy: action.quote.policy,
        broker: action.broker,
        brokerLogo: action.brokerLogo,
      };
    case actionTypes.insuranceOptOut:
      return {
        selected: true,
        optOut: true,
      };
    default:
      return state;
  }
}
