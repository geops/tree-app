export const treeTypeMapping = [
  'Fi',
  'Ta',
  'WFö',
  'BFö',
  'Ei',
  'Lä',
  'Dg',
  'Bu',
  'Es',
  'BAh',
  'SAh',
  'SEi',
  'TEi',
  'WLi',
  'SLi',
  'Ki',
  'BUl',
  'FUl',
  'SEr',
  'GEr',
  'AEr',
  'HBi',
  'TKi',
  'VBe',
  'MBe',
  'Wei',
];

export const soilMapping = ['l', 'f', 'h', 'ahh', 'ah', 'basen', 'feuchte'];
export const vegetationMapping = [
  'a',
  'b',
  'c',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
];

export const getTilleringTreeTypes = (data) =>
  data[0]
    .map((naturalForest, index) => {
      const farmForest = data[1] && data[1][index];
      const type = treeTypeMapping[index];
      return { naturalForest, farmForest, type };
    })
    .filter(
      (r) =>
        (r.naturalForest && r.naturalForest.filter((t) => t).length) ||
        (r.farmForest && r.farmForest.filter((t) => t).length),
    );

const utils = {
  soilMapping,
  vegetationMapping,
  treeTypeMapping,
};
export default utils;
