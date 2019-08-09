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
const valueNotInOptions = (value, fieldOptions) =>
  value && fieldOptions && fieldOptions.find(v => v === value) === undefined;

/* Provides the list of altitudinal Zones as target Altitudinal zones that are immediately 
after the currently chosen altitudinal Zone. */
const nextAltitudinalZone = current =>
  altitudeList[altitudeList.indexOf(current) + 1];

function projectionReducer(location, targetAltitude) {
  const newLocation = { ...location, options: location.options || {} };
  const options = location.options || {};

  let projection = projections;
  for (let i = 0; i < fields.length; i += 1) {
    const { field, value, values } = getField(fields[i], location);
    validate(field, value, values);

    options[field] = Array.from(
      new Set((options[field] || []).concat(Object.keys(projection))),
    ).sort((a, b) => a - b);

    if (valueNotInOptions(value, options[field])) {
      return { options };
    }

    if (value && projection[value]) {
      projection = projection[value];
    } else if (projection.unknown && Object.keys(projection).length === 1) {
      projection = projection.unknown;
      newLocation[field] = 'unknown';
    } else {
      // Location does not provide any more values for conditions.
      break;
    }
  }

  if (targetAltitude !== location.altitudinalZone) {
    if (typeof projection === 'string') {
      newLocation.forestType = projection;
    }
    newLocation.altitudinalZone = nextAltitudinalZone(location.altitudinalZone);
  }

  newLocation.options = options;
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
