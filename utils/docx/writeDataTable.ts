import { AlignmentType, Paragraph, Table, TableRow } from "docx";

import { getLocationTableCell, PAGE_WIDTH_DXA } from "./exportUtils";

import type { OneTwoThreeNull } from "@geops/tree-lib/types";

const getIcon = (key?: null | number) => {
  switch (key) {
    case 1:
      return "+";
    case 2:
      return "□";
    case 3:
      return "■";
    default:
      return "–";
  }
};

export const writeDataTable = (
  soils: OneTwoThreeNull[],
  mapping: string[],
  translationPath: string,
  t: (key: string) => string,
  translator?: (val: number) => number,
) => {
  const rows = (soils || []).reduce((all, indicator, index) => {
    if (!indicator) {
      return all;
    }

    let translated: number = indicator;
    if (translator && typeof translator === "function") {
      // In case a profile uses different values
      translated = translator(indicator);
    }

    const icon = getIcon(translated);
    return [
      ...all,
      new TableRow({
        children: [
          getLocationTableCell(
            `${mapping[index]?.toUpperCase()}: ${t(
              `${translationPath}.${mapping[index]}`,
            )}`,
          ),
          getLocationTableCell([
            new Paragraph({
              alignment: AlignmentType.CENTER,
              text: icon,
            }),
          ]),
        ],
      }),
    ];
  }, [] as TableRow[]);

  return rows?.length > 0
    ? new Table({
        columnWidths: [(PAGE_WIDTH_DXA / 8) * 5, PAGE_WIDTH_DXA / 12],
        rows,
      })
    : new Paragraph("-");
};

export default writeDataTable;
