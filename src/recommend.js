import recommendations from '../data/recommendations.json';

function recommendTreeSpecies(forestType) {
  const [, treeSpecies] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  );
  return treeSpecies;
}

function concatTreeSpecies(treeSp1, treeSp2) {
  return Array.from(new Set([...treeSp1, ...treeSp2]));
}

function recommend(...forestType) {
  let result;
  if (forestType.length === 0) {
    throw new Error(
      `at least one forest type is required to get the recommendation of tree species`,
    );
  } else if (forestType.length === 1) {
    result = recommendTreeSpecies(forestType[0]);
  } else if (forestType.length === 2) {
    const { one, two, three } = recommendTreeSpecies(forestType[0]);
    const { one: one2, two: two2, three: three2 } = recommendTreeSpecies(
      forestType[1],
    );
    result = {
      one: concatTreeSpecies(one, one2),
      two: concatTreeSpecies(two, two2),
      three: concatTreeSpecies(three, three2),
    };
  }

  return result;
}

export default recommend;
