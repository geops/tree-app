import recommendations from '../data/recommendations.json';
import types from '../data/types.json';

const emptyTreeSpecies = {
  one: [],
  two: [],
  three: [],
  four: [],
};

function list(forestType) {
  if (!forestType) {
    throw new Error(`forestType is missing`);
  }

  if (types.forestType.find(v => v.code === forestType) === undefined) {
    throw new Error(`${forestType} is not valid`);
  }

  const [, treeSpecies] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  ) || [null, emptyTreeSpecies];

  return treeSpecies;
}

export default list;
