import difference from 'lodash.difference';
import intersection from 'lodash.intersection';
import union from 'lodash.union';
import xor from 'lodash.xor';

import list from './list.mjs';
import utils from './utils.mjs';

const { sortTreeTypes } = utils();

const removeDuplicates = (...nestedArray) => {
  const foundItems = [];
  return nestedArray.map((items) => {
    const uniqueItems = difference(items, foundItems);
    foundItems.push(...items);
    return uniqueItems;
  });
};

/**
 * This function recommends tree types based on a location and list of projections. Call this function with the result of the `project()` function.
 *
 * @param {object} location The current location.
 * @param {array} projections The result of the `project()` function.
 * @param {boolean} [future] Optional flag to include tree types for the future.
 * @returns {array} Nested arrays of recommended tree type codes.
 */
function recommend(location = {}, projections = [], future = false) {
  if (!location.forestType) {
    throw new Error('location.forestType is required');
  }
  if (projections.reduce((c, p) => (p.forestType ? c + 1 : null), 0) < 1) {
    throw new Error('at least 1 projected forestType is required');
  }
  if (future && typeof future !== 'boolean') {
    throw new Error(`expected boolean type for future flag`);
  }

  const [today1, today2, today3, today4] = list(location);
  const t123 = union(today1, today2, today3);
  const p = projections.map((x) => list(x));
  const p12 = p.map(([x1, x2]) => union(x1, x2));
  const p3 = p.map(([, , x3]) => x3);
  const p4 = p.map(([, , , x4]) => x4);
  const pAll = p.map((x) => union(...x));
  const isFuture = (x) => (future ? x : []);
  const isMulti = (x) => (projections.length > 1 ? x : []);

  return sortTreeTypes(
    removeDuplicates(
      intersection(t123, intersection(...p12)), //                                   Level 1
      isMulti(intersection(t123, intersection(xor(...p12), xor(...p3)))), //         Level 2/3
      isFuture(difference(intersection(...p12), t123)), //                           Level 4
      isFuture(
        isMulti(difference(intersection(xor(...p12), xor(...p3)), t123)),
      ), // Level 5/6
      intersection(t123, intersection(...p3)), //                                    Level 7
      isMulti(intersection(t123, difference(xor(...p12), xor(...p3)))), //           Level 8/9
      isFuture(difference(intersection(...p3), t123)), //                            Level 10
      isFuture(
        isMulti(
          union(
            difference(difference(xor(...p12), union(...p3)), t123),
            difference(difference(xor(...p3), union(...p12)), t123),
          ),
        ),
      ), //                                                                          Level 11/12/13/14
      union(
        intersection(t123, difference(xor(...p3), union(...p12))),
        difference(t123, union(...pAll)),
      ), //                                                                          Level 15/16/17
      union(today4, ...p4), //                                                       Level 18 (attention)
      isFuture(difference(xor(...p4), ...today4)), //                                Level 19 (attention)
    ),
  );
}

export default recommend;
