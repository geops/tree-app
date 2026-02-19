import { AlignmentType, Paragraph, Table, TableRow } from "docx";

import AttentionIcon from "@/components/icons/RecommendationAttention";
import NegativeIcon from "@/components/icons/RecommendationNegative";
import NeutralIcon from "@/components/icons/RecommendationNeutral";
import PositiveIcon from "@/components/icons/RecommendationPositive";

import getRecommendation from "../getRecommendation";
import getSortedTreeTypes from "../getSortedTreeTypes";

import {
  cellIconPadding,
  createPng,
  getRecommendationTableCell,
  jsxToBlob,
  PAGE_WIDTH_DXA,
  treeTypesReducer,
} from "./exportUtils";

import type { TreeAppLanguage } from "@/i18n/i18next";
import type { Location, ProjectionMode, ProjectionResult } from "@/store";

const transformRecomendations = (
  treeTypes: number[][],
  language: TreeAppLanguage,
) => {
  return {
    attention: getSortedTreeTypes(treeTypes[9], language),
    negative: getSortedTreeTypes(treeTypes[8], language),
    neutral: {
      current: getSortedTreeTypes([...treeTypes[4], ...treeTypes[5]], language),
      future: getSortedTreeTypes([...treeTypes[6], ...treeTypes[7]], language),
    },
    positive: {
      current: getSortedTreeTypes([...treeTypes[0], ...treeTypes[1]], language),
      future: getSortedTreeTypes([...treeTypes[2], ...treeTypes[3]], language),
    },
  };
};

export const writeRecommendationTable = async (
  location: Location,
  projectionResult: ProjectionResult,
  projectionMode: ProjectionMode,
  future: boolean,
  latinActive: boolean,
  language: TreeAppLanguage,
) => {
  const recommendations = transformRecomendations(
    getRecommendation(
      location,
      projectionMode,
      projectionResult,
      future,
      false,
    )!,
    language,
  );

  const negativeIcon = await jsxToBlob(<NegativeIcon color="#000000" />);
  const positiveIcon = await jsxToBlob(<PositiveIcon color="#000000" />);
  const neutralIcon = await jsxToBlob(<NeutralIcon color="#000000" />);
  const attentionIcon = await jsxToBlob(<AttentionIcon color="#000000" />);

  const positiveRun = createPng(positiveIcon);
  const negativeRun = createPng(negativeIcon);
  const neutralRun = createPng(neutralIcon);
  const attentionRun = createPng(attentionIcon);

  const rows = [
    new TableRow({
      children: [
        getRecommendationTableCell(
          [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: positiveRun ? [positiveRun] : [],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationTableCell([
          new Paragraph({
            style: "main-24",
            text: recommendations.positive.current.reduce(
              treeTypesReducer(latinActive ? "la" : language),
              "",
            ),
          }),
          new Paragraph({
            style: "recommendation-future",
            text: recommendations.positive.future.reduce(
              treeTypesReducer(latinActive ? "la" : language),
              "",
            ),
          }),
        ]),
      ],
    }),
    new TableRow({
      children: [
        getRecommendationTableCell(
          [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: neutralRun ? [neutralRun] : [],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationTableCell([
          new Paragraph({
            style: "main-20",
            text: recommendations.neutral.current.reduce(
              treeTypesReducer(latinActive ? "la" : language),
              "",
            ),
          }),
          new Paragraph({
            style: "recommendation-future",
            text: recommendations.neutral.future.reduce(
              treeTypesReducer(latinActive ? "la" : language),
              "",
            ),
          }),
        ]),
      ],
    }),
    new TableRow({
      children: [
        getRecommendationTableCell(
          [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: negativeRun ? [negativeRun] : [],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationTableCell([
          new Paragraph({
            style: "main-16",
            text: recommendations.negative.reduce(
              treeTypesReducer(latinActive ? "la" : language),
              "",
            ),
          }),
        ]),
      ],
    }),
  ];
  if (recommendations.attention.length) {
    rows.push(
      new TableRow({
        children: [
          getRecommendationTableCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: attentionRun ? [attentionRun] : [],
              }),
            ],
            cellIconPadding,
          ),
          getRecommendationTableCell([
            new Paragraph({
              style: "main-20",
              text: recommendations.attention.reduce(
                treeTypesReducer(latinActive ? "la" : language),
                "",
              ),
            }),
          ]),
        ],
        // verticalAlign: VerticalAlign.CENTER,
      }),
    );
  }

  return new Table({
    columnWidths: [PAGE_WIDTH_DXA / 6, (PAGE_WIDTH_DXA / 6) * 5],
    rows,
  });
};

export default writeRecommendationTable;
