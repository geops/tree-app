/* eslint-disable no-console */
import { applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-unresolved
import { locate, project } from '@geops/tree-lib';

import {
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
  setLocation,
  setLocationResult,
  setProjectionResult,
} from '../actions';
import { initialState } from '../reducers';

const projectionActionTypes = [
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
];

export const hochmontanAltitudinalZones = ['81', '82', '83'];

const runProject = (location, targetAltitudinalZone) => {
  let newTargetAltitudinalZone = targetAltitudinalZone;
  let { silverFirArea } = location;
  if (hochmontanAltitudinalZones.includes(targetAltitudinalZone)) {
    silverFirArea = targetAltitudinalZone.slice(1);
    newTargetAltitudinalZone = '80';
  }
  const newLocation = { ...location, silverFirArea };
  return project(newLocation, newTargetAltitudinalZone);
};

const projection = (store) => (next) => (action) => {
  const result = next(action);
  if (projectionActionTypes.includes(action.type)) {
    const { activeProfile, formLocation, mapLocation, projectionMode } =
      store.getState();
    const location =
      projectionMode === 'm'
        ? { ...formLocation, ...mapLocation }
        : { ...mapLocation, ...formLocation };
    location.forestType = formLocation.forestType || mapLocation.forestType;
    location.transition = formLocation.transition || mapLocation.transition;
    location.transitionForestType =
      formLocation.transitionForestType || mapLocation.transitionForestType;
    if (hochmontanAltitudinalZones.includes(location.altitudinalZone)) {
      if (projectionMode === 'm' || !formLocation.silverFirArea) {
        location.silverFirArea = location.altitudinalZone.slice(1);
      }
      if (projectionMode === 'm' || !formLocation.altitudinalZone) {
        location.altitudinalZone = '80';
      }
    }
    if (!location.transition) {
      delete location.transitionForestType;
      delete location.transitionAltitudinalZone;
    }
    store.dispatch(setLocation(location));

    try {
      const locateResult = locate(location, activeProfile);
      store.dispatch(setLocationResult(locateResult));
    } catch (error) {
      console.log('Locate error: ', error);
    }

    try {
      const projectionResult = { ...initialState.projectionResult };
      if (projectionMode === 'm') {
        const {
          targetAltitudinalZoneModerate: targetAZModerate,
          targetAltitudinalZoneExtreme: targetAZExtreme,
        } = mapLocation;
        projectionResult.moderate = runProject(location, targetAZModerate);
        projectionResult.extreme = runProject(location, targetAZExtreme);
      } else {
        const { targetAltitudinalZone: targetAZForm } = formLocation;
        projectionResult.form = runProject(location, targetAZForm);
      }
      store.dispatch(setProjectionResult(projectionResult));
    } catch (error) {
      console.log('Projection error: ', error);
    }
  }

  return result;
};

const middlewareProjection = applyMiddleware(projection);

export default middlewareProjection;
