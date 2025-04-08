import { Paragraph, Table, TableCell, TableRow } from "docx";

import useStore from "@/store";

import getAZ from "../getAz";
import getSortedTreeTypes from "../getSortedTreeTypes";
import {
  getScenarioButtonContent,
  getScenarios,
  LocationSubset,
} from "../projectionResultUtils";

import {
  cellPadding,
  darkBorder,
  getScenariosTableCell,
  PAGE_WIDTH_DXA,
  treeTypesReducer,
} from "./exportUtils";

import type { AltitudinalZone, TreeType } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";
import type { Location, ProjectionMode, ProjectionResult } from "@/store";

export interface ScenarioColumn {
  dominantTypes: TreeType[];
  header: string;
  importantTypes: TreeType[];
  otherTypes: TreeType[];
  subHeader: string;
}

const getScenarioColumn = (
  scenario: string,
  projection: LocationSubset,
  language: TreeAppLanguage,
  t: (key: string) => string,
): null | ScenarioColumn => {
  const { treeClient } = useStore.getState();
  const { forestType, transitionForestType } = projection;
  const altitudinalZone = getAZ(projection.altitudinalZone);
  const scenarios = getScenarioButtonContent(scenario, t);
  const treeValues = treeClient.getVegetationList(projection, true).slice(0, 3);
  return forestType
    ? {
        dominantTypes: getSortedTreeTypes(treeValues[0], language),
        header: `${
          transitionForestType
            ? `${forestType} (${transitionForestType}) `
            : `${forestType} `
        } ${
          treeClient.getTypes<AltitudinalZone>("altitudinalZone", [language], {
            code: `= '${altitudinalZone}'`,
          })[0][language]
        }`,
        importantTypes: getSortedTreeTypes(treeValues[1], language),
        otherTypes: getSortedTreeTypes(treeValues[2], language),
        subHeader: scenarios.names.join(", "),
      }
    : null;
};

export function writeScenariosTable(
  location: Location,
  projectionResult: ProjectionResult,
  projectionMode: ProjectionMode,
  latinActive: boolean,
  language: TreeAppLanguage,
  t: (key: string) => string = (key) => key,
) {
  const columns = getScenarios<null | ScenarioColumn>(
    location,
    projectionMode,
    projectionResult,
    language,
    t,
    getScenarioColumn,
  );
  const columnWidth = PAGE_WIDTH_DXA / (columns.length + 1);
  return new Table({
    columnWidths: [1, ...columns].map(() => columnWidth),
    // pageBreakBefore: true,
    rows: [
      // Headers
      new TableRow({
        children: [
          new TableCell({
            borders: darkBorder,
            children: [],
            margins: cellPadding,
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                borders: darkBorder,
                children: [
                  new Paragraph({
                    style: "main-20-bold",
                    text: column?.header,
                  }),
                  new Paragraph({
                    style: "main-20",
                    text: column?.subHeader,
                  }),
                ],
                margins: cellPadding,
              }),
          ),
        ],
        tableHeader: true,
      }),
      // Dominant forest type
      new TableRow({
        children: [
          getScenariosTableCell(
            t("projection.treeTypesOne"),
            "main-20-bold",
            darkBorder,
          ),
          ...columns.map((column) =>
            getScenariosTableCell(
              column?.dominantTypes.reduce(
                treeTypesReducer(latinActive ? "la" : language),
                "",
              ) ?? "",
            ),
          ),
        ],
      }),
      // Important forest types
      new TableRow({
        children: [
          getScenariosTableCell(
            t("projection.treeTypesTwo"),
            "main-20-bold",
            darkBorder,
          ),
          ...columns.map((column) =>
            getScenariosTableCell(
              column?.importantTypes.reduce(
                treeTypesReducer(latinActive ? "la" : language),
                "",
              ) ?? "",
            ),
          ),
        ],
      }),
      // Other forest types
      new TableRow({
        children: [
          getScenariosTableCell(
            t("projection.treeTypesThree"),
            "main-20-bold",
            darkBorder,
          ),
          ...columns.map((column) =>
            getScenariosTableCell(
              column?.otherTypes.reduce(
                treeTypesReducer(latinActive ? "la" : language),
                "",
              ) ?? "",
            ),
          ),
        ],
      }),
    ],
  });
}

export default writeScenariosTable;
