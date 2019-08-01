import {
  SET_FORM_LOCATION,
  SET_MAP_LAYER,
  SET_MAP_LOCATION,
  SET_MAP_VIEW,
  SET_PROJECTION_MODE,
  SET_PROJECTION_RESULT,
  SET_RECOMMENDATION_MODE,
} from './actions';

export const initialState = {
  location: {},
  formLocation: {},
  mapLayer: 'ft',
  mapLocation: {},
  mapView: '9|910001|5947112',
  projectionMode: 'm',
  projectionLocation: {},
  projectionOptions: {},
  recommendationMode: 'extreme',
};

function tree(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_LOCATION:
      return {
        ...state,
        formLocation: { ...state.formLocation, ...action.formLocation },
      };
    case SET_MAP_LAYER:
      return { ...state, mapLayer: action.mapLayer };
    case SET_MAP_LOCATION: {
      const projectionMode = 'm';
      return { ...state, mapLocation: action.mapLocation, projectionMode };
    }
    case SET_MAP_VIEW:
      return { ...state, mapView: action.mapView };
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
