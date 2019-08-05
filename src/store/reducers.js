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

const formLocationFields = [
  'forestType',
  'forestEcoregion',
  'altitudinalZone',
  'additional',
  'silverFirArea',
  'relief',
  'targetAltitudinalZone',
];
const getFormLocation = (state, action) => {
  const formLocation = { ...state.formLocation, ...action.formLocation };
  let reset = false;
  for (let i = 0; i < formLocationFields.length; i += 1) {
    const formField = formLocationFields[i];
    if (action.formLocation[formField] === '') {
      reset = true;
    }
    if (reset) {
      delete formLocation[formField];
    }
  }
  return formLocation;
};

function tree(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_LOCATION: {
      const formLocation = getFormLocation(state, action);
      return { ...state, formLocation };
    }
    case SET_MAP_LAYER:
      return { ...state, mapLayer: action.mapLayer };
    case SET_MAP_LOCATION: {
      const { formLocation, projectionMode } = initialState;
      const { mapLocation } = action;
      return { ...state, formLocation, mapLocation, projectionMode };
    }
    case SET_MAP_VIEW:
      return { ...state, mapView: action.mapView };
    case SET_PROJECTION_MODE:
      return { ...state, projectionMode: action.projectionMode };
    case SET_PROJECTION_RESULT: {
      const { location, projectionResult: result } = action;
      const { options: projectionOptions, ...projectionLocation } = result;
      return { ...state, location, projectionOptions, projectionLocation };
    }
    case SET_RECOMMENDATION_MODE:
      return { ...state, recommendationMode: action.recommendationMode };
    default:
      return state;
  }
}

export default tree;
