import recommendations from '../data/recommendations.json';
import types from '../data/types.json';

const emptyTreeSpecies = {
  one: [],
  two: [],
  three: [],
  four: [],
};

function recommendTreeSpecies(forestType) {
  if (types.forestType.find(v => v.code === forestType) === undefined) {
    throw new Error(`${forestType} is not a valid forest type`);
  }

  const [, treeSpecies] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  ) || [null, emptyTreeSpecies];
  return treeSpecies;
}

function concatTreeSpecies(...treeSp) {
  return Array.from(new Set([].concat(...treeSp)));
}

const arrayIntersected = (arr1, arr2) => arr1.filter(i => arr2.includes(i));
const arrayNotIntersected = (arr1, arr2) => arr1.filter(i => !arr2.includes(i));

function filterFourFrom123(previousResult) {
  const { one, two, three, four } = previousResult;
  const result = {
    one: arrayNotIntersected(one, four),
    two: arrayNotIntersected(two, four),
    three: arrayNotIntersected(three, four),
    four,
  };
  return result;
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

  const { one, two, three, four } = result;

  if (forestType2) {
    const {
      one: futureOne,
      two: futureTwo,
      three: futureThree,
      four: futureFour,
    } = recommendTreeSpecies(forestType2);
    if (future) {
      result = {
        one: arrayNotIntersected(
          concatTreeSpecies(futureOne, futureTwo),
          concatTreeSpecies(one, two, three),
        ),
        two: arrayNotIntersected(
          futureThree,
          concatTreeSpecies(one, two, three),
        ),
        three: [],
        four: futureFour || [],
      };
    } else {
      result = {
        one: arrayIntersected(
          concatTreeSpecies(one, two, three),
          concatTreeSpecies(futureOne, futureTwo),
        ),
        two: arrayIntersected(three, futureThree),
        three: arrayNotIntersected(
          concatTreeSpecies(one, two, three),
          concatTreeSpecies(futureOne, futureTwo, futureThree),
        ),
        four: four || [],
      };
    }
    if (result.four && result.four.length > 0) {
      result = filterFourFrom123(result);
    }
  }

  const {
    one: positive,
    two: neutral,
    three: negative,
    four: attention,
  } = result;
  result = { positive, neutral, negative, attention };

  return result;
}

export default recommend;
