import translation from '../../../../i18n/resources/de/translation.json';

export const treeTypeMapping = [
  'Bu',
  'TEi',
  'SEi',
  'BAh',
  'SAh',
  'BUl',
  'Es',
  'SEr',
  'TKi',
  'FAh',
  'HBu',
  'Ki',
  'WLi',
  'SLi',
  'EBe',
  'MBe',
  'VBe',
  'Nu',
  'FUl',
  'HBi',
  'Ro',
  'REi',
  'As',
  'Ta',
  'Fi',
  'Fö',
  'Lä',
  'SFö',
  'Dou',
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
