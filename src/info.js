import types from '../data/types.json';

function info(type, code) {
  if (!types[type]) {
    throw new Error(`${type} is not a valid type.`);
  }

  const result = types[type].find(t => t.code === code);

  if (!result) {
    throw new Error(`${type}.${code} is not a valid code.`);
  }

  return result;
}

export default info;
