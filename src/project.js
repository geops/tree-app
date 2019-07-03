import projections from '../data/projections.json';
import validTypes from '../data/valid_enum.json';

const conditions = [
  {
    field: 'forestEcoregion',
    values: validTypes.forestEcoregion,
    required: true,
  },
  {
    field: 'heightLevel',
    values: validTypes.heightLevel,
    required: true,
  },
  {
    field: 'slope',
    // TODO: Implement validation for range type
  },
  {
    field: 'forestType',
    values: validTypes.forestType,
    required: true,
  },
];

const findSlope = value => ([key]) => {
  const degreeSlope = key.replace(/\D/g, '');
  let found = false;
  if (value < degreeSlope && key === `<${degreeSlope}`) {
    found = true;
  } else if (key === `>${degreeSlope}`) found = true;
  return found;
};

const project = location => {
  let target = projections;
  for (let i = 0; i < conditions.length; i += 1) {
    const { field, required, values } = conditions[i];
    const value = location[field];

    // Validation
    if (required && value === undefined) {
      throw new Error(`Location is missing required ${field}.`);
    }
    if (value && values && values.find(v => v.key === value) === undefined) {
      throw new Error(`${value} for ${field} is not valid.`);
    }

    if (field === 'slope' && value && value !== 'unknown') {
      [, target] = Object.entries(target).find(findSlope(value));
    } else if (value && target[value]) {
      target = target[value];
    }
  }

  if (typeof target === 'string') {
    return target;
  }
  throw new Error(`Found no matching projection.`);
};

export const getOptions = (field, language) => {
  const values = validTypes[field];
  if (!values) {
    throw new Error(`${field} is not valid.`);
  }
  return values.map(v => ({ key: v.key, label: v[language] }));
};

export default project;
