import useStore from "@/store";

import type { TreeType } from "@geops/tree-lib/types";

function getTreeType(code: number) {
  const { treeClient } = useStore.getState();
  return treeClient.getTypes<TreeType>("treetype", undefined, {
    code: `= '${code}'`,
  })[0];
}

export default getTreeType;
