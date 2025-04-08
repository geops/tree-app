import { Paragraph, Table } from "docx";

import { getValidForestTypes } from "@/utils/getValidForestTypes";

import { getLocationTableRow, PAGE_WIDTH_DXA, writeLine } from "../exportUtils";

import type { BlAssociationGroup, BlForestType } from "@geops/tree-lib/types";

const writeAssociationsTable = (associationGroup: BlAssociationGroup) => {
  const forestSubTypes = getValidForestTypes<BlForestType>(
    associationGroup.locations,
    "bl",
  );
  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows: [
      getLocationTableRow("Nutzung und Pflege", associationGroup.useandcare),
      getLocationTableRow("Waldbild", associationGroup.forestappearance),
      getLocationTableRow(
        "Höhenverbreitung",
        associationGroup.heightdispersion,
      ),
      getLocationTableRow("Standortbeschreibung", associationGroup.description),
      getLocationTableRow(
        "Standortstypen",
        forestSubTypes?.map(
          (ft) =>
            new Paragraph({
              style: "main-20",
              text: `${ft.code} - ${ft.de}`,
            }),
        ),
      ),
      getLocationTableRow("Fläche", [
        writeLine(associationGroup.areabl, "Basel-Land"),
        writeLine(associationGroup.areabs, "Basel-Stadt"),
        writeLine(associationGroup.areablbspercent, "Gesamter Flächenanteil"),
      ]),
    ],
  });
};

export default writeAssociationsTable;
