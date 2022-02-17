import translation from '../../../i18n/resources/de/translation.json';

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

export const vegetationMapping = Object.keys(
  translation.bl.forestType.vegetationIndicators,
);

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
  vegetationMapping,
  treeTypeMapping,
};
export default utils;
