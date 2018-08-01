import actionTypes from '../actions/actionTypes';

const initialState = {
  color: 0,
};

export default function customizationsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.changeBikeColor:
      return { color: action.bikeColorIndex };
    default:
      return state;
  }
}
