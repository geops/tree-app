import intersection from 'lodash.intersection';
import union from 'lodash.union';
import difference from 'lodash.difference';

import recommendations from '../data/recommendations.json';
import utils from './utils.mjs';

const { sortTreeTypes, findForestType } = utils();
const emptyLists = [[], [], [], []];

const getRecommendations = (forestType) => {
  const [, lists] = Object.entries(recommendations).find(
    (t) => t[0] === forestType,
  );
  return [...(lists || emptyLists)];
};

/**
 * This function lists all recommended tree types for the forest type at a given location.
 *
 * @param {object} location
 * @param {object} location.forestType Required code for forest type at current location.
 * @param {object} [location.transitionForestType] Optional code for transition forest type at current location.
 * @param {boolean} [mergeLevel4] Optional flag to merge level 4 into level 3.
 * @returns {array} Nested arrays of recommended tree type codes.
 */
function list(location = {}, mergeLevel4 = false) {
  const { forestType, transitionForestType } = location;
  if (!forestType) {
    throw new Error(`forestType is missing`);
  }

  if (findForestType(forestType) === undefined) {
    throw new Error(`${forestType} is not valid`);
  }

  const lists = getRecommendations(forestType);

  if (transitionForestType) {
    if (findForestType(transitionForestType) === undefined) {
      throw new Error(`${transitionForestType} is not valid`);
    }

    const [lists0, lists1, lists2, lists3] = lists;
    const transitionLists = getRecommendations(transitionForestType);

    lists[0] = union(
      intersection(lists0, transitionLists[0]),
      intersection(lists0, transitionLists[1]),
    );

    lists[1] = union(
      intersection(lists0, transitionLists[2]),
      intersection(lists1, transitionLists[0]),
      intersection(lists1, transitionLists[1]),
      intersection(lists1, transitionLists[2]),
      intersection(lists2, transitionLists[0]),
    );

    lists[2] = union(
      difference(transitionLists[0], lists.flat()),
      intersection(lists2, transitionLists[1]),
      intersection(lists2, transitionLists[2]),
    );

    lists[3] = union(lists3, transitionLists[3]);
  }

  if (mergeLevel4) {
    lists[2] = union(lists[2], lists[3]);
    lists[3] = [];
  }

  return sortTreeTypes(lists);
}

export default list;
