/* eslint-disable no-console, import/no-unresolved */
import { project } from '@geops/tree-lib';
import { applyMiddleware } from 'redux';
import qs from 'query-string';

import {
  SET_PROJECTION_MODE,
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  setProjectionResult,
  SET_RECOMMENDATION_MODE,
} from '../actions';

const projectionActionTypes = [
  SET_PROJECTION_MODE,
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_RECOMMENDATION_MODE,
];

const parsed = qs.parse(window.location.search);

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

function basedOnManual(formLocation, recommendationMode, mapLocation) {
  let targetAltitudinalZone;
  if (parsed.manual) {
    targetAltitudinalZone = formLocation.targetAltitudinalZone;
  } else {
    targetAltitudinalZone = getTargetAltitudinalZone(
      recommendationMode,
      mapLocation,
    );
  }
  return targetAltitudinalZone;
}

const projection = store => next => action => {
  const result = next(action);
  if (projectionActionTypes.includes(action.type)) {
    const {
      formLocation,
      mapLocation,
      projectionMode,
      recommendationMode,
    } = store.getState();
    const location =
      projectionMode === 'm'
        ? { ...formLocation, ...mapLocation }
        : { ...mapLocation, ...formLocation };

    const targetAltitudinalZone =
      projectionMode === 'm'
        ? getTargetAltitudinalZone(recommendationMode, mapLocation)
        : basedOnManual(formLocation, recommendationMode, mapLocation);
    console.log('target alti ', targetAltitudinalZone);
    try {
      const projectionResult = project(location, targetAltitudinalZone);
      store.dispatch(setProjectionResult(projectionResult, location));
      console.log('Projection result: ', projectionResult, location);
    } catch (error) {
      console.log('Projection error: ', error);
    }
  }

  return result;
};

export default applyMiddleware(projection);
