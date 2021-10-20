export const SET_FORM_LOCATION = 'SET_FORM_LOCATION';
export const SET_LATIN_ACTIVE = 'SET_LATIN_ACTIVE';
export const SET_LOCATION_RESULT = 'SET_LOCATION_RESULT';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_MAP_LAYER = 'SET_MAP_LAYER';
export const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
export const SET_MAP_VIEW = 'SET_MAP_VIEW';
export const SET_PROJECTION_MODE = 'SET_PROJECTION_MODE';
export const SET_PROJECTION_RESULT = 'SET_PROJECTION_RESULT';
export const SET_TARGET_ALTITUDINAL_ZONE = 'SET_TARGET_ALTITUDINAL_ZONE';
export const SET_WELCOME_MODAL = 'SET_WELCOME_MODAL';
export const SET_ACTIVE_PROFILE = 'SET_ACTIVE_PROFILE';
export const SET_FORESTTYPE_COMPARISON = 'SET_FORESTTYPE_COMPARISON';
export const SET_FORESTTYPE_DESCRIPTION = 'SET_FORESTTYPE_DESCRIPTION';
export const SET_FORESTTYPE_MODAL = 'SET_FORESTTYPE_MODAL';

export function setFormLocation(formLocation) {
  return { type: SET_FORM_LOCATION, formLocation };
}

export function setLatinActive(latinActive) {
  return { type: SET_LATIN_ACTIVE, latinActive };
}

export function setLocationResult(locationResult) {
  return { type: SET_LOCATION_RESULT, locationResult };
}

export function setLocation(location) {
  return { type: SET_LOCATION, location };
}

export function setMapLayer(mapLayer) {
  return { type: SET_MAP_LAYER, mapLayer };
}

export function setMapView(mapView) {
  return { type: SET_MAP_VIEW, mapView };
}

export function setMapLocation(mapLocation, resetFormLocation) {
  return { type: SET_MAP_LOCATION, mapLocation, resetFormLocation };
}

export function setProjectionMode(projectionMode) {
  return { type: SET_PROJECTION_MODE, projectionMode };
}

export function setProjectionResult(projectionResult, location) {
  return { type: SET_PROJECTION_RESULT, projectionResult, location };
}

export function setTargetAltitudinalZone(targetAltitudinalZone) {
  return { type: SET_TARGET_ALTITUDINAL_ZONE, targetAltitudinalZone };
}

export function setWelcomeModal(open) {
  return { type: SET_WELCOME_MODAL, open };
}

export function setActiveProfile(activeProfile) {
  return { type: SET_ACTIVE_PROFILE, activeProfile };
}

export function setForestTypeComparison(
  forestTypeComparison,
  openModal = true,
) {
  return { type: SET_FORESTTYPE_COMPARISON, forestTypeComparison, openModal };
}

export function setForestTypeDescription(
  forestTypeDescription,
  openModal = true,
) {
  return { type: SET_FORESTTYPE_DESCRIPTION, forestTypeDescription, openModal };
}

export function setForestTypeModal(forestTypeModal) {
  return { type: SET_FORESTTYPE_MODAL, forestTypeModal };
}
