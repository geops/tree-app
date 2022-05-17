import { utils } from '@geops/tree-lib';

const treeTypesMapping = utils().getMapping('treeTypes', 'lu');

export const getTilleringTreeTypes = (data) =>
  data[0]
    .map((naturalForest, index) => {
      const farmForest = data[1] && data[1][index];
      const type = treeTypesMapping[index];
      return { naturalForest, farmForest, type };
    })
    .filter(
      (r) =>
        (r.naturalForest && r.naturalForest.filter((t) => t).length) ||
        (r.farmForest && r.farmForest.filter((t) => t).length),
    );

export default getTilleringTreeTypes;
