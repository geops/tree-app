export const SET_MANUAL_LOCATION = 'SET_MANUAL_LOCATION';
export const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
export const SET_PROJECTION_MODE = 'SET_PROJECTION_MODE';
export const SET_PROJECTION_RESULT = 'SET_PROJECTION_RESULT';

export function setManualLocation(manualLocation) {
  return { type: SET_MANUAL_LOCATION, manualLocation };
}

export function setMapLocation(mapLocation) {
  return { type: SET_MAP_LOCATION, mapLocation };
}

export function setProjectionMode(projectionMode) {
  return { type: SET_PROJECTION_MODE, projectionMode };
}

export function setProjectionResult(projectionResult) {
  return { type: SET_PROJECTION_RESULT, projectionResult };
}
