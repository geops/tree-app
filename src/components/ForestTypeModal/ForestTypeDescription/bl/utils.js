import { info } from '@geops/tree-lib';
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

export const getTilleringTreeTypes = (treeTypes, category) =>
  treeTypeMapping.reduce(
    (finalTreeTypes, treeType, index) =>
      treeTypes[index] === category
        ? `${finalTreeTypes}${`${finalTreeTypes ? ', ' : ''}${treeType}`}`
        : finalTreeTypes,
    '',
  );
export const getTransitions = (forestTypes) =>
  forestTypes?.reduce((finalTypes, code) => {
    let ft = null;
    try {
      ft = info('forestType', code.replace(' ', ''), 'bl');
    } catch {
      ft = null;
    }
    return ft ? [...finalTypes, ft] : finalTypes;
  }, []);

export const vegetationMapping = Object.keys(
  translation.bl.forestType.vegetationIndicators,
);

export const soilIconTranslator = (key) => {
  switch (key) {
    case 1:
      return 3;
    case 2:
      return 2;
    case 3:
      return 1;
    case 4:
      return 4;
    default:
      return null;
  }
};

const utils = {
  vegetationMapping,
  treeTypeMapping,
};
export default utils;
