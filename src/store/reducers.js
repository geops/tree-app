import {
  SET_FORM_LOCATION,
  SET_MAP_LAYER,
  SET_MAP_LOCATION,
  SET_MAP_VIEW,
  SET_PAGE,
  SET_PROJECTION_MODE,
  SET_PROJECTION_RESULT,
  SET_RECOMMENDATION_MODE,
  SET_WELCOME_MODAL,
} from './actions';
import { MAP_PAGE, RECOMMENDATION_PAGE } from '../components/Navigation';

export const initialState = {
  location: {},
  formLocation: {},
  mapLayer: 'ft',
  mapLocation: {},
  mapView: '9|910001|5947112',
  page: MAP_PAGE,
  projectionMode: 'm',
  projectionLocation: {},
  projectionOptions: {},
  recommendationMode: 'extreme',
  welcomeModalOpen: localStorage.getItem('tree.welcomeModal') !== 'close',
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
      const projectionMode = 'f';
      return { ...state, formLocation, projectionMode };
    }
    case SET_MAP_LAYER:
      return { ...state, mapLayer: action.mapLayer };
    case SET_MAP_LOCATION: {
      const { formLocation, projectionMode } = initialState;
      const { mapLocation } = action;
      const page = RECOMMENDATION_PAGE;
      return { ...state, formLocation, mapLocation, page, projectionMode };
    }
    case SET_MAP_VIEW:
      return { ...state, mapView: action.mapView };
    case SET_PAGE:
      return { ...state, page: action.page };
    case SET_PROJECTION_MODE:
      return { ...state, projectionMode: action.projectionMode };
    case SET_PROJECTION_RESULT: {
      const { location, projectionResult: result } = action;
      const { options: projectionOptions, ...projectionLocation } = result;
      return { ...state, location, projectionOptions, projectionLocation };
    }
    case SET_RECOMMENDATION_MODE:
      return { ...state, recommendationMode: action.recommendationMode };
    case SET_WELCOME_MODAL:
      localStorage.setItem('tree.welcomeModal', action.open ? 'open' : 'close');
      return { ...state, welcomeModalOpen: action.open };
    default:
      return state;
  }
}

export default tree;
