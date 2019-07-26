/* eslint-disable no-console */
import { project } from '@geops/tree-lib';

import {
  SET_PROJECTION_MODE,
  SET_MANUAL_LOCATION,
  SET_MAP_LOCATION,
  setProjectionResult,
  SET_RECOMMENDATION_MODE,
} from './actions';

const projectionActionTypes = [
  SET_PROJECTION_MODE,
  SET_MANUAL_LOCATION,
  SET_MAP_LOCATION,
  SET_RECOMMENDATION_MODE,
];

function getRecommendationMode(recommendationMode, mapLocation) {
  let recommendationModeText;
  if (recommendationMode === 'today') {
    recommendationModeText = mapLocation.altitudinalZone;
  } else if (recommendationMode === 'moderate') {
    recommendationModeText = mapLocation.targetAltitudinalZoneModerate;
  } else if (recommendationMode === 'extreme') {
    recommendationModeText = mapLocation.targetAltitudinalZoneExtreme;
  }
  return recommendationModeText;
}

export const projection = store => next => action => {
  const result = next(action);
  if (projectionActionTypes.includes(action.type)) {
    const {
      manualLocation,
      mapLocation,
      projectionMode,
      recommendationMode,
    } = store.getState();
    const location =
      projectionMode === 'map'
        ? { ...manualLocation, ...mapLocation }
        : { ...mapLocation, ...manualLocation };

    const targetAltitudinalZone =
      projectionMode === 'map'
        ? getRecommendationMode(recommendationMode, mapLocation)
        : manualLocation.targetAltitudinalZone;
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

export default {};
