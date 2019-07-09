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

const validLanguages = ['de'];

function project(location, language) {
  if (!validLanguages.includes(language)) {
    throw new Error(`${language} is not supported.`);
  }
  const options = {};
  let target = projections;
  for (let i = 0; i < conditions.length; i += 1) {
    const { field, values } = conditions[i];
    const value = location[field];

    // Validation
    if (value && values && values.find(v => v.key === value) === undefined) {
      throw new Error(`${value} for ${field} is not valid.`);
    }

    const keys = Object.keys(target);
    options[field] = values
      .filter(v => keys.includes(v.key))
      .map(v => ({ key: v.key, label: v[language] }));

    if (value && target[value]) {
      target = target[value];
    } else {
      // Location does not provide any more values for conditions.
      break;
    }
  }
  const newLocation = { ...location, options };
  if (typeof target === 'string') {
    newLocation.target = types.forestType.find(t => t.key === target)[language];
  }
  return newLocation;
}

export default project;
