/* eslint-disable no-console */
import { project } from '@geops/tree-lib';
import { applyMiddleware } from 'redux';

import {
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
  setLocation,
  setProjectionResult,
} from '../actions';

const projectionActionTypes = [
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
];

const projection = store => next => action => {
  const result = next(action);
  if (projectionActionTypes.includes(action.type)) {
    const { formLocation, mapLocation, projectionMode } = store.getState();
    const location =
      projectionMode === 'm'
        ? { ...formLocation, ...mapLocation }
        : { ...mapLocation, ...formLocation };
    const targetAltitudinalZone =
      projectionMode === 'm'
        ? mapLocation.targetAltitudinalZoneExtreme
        : formLocation.targetAltitudinalZone;
    store.dispatch(setLocation(location));
    try {
      const projectionResult = project(location, targetAltitudinalZone);
      store.dispatch(setProjectionResult(projectionResult));
    } catch (error) {
      console.log('Projection error: ', error);
    }
  }

  return result;
};

export default applyMiddleware(projection);
