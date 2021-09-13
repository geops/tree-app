import {
  SET_FORM_LOCATION,
  SET_LATIN_ACTIVE,
  SET_LOCATION_RESULT,
  SET_LOCATION,
  SET_MAP_LAYER,
  SET_MAP_LOCATION,
  SET_MAP_VIEW,
  SET_PROJECTION_MODE,
  SET_PROJECTION_RESULT,
  SET_TARGET_ALTITUDINAL_ZONE,
  SET_WELCOME_MODAL,
  SET_ACTIVE_PROFILE,
  SET_FORESTTYPE_INFO,
} from './actions';

const initialProjection = { options: {}, projections: [] };
export const initialState = {
  latinActive: false,
  location: {},
  formLocation: {},
  locationResult: { options: {} },
  mapLayer: 'cb',
  mapLocation: {},
  mapView: '9|2660013|1185171',
  projectionMode: 'm',
  projectionOptions: {},
  projectionResult: {
    moderate: initialProjection,
    extreme: initialProjection,
    form: initialProjection,
  },
  targetAltitudinalZone: null,
  welcomeModalOpen: localStorage.getItem('tree.welcomeModal') !== 'close',
};

const initialFormLocation = {
  forestEcoregion: null,
  altitudinalZone: null,
  silverFirArea: null,
  targetAltitudinalZone: null,
};

const getFormLocation = (state, action) => {
  const formLocation = { ...state.formLocation, ...action.formLocation };
  const formLocationFields = Object.keys(action.formLocation);
  for (let i = 0; i < formLocationFields.length; i += 1) {
    const fieldName = formLocationFields[i];
    const fieldValue = action.formLocation[fieldName];
    if (
      fieldValue === '' ||
      fieldValue === null ||
      fieldValue === undefined ||
      (Array.isArray(fieldValue) && fieldValue.length === 0)
    ) {
      delete formLocation[fieldName];
    }
  }
  return formLocation;
};

function tree(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_LOCATION: {
      return { ...state, formLocation: getFormLocation(state, action) };
    }
    case SET_LATIN_ACTIVE: {
      return { ...state, latinActive: action.latinActive };
    }
    case SET_LOCATION_RESULT: {
      return { ...state, locationResult: action.locationResult };
    }
    case SET_LOCATION: {
      return { ...state, location: action.location };
    }
    case SET_MAP_LAYER:
      return { ...state, mapLayer: action.mapLayer };
    case SET_MAP_LOCATION: {
      const { resetFormLocation } = action;
      const formLocation = resetFormLocation
        ? getFormLocation(state, { formLocation: initialFormLocation })
        : state.formLocation;
      const mapLocation = { ...state.mapLocation, ...action.mapLocation };
      if (mapLocation.forestType) {
        formLocation.forestType = undefined;
      }
      return { ...state, formLocation, mapLocation, projectionMode: 'm' };
    }
    case SET_MAP_VIEW:
      return { ...state, mapView: action.mapView };
    case SET_PROJECTION_MODE:
      return { ...state, projectionMode: action.projectionMode };
    case SET_PROJECTION_RESULT: {
      const { projectionResult } = action;
      const { formLocation } = state;
      const { options } = projectionResult.extreme;
      if (
        state.location.forestType &&
        options.forestType &&
        options.forestType.includes(state.location.forestType) === false
      ) {
        delete formLocation.forestType;
      }
      return { ...state, formLocation, projectionResult };
    }
    case SET_TARGET_ALTITUDINAL_ZONE: {
      return { ...state, targetAltitudinalZone: action.targetAltitudinalZone };
    }
    case SET_WELCOME_MODAL:
      localStorage.setItem('tree.welcomeModal', action.open ? 'open' : 'close');
      return { ...state, welcomeModalOpen: action.open };
    case SET_ACTIVE_PROFILE:
      localStorage.setItem('tree.profile', action.activeProfile);
      return { ...state, activeProfile: action.activeProfile };
    case SET_FORESTTYPE_INFO:
      return { ...state, forestTypeInfo: action.forestTypeInfo };
    default:
      return state;
  }
}

export default tree;
