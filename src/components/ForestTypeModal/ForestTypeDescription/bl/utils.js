import { utils } from '@geops/tree-lib';

const treeTypesMapping = utils().getMapping('treeTypes', 'bl');
export const getTilleringTreeTypes = (treeTypes = [], category) => {
  if (!treeTypes?.length) {
    return null;
  }

  return treeTypesMapping.reduce(
    (finalTreeTypes, treeType, index) =>
      treeTypes[index] === category
        ? `${finalTreeTypes}${`${finalTreeTypes ? ', ' : ''}${treeType}`}`
        : finalTreeTypes,
    '',
  );
};

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
