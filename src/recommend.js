import recommendations from '../data/recommendations.json';
import types from '../data/types.json';

function recommendTreeSpecies(forestType) {
  if (types.forestType.find(v => v.code === forestType) === undefined) {
    throw new Error(`${forestType} is not a valid forest type`);
  }
  const [, treeSpecies] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  );
  return treeSpecies;
}

function concatTreeSpecies(...treeSp) {
  return Array.from(new Set([].concat(...treeSp)));
}

function filterTreeSpecies(treeSp1, treeSp2) {
  return treeSp1.filter(tree => !treeSp2.includes(tree));
}

function recommend(forestType1, forestType2, future) {
  if (!forestType1) {
    throw new Error(
      `at least one forest type is required to get the recommendation of tree species`,
    );
  }

  if (future && typeof future !== 'boolean') {
    throw new Error(`expected boolean type for future flag`);
  }

  let result = recommendTreeSpecies(forestType1);

  const { one, two, three } = result;
  if (forestType2) {
    const { one: one2, two: two2, three: three2 } = recommendTreeSpecies(
      forestType2,
    );
    if (future) {
      result = {
        one: filterTreeSpecies(one, one2),
        two: filterTreeSpecies(two, two2),
        three: filterTreeSpecies(three, three2),
      };
    } else {
      result = {
        one: concatTreeSpecies(one, one2, two, two2),
        two: concatTreeSpecies(three, three2),
        three: filterTreeSpecies(
          concatTreeSpecies(one, two, three),
          concatTreeSpecies(one2, two2, three2),
        ),
      };
    }
  }

  const { one: positive, two: neutral, three: negative } = result;
  result = { positive, neutral, negative };
  return result;
}

export default recommend;
