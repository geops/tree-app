import types from '../data/types.json';

/**
 * This function returns meta information about a given type and code.
 * If the code parameter is missing a list of all available codes is returned.
 * This meta information includes translations and type specific data.
 * See [data/types.json](https://github.com/geops/tree-lib/blob/master/data/types.json) for all available types and codes.
 *
 * @param {string} type A valid type.
 * @param {string} [code] A valid code for the given type.
 * @returns {object} Includes all meta information.
 */
function info(type, code) {
  let result = types[type];
  if (!result) {
    throw new Error(`${type} is not a valid type.`);
  }

  if (code) {
    result = types[type].find(t => t.code === code);

    if (!result) {
      throw new Error(`${type}.${code} is not a valid code.`);
    }
  }

  return result;
}

export default info;
