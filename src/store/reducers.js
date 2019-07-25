import {
  SET_MANUAL_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
  SET_PROJECTION_RESULT,
} from './actions';

const initialState = {
  manualLocation: {},
  mapLocation: {},
  projectionMode: 'map',
  projectionLocation: {},
  projectionOptions: {},
};

function tree(state = initialState, action) {
  switch (action.type) {
    case SET_MANUAL_LOCATION:
      return { ...state, manualLocation: action.manualLocation };
    case SET_MAP_LOCATION:
      return { ...state, mapLocation: action.mapLocation };
    case SET_PROJECTION_MODE:
      return { ...state, projectionMode: action.projectionMode };
    case SET_PROJECTION_RESULT: {
      const { options, ...projectionLocation } = action.projectionResult;
      return { ...state, projectionOptions: options, projectionLocation };
    }
    default:
      return state;
  }
}

export default tree;
