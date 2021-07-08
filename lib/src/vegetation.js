import vegetationInfo from '../data/vegetation.json';
import { ch } from '../data/types.json';

const emptyVegetationInfo = { herb: [[], []], bush: [[], []], moss: [[], []] };

const findForestType = (c) => ch.forestType.find((f) => f.code === c);

/**
 * This function lists all vegetations for the forest type at a given location.
 *
 * @param {object} location
 * @param {object} location.forestType Required code for forest type at current location.
 * @returns {array} Nested arrays of vegetation codes.
 */
function vegetation(location = {}) {
  const { forestType } = location;
  if (!forestType) {
    throw new Error(`forestType is missing`);
  }

  if (findForestType(forestType) === undefined) {
    throw new Error(`${forestType} is not valid`);
  }

  const [, info] = Object.entries(vegetationInfo).find(
    (t) => t[0] === forestType,
  );
  return info || emptyVegetationInfo;
}

export default vegetation;
