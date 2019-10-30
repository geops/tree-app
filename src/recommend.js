import difference from 'lodash.difference';
import intersection from 'lodash.intersection';
import union from 'lodash.union';
import xor from 'lodash.xor';

import list from './list';

const get3 = ([, , p3]) => p3;
const union12 = ([p1, p2]) => union(p1, p2);

function recommend(forestTypeToday, projections = [], future = false) {
  if (!forestTypeToday) {
    throw new Error('forestTypeToday is required');
  }
  if (projections.reduce((c, p) => (p.forestType ? c + 1 : null), 0) < 1) {
    throw new Error('at least 1 projected forestType is required');
  }
  if (future && typeof future !== 'boolean') {
    throw new Error(`expected boolean type for future flag`);
  }

  const today = list(forestTypeToday);
  const [today1, today2, today3, today4] = today;
  const t123 = union(today1, today2, today3);
  const p = projections.map(({ forestType }) => list(forestType));
  const multi = projections.length > 1;

  return [
    intersection(t123, intersection(...p.map(union12))), // Level 1
    multi ? intersection(t123, xor(...p.map(union12))) : [], // Level 2
    future ? difference(intersection(...p.map(union12)), t123) : [], // Level 3
    future && multi ? difference(xor(...p.map(union12)), t123) : [], // Level 4
    intersection(t123, intersection(...p.map(get3))), // Level 5
    multi ? intersection(t123, xor(...p.map(get3))) : [], // Level 6
    future ? difference(intersection(...p.map(get3)), t123) : [], // Level 7
    future && multi ? difference(xor(...p.map(get3)), t123) : [], // Level 8
    difference(t123, union(...p.map(x => union(...x)))), // Level 9
    union(today4, ...p.map(([, , , p4]) => p4)), // Level 10
  ];
}

export default recommend;
