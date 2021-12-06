import {
  Paragraph,
  Table,
  TableRow,
  ImageRun,
  VerticalAlign,
  TextRun,
} from 'docx';
import { info } from '@geops/tree-lib';
import { getRecommendation } from '../recommendationUtils';
import {
  treeTypesReducer,
  cellIconPadding,
  svgToBlob,
  PAGE_WIDTH_DXA,
  getRecommendationCell,
} from './utils';
import negative from '../../icons/recommendationNegative.svg';
import positive from '../../icons/recommendationPositive.svg';
import neutral from '../../icons/recommendationNeutral.svg';
import attention from '../../icons/recommendationAttention.svg';

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

  const negativeIcon = await svgToBlob(negative);
  const positiveIcon = await svgToBlob(positive);
  const neutralIcon = await svgToBlob(neutral);
  const attentionIcon = await svgToBlob(attention);

  const rows = [
    new TableRow({
      children: [
        getRecommendationCell([]),
        getRecommendationCell(
          [
            new Paragraph({
              style: 'recommendation-positive',
              children: [
                new TextRun({
                  text: t('app.recommendation'),
                  bold: true,
                }),
              ],
            }),
          ],
          {
            top: 200,
            bottom: 200,
            right: 200,
            left: (PAGE_WIDTH_DXA / 6) * (language === 'de' ? 1.5 : 1.2), // Unfortunately, we need this ugly centering because docxjs cell layouts are cross OS compatible
          },
        ),
      ],
    }),
    new TableRow({
      children: [
        getRecommendationCell(
          [
            new Paragraph({
              children: [
                new ImageRun({
                  data: positiveIcon,
                  transformation: {
                    width: 50,
                    height: 50,
                  },
                }),
              ],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationCell([
          new Paragraph({
            text: recommendations.positive.current.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'recommendation-positive',
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
        getRecommendationCell(
          [
            new Paragraph({
              children: [
                new ImageRun({
                  data: neutralIcon,
                  transformation: {
                    width: 50,
                    height: 50,
                  },
                }),
              ],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationCell([
          new Paragraph({
            text: recommendations.neutral.current.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'recommendation-neutral',
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
        getRecommendationCell(
          [
            new Paragraph({
              children: [
                new ImageRun({
                  data: negativeIcon,
                  transformation: {
                    width: 50,
                    height: 50,
                  },
                }),
              ],
            }),
          ],
          cellIconPadding,
        ),
        getRecommendationCell([
          new Paragraph({
            text: recommendations.negative.reduce(
              treeTypesReducer(latinActive ? 'la' : language),
              '',
            ),
            style: 'recommendation-negative',
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
          getRecommendationCell(
            [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: attentionIcon,
                    transformation: {
                      width: 50,
                      height: 50,
                    },
                  }),
                ],
              }),
            ],
            cellIconPadding,
          ),
          getRecommendationCell([
            new Paragraph({
              text: recommendations.attention.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
              style: 'recommendation-neutral',
            }),
          ]),
        ],
      }),
    );
  }

  if (future) {
    rows.push(
      new TableRow({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          getRecommendationCell([]),
          getRecommendationCell([
            new Paragraph({
              text: t('export.future'),
              style: 'recommendation-future',
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
