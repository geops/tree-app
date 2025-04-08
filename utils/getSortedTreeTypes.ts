import useStore from "@/store";

import type { TreeType } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

function getSortedTreeTypes(
  codes: number[] | undefined,
  lang: TreeAppLanguage,
): TreeType[] {
  const { treeClient } = useStore.getState();

  const treeInfos: TreeType[] | undefined = codes?.map((code) => {
    const treeInfo = treeClient.getTypes<TreeType>(
      "treetype",
      ["code", lang, "la", "endangered", "nonresident", "pioneer"],
      {
        code: `= '${code}'`,
      },
    )[0];

    return treeInfo ?? null;
  });

  return (treeInfos ?? [])
    .filter(Boolean)
    .sort((a, b) => Number(a.nonresident) - Number(b.nonresident));
}

export default getSortedTreeTypes;
