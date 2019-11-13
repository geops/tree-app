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

function projectionReducer(location, targetAltitudePointer, result) {
  const { options } = result;
  let projection = projections;
  for (let i = 0; i < fields.length; i += 1) {
    const { field, value, values } = getField(fields[i], location);
    validate(field, value, values);

    options[field] = Array.from(
      new Set((options[field] || []).concat(Object.keys(projection))),
    ).sort((a, b) => a - b);

    if (value && projection[value]) {
      projection = projection[value];
    } else if (projection.unknown && Object.keys(projection).length === 1) {
      // Handle optional fields.
      projection = projection.unknown;
    } else if (valueNotInOptions(value, options[field])) {
      // Do not return location values if no projection was found.
      return { ...result, options };
    } else {
      // Location does not provide any more values for conditions.
      break;
    }
  }

  if (
    typeof projection === 'string' &&
    altitudeList.indexOf(location.altitudinalZone) < targetAltitudePointer
  ) {
    result.projections.push({
      forestType: projection,
      altitudinalZone: nextAltitudinalZone(location.altitudinalZone),
    });
  }

  return { ...result, options };
}

function project(location = {}, targetAltitude, previousResult) {
  const altitudeIdx = altitudeList.indexOf(location.altitudinalZone);
  const targetAltitudeIdx = altitudeList.indexOf(targetAltitude);
  let result = previousResult || { options: {}, projections: [] };

  validate('targetAltitudinalZone', targetAltitude, types.altitudinalZone);

  const previous = result.projections.slice(-1)[0];
  result = projectionReducer(location, targetAltitudeIdx, result);
  const last = result.projections.slice(-1)[0];
  const lastAltitudeIdx = last && altitudeList.indexOf(last.altitudinalZone);

  if (previous && previous.altitudinalZone === last.altitudinalZone) {
    // Could not find projection to targetAltitude
    result.projections = [];
  } else if (lastAltitudeIdx < targetAltitudeIdx) {
    result = project({ ...location, ...last }, targetAltitude, result);
  }

  if (result && altitudeIdx !== -1) {
    result.options.targetAltitudinalZone = altitudeList.slice(altitudeIdx + 1);
  }

  // Replace alphanumeric sorting with custom sorting based on database export
  result.options.forestType = types.forestType
    .filter(ft => result.options.forestType.includes(ft.code))
    .map(ft => ft.code);

  return result;
}

export default project;
