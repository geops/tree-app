import React from 'react';
import {
  Paragraph,
  Table,
  TableRow,
  ImageRun,
  VerticalAlign,
  AlignmentType,
} from 'docx';
import { info } from '@geops/tree-lib';
import { getRecommendation } from '../recommendationUtils';
import {
  treeTypesReducer,
  cellIconPadding,
  jsxToBlob,
  PAGE_WIDTH_DXA,
  getRecommendationTableCell,
} from './exportUtils';
import NegativeIcon from '../../icons/RecommendationNegative';
import PositiveIcon from '../../icons/RecommendationPositive';
import NeutralIcon from '../../icons/RecommendationNeutral';
import AttentionIcon from '../../icons/RecommendationAttention';

const transformRecomendations = (treeTypes) => ({
  positive: {
    current: [...treeTypes[0], ...treeTypes[1]].map((code) =>
      info('treeType', code),
    ),
    future: [...treeTypes[2], ...treeTypes[3]].map((code) =>
      info('treeType', code),
    ),
  },
  neutral: {
    current: [...treeTypes[4], ...treeTypes[5]].map((code) =>
      info('treeType', code),
    ),
    future: [...treeTypes[6], ...treeTypes[7]].map((code) =>
      info('treeType', code),
    ),
  },
  negative: treeTypes[8].map((code) => info('treeType', code)),
  attention: treeTypes[9].map((code) => info('treeType', code)),
});

export const writeRecommendationTable = async (
  location,
  projectionResult,
  projectionMode,
  future,
  latinActive,
  language,
  t,
) => {
  const recommendations = transformRecomendations(
    getRecommendation(location, projectionResult, projectionMode, future),
  );

  const negativeIcon = await jsxToBlob(<NegativeIcon color="#000000" />);
  const positiveIcon = await jsxToBlob(<PositiveIcon color="#000000" />);
  const neutralIcon = await jsxToBlob(<NeutralIcon color="#000000" />);
  const attentionIcon = await jsxToBlob(<AttentionIcon color="#000000" />);

  const rows = [
    new TableRow({
      children: [
        getRecommendationTableCell(
          [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new ImageRun({
                  data: positiveIcon,
                  transformation: {
                    width: 25,
                    height: 25,
                  },
                }),
              ],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationTableCell([
          new Paragraph({
            text: recommendations.positive.current.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'main-24',
          }),
          new Paragraph({
            text: recommendations.positive.future.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'recommendation-future',
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
              children: [
                new ImageRun({
                  data: neutralIcon,
                  transformation: {
                    width: 25,
                    height: 25,
                  },
                }),
              ],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationTableCell([
          new Paragraph({
            text: recommendations.neutral.current.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'main-20',
          }),
          new Paragraph({
            text: recommendations.neutral.future.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'recommendation-future',
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
              children: [
                new ImageRun({
                  data: negativeIcon,
                  transformation: {
                    width: 25,
                    height: 25,
                  },
                }),
              ],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationTableCell([
          new Paragraph({
            text: recommendations.negative.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'main-16',
          }),
        ]),
      ],
    }),
  ];
  if (recommendations.attention.length) {
    rows.push(
      new TableRow({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          getRecommendationTableCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    data: attentionIcon,
                    transformation: {
                      width: 25,
                      height: 25,
                    },
                  }),
                ],
              }),
            ],
            cellIconPadding,
          ),
          getRecommendationTableCell([
            new Paragraph({
              text: recommendations.attention.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
              style: 'main-20',
            }),
          ]),
        ],
      }),
    );
  }

  return new Table({
    columnWidths: [PAGE_WIDTH_DXA / 6, (PAGE_WIDTH_DXA / 6) * 5],
    rows,
  });
};

export default writeRecommendationTable;
