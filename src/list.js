import intersection from 'lodash.intersection';
import union from 'lodash.union';

import recommendations from '../data/recommendations.json';
import types from '../data/types.json';

const emptyLists = [[], [], [], []];

const byNumber = (a, b) => a > b;
const findForestType = c => types.forestType.find(f => f.code === c);
const nonresidents = c => types.treeType.find(t => t.code === c).nonresident;
const residents = c => !types.treeType.find(t => t.code === c).nonresident;

/**
 * This function lists all recommended tree types for the forest type at a given location.
 *
 * @param {object} location
 * @param {object} location.forestType Required code for forest type at current location.
 * @param {object} [location.transitionForestType] Optional code for transition forest type at current location.
 * @returns {array} Nested arrays of recommended tree type codes.
 */
function list(location = {}) {
  const { forestType, transitionForestType } = location;
  if (!forestType) {
    throw new Error(`forestType is missing`);
  }

  if (findForestType(forestType) === undefined) {
    throw new Error(`${forestType} is not valid`);
  }

  const [, lists] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  ) || [null, emptyLists];

  if (transitionForestType) {
    if (findForestType(transitionForestType) === undefined) {
      throw new Error(`${transitionForestType} is not valid`);
    }

    const [, transitionLists] = Object.entries(recommendations).find(
      t => t[0] === transitionForestType,
    ) || [null, emptyLists];

    lists[0] = union(
      intersection(lists[0], transitionLists[0]),
      intersection(lists[0], transitionLists[1]),
    ).sort(byNumber);

    lists[1] = union(
      intersection(lists[0], transitionLists[2]),
      intersection(lists[1], transitionLists[0]),
      intersection(lists[1], transitionLists[1]),
      intersection(lists[1], transitionLists[2]),
      intersection(lists[2], transitionLists[0]),
    ).sort(byNumber);

    lists[2] = union(
      intersection(lists[2], transitionLists[1]),
      intersection(lists[2], transitionLists[2]),
    ).sort(byNumber);

    lists[3] = union(lists[3], transitionLists[3]).sort(byNumber);
  }

  return lists.map(trees =>
    trees.filter(residents).concat(trees.filter(nonresidents)),
  );
}

export default list;
