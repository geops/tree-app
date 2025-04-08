import { cantonalMappings } from "@geops/tree-lib";

import type { LuForestType } from "@geops/tree-lib/types";

export interface TilleringRow {
  farmForest: number[];
  naturalForest: number[];
  type: string;
}

const treeTypesMapping = cantonalMappings?.lu?.treeTypes;
export const getTilleringTreeTypes = (
  data: LuForestType["tillering"],
): TilleringRow[] => {
  return (
    data[0]
      ?.map((naturalForest, index) => {
        const farmForest = data[1]?.[index];
        const type = treeTypesMapping?.[index];
        return { farmForest, naturalForest, type } as TilleringRow;
      })
      .filter((r) => {
        return r.farmForest?.some(Boolean) ?? r.naturalForest?.some(Boolean);
      }) ?? []
  );
};

export default getTilleringTreeTypes;
