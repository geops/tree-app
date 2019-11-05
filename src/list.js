import recommendations from '../data/recommendations.json';
import types from '../data/types.json';

const emptyList = [[], [], [], []];

function list(forestType) {
  if (!forestType) {
    throw new Error(`forestType is missing`);
  }

  if (types.forestType.find(v => v.code === forestType) === undefined) {
    throw new Error(`${forestType} is not valid`);
  }

  const [, treeTypes] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  ) || [null, emptyList];

  return treeTypes.map(l => {
    const { treeType } = types;
    const res = l.filter(c => !treeType.find(t => t.code === c).nonresident);
    const nonres = l.filter(c => treeType.find(t => t.code === c).nonresident);
    return res.concat(nonres);
  });
}

export default list;
