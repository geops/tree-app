import projections from '../data/projections.json';
import types from '../data/types.json';

const conditions = [
  {
    field: 'forestType',
    values: types.forestType,
  },
  {
    field: 'forestEcoregion',
    values: types.forestEcoregion,
  },
  {
    field: 'altitudinalZone',
    values: types.altitudinalZone,
  },
  {
    field: 'slope',
    values: types.slope,
  },
  {
    field: 'additional',
    values: types.additional,
  },
  {
    field: 'silverFirArea',
    values: types.silverFirArea,
  },
  {
    field: 'relief',
    values: types.relief,
  },
];

const altitudinalZoneList = types.altitudinalZone
  .filter(e => e.id !== 1 && e.id !== 2 && e.id !== 4 && e.id !== 8)
  .map(e => e.code)
  .reverse();

/* Provides the list of altitudinal Zones as target Altitudinal zones that are immediately 
after the currently chosen altitudinal Zone. */
const getNextAltitudinalZone = currentaltitudinalZone =>
  altitudinalZoneList[altitudinalZoneList.indexOf(currentaltitudinalZone) + 1];

function projectionReducer(location, targetAltitudinalZone) {
  const newLocation = { ...location, options: {} };
  delete newLocation.forestType;

  let forestType = projections;
  for (let i = 0; i < conditions.length; i += 1) {
    const { field, values } = conditions[i];
    const value = location[field];

    // Validation
    if (value && values && values.find(v => v.code === value) === undefined) {
      throw new Error(`${value} for ${field} is not valid.`);
    }

    newLocation.options[field] = Object.keys(forestType);

    if (value && forestType[value]) {
      forestType = forestType[value];
    } else if (forestType.unknown && Object.keys(forestType).length === 1) {
      forestType = forestType.unknown;
      newLocation[field] = 'unknown';
    } else {
      // Location does not provide any more values for conditions.
      break;
    }
  }

  if (typeof forestType === 'string') {
    newLocation.forestType = forestType;
  }

  if (location.altitudinalZone && targetAltitudinalZone !== undefined) {
    newLocation.altitudinalZone = getNextAltitudinalZone(
      location.altitudinalZone,
    );
  } else {
    newLocation.altitudinalZone = location.altitudinalZone;
  }

  return newLocation;
}

function project(location = {}, targetAltitudinalZone) {
  const altitudinalZonePointer = altitudinalZoneList.indexOf(
    location.altitudinalZone,
  );

  if (
    targetAltitudinalZone &&
    types.altitudinalZone.find(v => v.code === targetAltitudinalZone) ===
      undefined
  ) {
    throw new Error(
      `${targetAltitudinalZone} for target altitudinal zone is not valid.`,
    );
  }

  let newLocation;

  if (
    altitudinalZoneList[altitudinalZonePointer] !== targetAltitudinalZone ||
    targetAltitudinalZone === undefined
  ) {
    newLocation = projectionReducer(location, targetAltitudinalZone);
    if (
      newLocation.altitudinalZone !== undefined &&
      targetAltitudinalZone !== undefined &&
      newLocation.altitudinalZone !== targetAltitudinalZone
    ) {
      newLocation = project(newLocation, targetAltitudinalZone);
    }
  }

  if (altitudinalZonePointer !== -1) {
    newLocation.options.targetAltitudinalZone = altitudinalZoneList.slice(
      altitudinalZonePointer + 1,
    );
  }

  return newLocation;
}

export default project;
