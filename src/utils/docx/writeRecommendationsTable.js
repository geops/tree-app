import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  ShadingType,
  ImageRun,
  BorderStyle,
  VerticalAlign,
} from 'docx';
import { info } from '@geops/tree-lib';
import { getRecommendation } from '../recommendationUtils';
import {
  treeTypesReducer,
  cellIconPadding,
  cellPadding,
  svgToBlob,
} from './utils';
import negative from '../../icons/recommendationNegative.svg';
import positive from '../../icons/recommendationPositive.svg';
import neutral from '../../icons/recommendationNeutral.svg';
import attention from '../../icons/recommendationAttention.svg';

const PAGE_WIDTH_DXA = 9000;

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

export const writeRecommendationsTable = async (
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

  const backgroundColorCell = {
    fill: '006268',
    type: ShadingType.CLEAR,
    color: 'auto',
  };

  const noBorderStyle = {
    top: { style: BorderStyle.SINGLE, size: 1, color: '006268' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: '006268' },
    left: { style: BorderStyle.SINGLE, size: 1, color: '006268' },
    right: { style: BorderStyle.SINGLE, size: 1, color: '006268' },
  };

  const negativeIcon = await svgToBlob(negative);
  const positiveIcon = await svgToBlob(positive);
  const neutralIcon = await svgToBlob(neutral);
  const attentionIcon = await svgToBlob(attention);

  const rows = [
    new TableRow({
      children: [
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          borders: noBorderStyle,
          shading: backgroundColorCell,
          margins: cellIconPadding,
          children: [
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
        }),
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          borders: noBorderStyle,
          shading: backgroundColorCell,
          margins: cellPadding,
          children: [
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
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          borders: noBorderStyle,
          shading: backgroundColorCell,
          margins: cellIconPadding,
          children: [
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
        }),
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          borders: noBorderStyle,
          shading: backgroundColorCell,
          margins: cellPadding,
          children: [
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
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          borders: noBorderStyle,
          shading: backgroundColorCell,
          margins: cellIconPadding,
          children: [
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
        }),
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          shading: backgroundColorCell,
          borders: noBorderStyle,
          margins: cellPadding,
          children: [
            new Paragraph({
              text: recommendations.negative.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
              style: 'recommendation-negative',
            }),
          ],
        }),
      ],
    }),
  ];
  if (recommendations.attention.length) {
    rows.push(
      new TableRow({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            borders: noBorderStyle,
            shading: backgroundColorCell,
            margins: cellIconPadding,
            children: [
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
          }),
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            borders: noBorderStyle,
            shading: backgroundColorCell,
            margins: cellPadding,
            children: [
              new Paragraph({
                text: recommendations.attention.reduce(
                  treeTypesReducer(latinActive ? 'la' : language),
                  '',
                ),
                style: 'recommendation-neutral',
              }),
            ],
          }),
        ],
      }),
    );
  }

  if (future) {
    rows.push(
      new TableRow({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new TableCell({
            borders: noBorderStyle,
            shading: backgroundColorCell,
            margins: cellIconPadding,
            children: [],
          }),
          new TableCell({
            borders: noBorderStyle,
            shading: backgroundColorCell,
            margins: cellPadding,
            children: [
              new Paragraph({
                text: `✓ ${t('export.future')}`,
                style: 'recommendation-future',
              }),
            ],
          }),
        ],
      }),
    );
  }

  return new Table({
    columnWidths: [PAGE_WIDTH_DXA / 6, (PAGE_WIDTH_DXA / 6) * 5],
    rows,
  });
};

export default writeRecommendationsTable;
