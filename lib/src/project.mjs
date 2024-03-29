import projections from '../data/projections.json';
import types from '../data/types.json';

const { ch } = types;
const fields = [
  'forestEcoregion',
  'altitudinalZone',
  'forestType',
  'slope',
  'additional',
  'silverFirArea',
  'relief',
];
const secondaryFields = ['slope', 'additional', 'silverFirArea', 'relief'];
const concat = (x, y) =>
  Array.from(new Set((x || []).concat(y))).sort((a, b) => a - b);

const altitudeList = ch.altitudinalZone
  .map((az) => az.code)
  .sort((a, b) => a - b)
  .reverse();

// Replace alphanumeric sorting with custom sorting based on database export
const sortForestTypes = (ftCodes) =>
  ftCodes?.length &&
  ch.forestType.filter((ft) => ftCodes.includes(ft.code)).map((ft) => ft.code);

const getField = (field, location) => ({
  field,
  value: location[field],
  values: ch[field],
});

const validate = (field, value, values) => {
  if (value && values && values.find((v) => v.code === value) === undefined) {
    throw new Error(`${value} for ${field} is not valid.`);
  }
};
const valueNotInOptions = (value, fieldOptions) =>
  value && fieldOptions && fieldOptions.find((v) => v === value) === undefined;

function projectionReducer(location, targetAltitudePointer, result) {
  const { options } = result;
  let projection = projections;
  for (let i = 0; i < fields.length; i += 1) {
    const { field, value, values } = getField(fields[i], location);
    validate(field, value, values);

    options[field] = secondaryFields.includes(field)
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
    } else if (secondaryFields.includes(field)) {
      // Fall back to first projection for secondary fields.
      projection = projection[options[field][0]];
    } else {
      // Location does not provide any more values for conditions.
      break;
    }
  }

  projection = Object.entries(projection)
    .map((p) => ({
      altitudinalZone: p[0],
      forestType: p[1],
      altitudePointer: altitudeList.indexOf(p[0]),
    }))
    .sort((a, b) => a.altitudePointer - b.altitudePointer)
    .reverse()
    .find(({ altitudePointer }) => altitudePointer <= targetAltitudePointer);
  if (projection && typeof projection.forestType === 'string') {
    const { altitudinalZone, forestType } = projection;
    result.projections.push({ altitudinalZone, forestType });
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

  validate('targetAltitudinalZone', targetAltitude, ch.altitudinalZone);

  const previous = result.projections.slice(-1)[0];
  result = projectionReducer(location, targetAltitudeIdx, result);
  const last = result.projections.slice(-1)[0];
  const lastAltitudeIdx = last && altitudeList.indexOf(last.altitudinalZone);

  if (previous && previous.altitudinalZone === last.altitudinalZone) {
    // Could not find projection to targetAltitude
    result.projections = [];

    // Try to find projection using "unknown" for secondary fields.
    for (let i = 0; i < secondaryFields.length; i += 1) {
      const secondaryField = secondaryFields[i];
      if (location[secondaryField] !== 'unknown') {
        const secondaryLocation = { ...location, [secondaryField]: 'unknown' };
        result = project(secondaryLocation, targetAltitude, result);
        break;
      }
    }
  } else if (lastAltitudeIdx < targetAltitudeIdx) {
    result = project({ ...location, ...last }, targetAltitude, result);
  }

  if (result && location.forestType && altitudeIdx !== -1) {
    result.options.targetAltitudinalZone = altitudeList.slice(altitudeIdx);
  }

  if (location.transitionForestType) {
    const { transitionForestType, transitionAltitudinalZone, ...tl } = location;
    tl.forestType = transitionForestType;
    tl.altitudinalZone = transitionAltitudinalZone || tl.altitudinalZone;
    const transition = project(tl, targetAltitude);
    const tp = transition.projections || [];
    Object.entries(transition.options).forEach(([k, v]) => {
      if (secondaryFields.includes(k)) {
        result.options[k] = concat(result.options[k], v);
      }
    });
    result.options.transitionForestType = sortForestTypes(
      transition.options.forestType,
    );
    result.projections = result.projections.map((p) => {
      const i = tp.findIndex((t) => t.altitudinalZone === p.altitudinalZone);
      return { ...p, transitionForestType: tp[i] && tp[i].forestType };
    });
  }

  if (result.options.forestType) {
    result.options.forestType = sortForestTypes(result.options.forestType);
  }

  if (!previousResult && result.projections.length === 0) {
    delete result.projections;
  }

  return result;
}

export default project;
