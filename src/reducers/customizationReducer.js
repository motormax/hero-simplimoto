const defaultState = {
  isDefault: false,
  isCompleted: false,
  chosenMirror: 0,
  chosenSeat: 0,
  chosenColor: 0,
};
export default function customizationReducer(state = defaultState, action) {
  switch (action.type) {
    case 'CHANGE_MIRROR':
      return {
        ...state,
        chosenMirror: action.chosenOption,
      };
    case 'CHANGE_SEAT':
      return {
        ...state,
        chosenSeat: action.chosenOption,
      };
    case 'CHANGE_COLOR':
      return {
        ...state,
        chosenColor: action.chosenOption,
      };
    default:
      return state;
  }
}
