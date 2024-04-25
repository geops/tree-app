import types from '../data/types.json';

/**
 * This function returns meta information about a given type and code.
 * If the code parameter is missing a list of all available codes is returned.
 * This meta information includes translations and type specific data.
 * See [data/types.json](https://github.com/geops/tree-lib/blob/master/data/types.json) for all available types and codes.
 *
 * @param {string} type A valid type.
 * @param {string} [code] A valid code for the given type.
 * @param {string} [profile] Profile code.
 * @returns {object} Includes all meta information.
 */
function info(type, code, profile = 'ch', lookup = 'code') {
  let result = types[profile];
  if (!result) {
    throw new Error(`${profile} is not a valid profile.`);
  }

  result = result[type];
  if (!result) {
    throw new Error(`${type} is not a valid type.`);
  }

  if (code) {
    result = result.find((t) => t[lookup] === code);

    if (!result) {
      throw new Error(`${type}.${lookup} is not a valid code.`);
    }
  }

  return result;
}

export default info;
