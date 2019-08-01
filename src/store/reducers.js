import {
  SET_MANUAL_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
  SET_PROJECTION_RESULT,
  SET_RECOMMENDATION_MODE,
} from './actions';

const initialState = {
  location: {},
  manualLocation: {},
  mapLocation: {},
  projectionMode: 'map',
  projectionLocation: {},
  projectionOptions: {},
  recommendationMode: 'extreme',
};

function tree(state = initialState, action) {
  switch (action.type) {
    case SET_MANUAL_LOCATION:
      return { ...state, manualLocation: action.manualLocation };
    case SET_MAP_LOCATION: {
      const projectionMode = 'map';
      return { ...state, mapLocation: action.mapLocation, projectionMode };
    }
    case SET_PROJECTION_MODE:
      return { ...state, projectionMode: action.projectionMode };
    case SET_PROJECTION_RESULT: {
      const { options, ...projectionLocation } = action.projectionResult;
      return {
        ...state,
        location: action.location,
        projectionOptions: options,
        projectionLocation,
      };
    }
    case SET_RECOMMENDATION_MODE:
      return { ...state, recommendationMode: action.recommendationMode };
    default:
      return state;
  }
}

export default tree;
