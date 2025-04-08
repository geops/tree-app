import { cantonalMappings } from "@geops/tree-lib";

import type { BlForestType } from "@geops/tree-lib/types";

const treeTypesMapping = cantonalMappings?.bl?.treeTypes;
export const getTilleringTreeTypes = (
  treeTypes: BlForestType["tilleringtreetypes"] = [],
  category: string,
) => {
  if (!treeTypes?.length) {
    return null;
  }

  const treeTypesString = treeTypesMapping?.reduce(
    (finalTreeTypes, treeType, index) =>
      treeTypes[index] === category
        ? `${finalTreeTypes}${`${finalTreeTypes ? ", " : ""}${treeType}`}`
        : finalTreeTypes,
    "",
  );

  return treeTypesString ? treeTypesString : null;
};

export const soilIconTranslator = (key: null | number) => {
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
      return null as unknown as number;
  }
};
