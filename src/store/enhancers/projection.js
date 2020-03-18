/* eslint-disable no-console */
import { locate, project } from '@geops/tree-lib';
import { applyMiddleware } from 'redux';

import {
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
  setLocation,
  setLocateResult,
  setProjectionResult,
} from '../actions';

const projectionActionTypes = [
  SET_FORM_LOCATION,
  SET_MAP_LOCATION,
  SET_PROJECTION_MODE,
];

const hochmontanAltitudinalZones = ['81', '82', '83'];

const getProjectionConfig = (location, targetAltitudinalZone) => {
  let newTargetAltitudinalZone = targetAltitudinalZone;
  let { altitudinalZone, silverFirArea } = location;
  if (hochmontanAltitudinalZones.includes(targetAltitudinalZone)) {
    silverFirArea = targetAltitudinalZone.slice(1);
    newTargetAltitudinalZone = '80';
  }
  if (hochmontanAltitudinalZones.includes(altitudinalZone)) {
    altitudinalZone = '80';
  }
  return {
    location: { ...location, altitudinalZone, silverFirArea },
    targetAltitudinalZone: newTargetAltitudinalZone,
  };
};

const projection = store => next => action => {
  const result = next(action);
  if (projectionActionTypes.includes(action.type)) {
    const { formLocation, mapLocation, projectionMode } = store.getState();
    const location =
      projectionMode === 'm'
        ? { ...formLocation, ...mapLocation }
        : { ...mapLocation, ...formLocation };
    if (!location.transition) {
      delete location.transitionForestType;
      delete location.transitionAltitudinalZone;
    }
    store.dispatch(setLocation(location));

    try {
      const locateResult = locate(location);
      store.dispatch(setLocateResult(locateResult));
    } catch (error) {
      console.log('Locate error: ', error);
    }

    const projectionConfig = [];
    if (projectionMode === 'm') {
      const {
        targetAltitudinalZoneModerate: moderateZone,
        targetAltitudinalZoneExtreme: extremeZone,
      } = mapLocation;
      projectionConfig.push(getProjectionConfig(location, moderateZone));
      projectionConfig.push(getProjectionConfig(location, extremeZone));
    } else {
      const { targetAltitudinalZone: targetZone } = formLocation;
      projectionConfig.push(getProjectionConfig(location, targetZone));
    }

    try {
      const projectionResult = projectionConfig.map(config =>
        project(config.location, config.targetAltitudinalZone),
      );
      store.dispatch(setProjectionResult(projectionResult));
    } catch (error) {
      console.log('Projection error: ', error);
    }
  }

  return result;
};

export default applyMiddleware(projection);
