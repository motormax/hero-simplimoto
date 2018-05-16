import { combineReducers } from 'redux';
import stageReducer from './fundingReducer';

const stagesReducer = combineReducers({
  funding: stageReducer,
  // Translate this to english eventually
  // accesorios: stageReducer,
  // customaizaciones: stageReducer,
  // seguro: stageReducer,
  // patentamiento: stageReducer,
});


const defaultState = {
  currentBikeModel: 'DASH',
  stages: undefined,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_BIKE_MODEL':
      return {
        ...state,
        currentBikeModel: action.bikeModel,
        stages: stagesReducer(undefined, action),
      };
    default:
      return ({
        ...state,
        stages: stagesReducer(state.stages, action),
      });
  }
};

export default {
  main: reducer,
};
