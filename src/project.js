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
    field: 'heightLevel',
    values: types.heightLevel,
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
    field: 'tannenareal',
    values: types.tannenareal,
  },
  {
    field: 'relief',
    values: types.relief,
  },
];

const heightLevelList = types.heightLevel
  .filter(e => e.id !== 1 && e.id !== 2 && e.id !== 4 && e.id !== 8)
  .map(e => e.key)
  .reverse();

const getNextHeigtLevel = currentHeightLevel =>
  heightLevelList[heightLevelList.indexOf(currentHeightLevel) + 1];

function projectionReducer(location) {
  const options = {};
  let forestType = projections;
  for (let i = 0; i < conditions.length; i += 1) {
    const { field, values } = conditions[i];
    const value = location[field];

    // Validation
    if (value && values && values.find(v => v.key === value) === undefined) {
      throw new Error(`${value} for ${field} is not valid.`);
    }

    options[field] = Object.keys(forestType);

    if (value && forestType[value]) {
      forestType = forestType[value];
    } else {
      // Location does not provide any more values for conditions.
      break;
    }
  }

  if (typeof forestType !== 'string') {
    throw new Error('Found no projection for selected targetHeightLevel.');
  }

  const heightLevel = getNextHeigtLevel(location.heightLevel);
  return { ...location, options, forestType, heightLevel };
}

function project(location, targetHeightLevel) {
  if (types.heightLevel.find(v => v.key === targetHeightLevel) === undefined) {
    throw new Error(`${targetHeightLevel} for targetHeightLevel is not valid.`);
  }

  const heightLevelPointer = heightLevelList.indexOf(location.heightLevel);
  let newLocation;
  if (heightLevelList[heightLevelPointer] !== targetHeightLevel) {
    newLocation = projectionReducer(location);
    if (newLocation.heightLevel !== targetHeightLevel) {
      newLocation = project(newLocation, targetHeightLevel);
    }
  }
  return newLocation;
}

export default project;
