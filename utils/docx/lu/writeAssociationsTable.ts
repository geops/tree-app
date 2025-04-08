import { Table } from "docx";

import useStore from "@/store";

import { getLocationTableRow, PAGE_WIDTH_DXA } from "../exportUtils";

import type { LuAssociationGroup, LuForestType } from "@geops/tree-lib/types";

const writeAssociationsTable = (
  associationGroup: LuAssociationGroup,
  t: (key: string) => string,
) => {
  const { treeClient } = useStore.getState();
  const forestSubTypes: LuForestType[] = treeClient
    .getTypes<LuForestType>("lu_foresttype", [
      "code",
      "de",
      "associationgroupcode",
    ])
    .filter((type) => type.associationgroupcode === associationGroup.code);

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows: [
      getLocationTableRow(
        t("lu.forestType.aptitudeMeaning"),
        associationGroup.aptitudemeaning,
      ),
      getLocationTableRow(
        t("lu.forestType.description"),
        associationGroup.description,
      ),
      getLocationTableRow(
        t("lu.forestType.heightDispersion"),
        associationGroup.heightdispersion,
      ),
      getLocationTableRow(
        t("lu.forestType.location"),
        associationGroup.location,
      ),
      getLocationTableRow(
        t("forestTypeDiagram.soil.header"),
        associationGroup.soil,
      ),
      getLocationTableRow(
        t("lu.forestType.subGroups"),
        forestSubTypes.reduce(
          (all, type, idx, arr) =>
            `${all}${type.code} - ${type.de}${
              idx + 1 !== arr.length ? "\\n" : ""
            }`,
          "",
        ),
      ),
    ],
  });
};

export default writeAssociationsTable;
