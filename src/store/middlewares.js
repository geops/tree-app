/* eslint-disable no-console */
import { project } from '@geops/tree-lib';
import { initialState } from './reducers';

import {
  SET_PROJECTION_MODE,
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  setProjectionResult,
  SET_RECOMMENDATION_MODE,
} from './actions';

const projectionActionTypes = [
  SET_PROJECTION_MODE,
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_RECOMMENDATION_MODE,
];

let projectionResult;

function getTargetAltitudinalZone(recommendationMode, location) {
  switch (recommendationMode) {
    case 'today':
      return location.altitudinalZone;
    case 'moderate':
      return location.targetAltitudinalZoneModerate;
    case 'extreme':
      return location.targetAltitudinalZoneExtreme;
    default:
      return location.altitudinalZone;
  }
}

export const projection = store => next => action => {
  const result = next(action);
  if (projectionActionTypes.includes(action.type)) {
    const {
      formLocation,
      mapLocation,
      projectionMode,
      recommendationMode,
      projectionLocation,
    } = store.getState();
    let location =
      projectionMode === 'm'
        ? { ...formLocation, ...mapLocation }
        : { ...mapLocation, ...formLocation };

    const targetAltitudinalZone =
      projectionMode === 'm'
        ? getTargetAltitudinalZone(recommendationMode, mapLocation)
        : formLocation.targetAltitudinalZone;
    try {
      if (projectionMode === 'm') {
        if (projectionLocation && location.coordinate === undefined) {
          projectionResult = { options: { forestType: [] } };
        }

        if (
          projectionLocation.coordinate === undefined &&
          location.coordinate &&
          mapLocation.forestType === undefined
        ) {
          projectionResult = { options: { forestType: [] } };
        }

        if (
          projectionLocation.coordinate === undefined &&
          location.coordinate &&
          mapLocation.forestType
        ) {
          projectionResult = project(mapLocation, targetAltitudinalZone);
        }

        if (
          projectionLocation &&
          projectionLocation.coordinate &&
          projectionLocation.coordinate !== location.coordinate &&
          mapLocation.forestType === undefined
        ) {
          projectionResult = { options: { forestType: [] } };
        }

        if (
          projectionLocation &&
          projectionLocation.coordinate &&
          projectionLocation.coordinate !== location.coordinate &&
          mapLocation.forestType
        ) {
          projectionResult = { options: { forestType: [] } };
        }
      }

      if (projectionMode === 'f') {
        if (mapLocation.forestType === undefined && location.coordinate) {
          projectionResult = project(location, targetAltitudinalZone);
        }

        if (
          mapLocation.forestType &&
          location.coordinate &&
          projectionLocation
        ) {
          projectionResult = project(mapLocation, targetAltitudinalZone);
          location = { ...mapLocation };
        } else {
          projectionResult = project(location, targetAltitudinalZone);
        }
      }

      store.dispatch(setProjectionResult(projectionResult, location));
      console.log('Projection result: ', projectionResult, location);
    } catch (error) {
      console.log('Projection error: ', error);
    }
  }

  return result;
};

export default {};
