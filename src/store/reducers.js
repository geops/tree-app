import {
  SET_LOCATION,
  SET_FORM_LOCATION,
  SET_MAP_LAYER,
  SET_MAP_LOCATION,
  SET_MAP_VIEW,
  SET_PROJECTION_MODE,
  SET_PROJECTION_RESULT,
  SET_WELCOME_MODAL,
} from './actions';

export const initialState = {
  location: {},
  formLocation: {},
  mapLayer: 'ft',
  mapLocation: {},
  mapView: '9|910001|5947112',
  projectionMode: 'm',
  projectionOptions: {},
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
    case SET_LOCATION: {
      return { ...state, location: action.location };
    }
    case SET_FORM_LOCATION: {
      return { ...state, formLocation: getFormLocation(state, action) };
    }
    case SET_MAP_LAYER:
      return { ...state, mapLayer: action.mapLayer };
    case SET_MAP_LOCATION: {
      return { ...state, mapLocation: action.mapLocation, projectionMode: 'm' };
    }
    case SET_MAP_VIEW:
      return { ...state, mapView: action.mapView };
    case SET_PROJECTION_MODE:
      return { ...state, projectionMode: action.projectionMode };
    case SET_PROJECTION_RESULT: {
      return { ...state, projectionResult: action.projectionResult };
    }
    case SET_WELCOME_MODAL:
      localStorage.setItem('tree.welcomeModal', action.open ? 'open' : 'close');
      return { ...state, welcomeModalOpen: action.open };
    default:
      return state;
  }
}

export default tree;
