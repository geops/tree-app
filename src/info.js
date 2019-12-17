import types from '../data/types.json';

/**
 * This function returns meta information about a given type and code.
 * This meta information includes translations and type specific data.
 * See [data/types.json](https://github.com/geops/tree-lib/blob/master/data/types.json) for all available types and codes.
 *
 * @param {string} type A valid type.
 * @param {string} code A valid code for the given type.
 * @returns {object} Includes all meta information.
 */
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
