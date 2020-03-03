import projections from '../data/projections.json';
import types from '../data/types.json';

const fields = [
  'forestEcoregion',
  'altitudinalZone',
  'forestType',
  'slope',
  'additional',
  'silverFirArea',
  'relief',
];
const fieldsConcat = ['slope', 'additional', 'silverFirArea', 'relief'];
const concat = (x, y) =>
  Array.from(new Set((x || []).concat(y))).sort((a, b) => a - b);

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

function projectionReducer(location, targetAltitudePointer, result) {
  const { options } = result;
  let projection = projections;
  for (let i = 0; i < fields.length; i += 1) {
    const { field, value, values } = getField(fields[i], location);
    validate(field, value, values);

    options[field] = fieldsConcat.includes(field)
      ? concat(options[field], Object.keys(projection))
      : options[field] || Object.keys(projection);

    if (value && projection[value]) {
      projection = projection[value];
    } else if (projection.unknown) {
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

  if (typeof projection === 'string') {
    const [altitudinalZone, forestType] = projection.split(':');
    if (altitudeList.indexOf(altitudinalZone) <= targetAltitudePointer) {
      result.projections.push({ altitudinalZone, forestType });
    }
  }

  return { ...result, options };
}

/**
 * This function projects the forest type for a given location into the future.
 *
 * @param {object} location The current location.
 * @param {string} targetAltitude Code for target altitudinal zone.
 * @param {object} [previousResult] Only for internal use.
 * @returns {object} Includes projections and options.
 */
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

  if (result && location.forestType && altitudeIdx !== -1) {
    result.options.targetAltitudinalZone = altitudeList.slice(altitudeIdx + 1);
  }

  if (location.transitionForestType) {
    const { transitionForestType, transitionAltitudinalZone, ...tl } = location;
    tl.forestType = transitionForestType;
    tl.altitudinalZone = transitionAltitudinalZone;
    const { options, projections: tp } = project(tl, targetAltitude);
    Object.entries(options).forEach(([k, v]) => {
      if (fieldsConcat.includes(k)) {
        result.options[k] = concat(result.options[k], v);
      }
    });
    result.projections = result.projections.map(p => {
      const i = tp.findIndex(t => t.altitudinalZone === p.altitudinalZone);
      return { ...p, transitionForestType: tp[i] && tp[i].forestType };
    });
  }

  // Replace alphanumeric sorting with custom sorting based on database export
  if (result.options.forestType) {
    result.options.forestType = types.forestType
      .filter(ft => result.options.forestType.includes(ft.code))
      .map(ft => ft.code);
  }

  return result;
}

export default project;
