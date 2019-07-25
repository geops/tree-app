/* eslint-disable no-console */
import { project } from '@geops/tree-lib';

import {
  SET_PROJECTION_MODE,
  SET_MANUAL_LOCATION,
  SET_MAP_LOCATION,
  setProjectionResult,
} from './actions';

const projectionActionTypes = [
  SET_PROJECTION_MODE,
  SET_MANUAL_LOCATION,
  SET_MAP_LOCATION,
];

export const projection = store => next => action => {
  const result = next(action);
  if (projectionActionTypes.includes(action.type)) {
    const { manualLocation, mapLocation, projectionMode } = store.getState();
    const location =
      projectionMode === 'map'
        ? { ...manualLocation, ...mapLocation }
        : { ...mapLocation, ...manualLocation };
    const targetAltitudinalZone =
      projectionMode === 'map'
        ? mapLocation.targetAltitudinalZoneModerate
        : manualLocation.targetAltitudinalZone;
    try {
      console.log(location);
      const projectionResult = project(location, targetAltitudinalZone);
      store.dispatch(setProjectionResult(projectionResult));
      console.log('Projection result: ', projectionResult);
    } catch (error) {
      console.log('Projection error: ', error);
    }
  }
  return result;
};

export default {};
