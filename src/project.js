import projections from '../data/projections.json';
import types from '../data/types.json';

const fields = [
  'forestType',
  'forestEcoregion',
  'altitudinalZone',
  'slope',
  'additional',
  'silverFirArea',
  'relief',
];

const altitudeList = types.altitudinalZone
  .map(az => az.code)
  .sort((a, b) => a - b)
  .reverse();

const getField = (field, location) => ({
  field,
  value: location[field],
  values: types[field],
});

const validate = (field, value, values) => {
  if (value && values && values.find(v => v.code === value) === undefined) {
    throw new Error(`${value} for ${field} is not valid.`);
  }
};

/* Provides the list of altitudinal Zones as target Altitudinal zones that are immediately 
after the currently chosen altitudinal Zone. */
const nextAltitudinalZone = current =>
  altitudeList[altitudeList.indexOf(current) + 1];

function projectionReducer(location, targetAltitude) {
  const newLocation = { ...location, options: location.options || {} };

  let forestType = projections;
  for (let i = 0; i < fields.length; i += 1) {
    const { field, value, values } = getField(fields[i], location);

    validate(field, value, values);

    newLocation.options[field] = newLocation.options[field]
      ? Array.from(
          new Set(newLocation.options[field].concat(Object.keys(forestType))),
        ).sort((a, b) => a - b)
      : Object.keys(forestType);

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

  if (targetAltitude !== location.altitudinalZone) {
    if (typeof forestType === 'string') {
      newLocation.forestType = forestType;
    }
    newLocation.altitudinalZone = nextAltitudinalZone(location.altitudinalZone);
  }

  return newLocation;
}

function project(location = {}, targetAltitude) {
  const altitudePointer = altitudeList.indexOf(location.altitudinalZone);
  const altitudinalZone = targetAltitude || location.altitudinalZone;

  validate('targetAltitudinalZone', targetAltitude, types.altitudinalZone);

  let newLocation = projectionReducer(location, altitudinalZone);
  if (targetAltitude && newLocation.altitudinalZone !== targetAltitude) {
    newLocation = project(newLocation, targetAltitude);
  }

  if (newLocation && altitudePointer !== -1) {
    newLocation.options.targetAltitudinalZone = [
      location.altitudinalZone,
      ...altitudeList.slice(altitudePointer + 1),
    ];
  }

  // Replace alphanumeric sorting with custom sorting based on database export
  newLocation.options.forestType = types.forestType
    .filter(ft => newLocation.options.forestType.includes(ft.code))
    .map(ft => ft.code);

  return newLocation;
}

export default project;
