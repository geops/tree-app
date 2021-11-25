import {
  Paragraph,
  Table,
  TableRow,
  WidthType,
  TableCell,
  HeadingLevel,
  Document,
  Packer,
  ShadingType,
  ImageRun,
  BorderStyle,
  VerticalAlign,
} from 'docx';
import { svgAsPngUri } from 'save-svg-as-png';
import { saveAs } from 'file-saver';
import { toLonLat } from 'ol/proj';
import { list, info } from '@geops/tree-lib';
import { getAZ, getScenarios, getScenarioColumns } from './projectionUtils';
import { getRecommendation } from './recommendationUtils';
import negative from '../icons/recommendationNegative.svg';
import positive from '../icons/recommendationPositive.svg';
import neutral from '../icons/recommendationNeutral.svg';
import attention from '../icons/recommendationAttention.svg';

const pageWidthDXA = 9000;
const cellPadding = {
  marginUnitType: WidthType.DXA,
  top: 200,
  left: 200,
  bottom: 200,
  right: 200,
};
const cellIconPadding = {
  marginUnitType: WidthType.DXA,
  top: 200,
  left: 400,
  bottom: 200,
  right: 200,
};

export const style = {
  default: {
    heading1: {
      run: {
        size: 36,
        bold: true,
        color: '000000',
        font: 'Calibri',
      },
      paragraph: {
        spacing: {
          after: 120,
        },
      },
    },
  },
  paragraphStyles: [
    {
      id: 'scenarios-primary',
      name: 'scenarios-primary',
      run: {
        size: 24,
        color: '000000',
        font: 'Calibri',
      },
      paragraph: {
        spacing: {
          before: 120,
          after: 120,
        },
      },
    },
    {
      id: 'scenarios-primary-bold',
      name: 'scenarios-primary-bold',
      run: {
        size: 24,
        color: '000000',
        font: 'Calibri',
        bold: true,
      },
      paragraph: {
        spacing: {
          before: 120,
          after: 120,
        },
      },
    },
    {
      id: 'recommendation-positive',
      name: 'recommendation-positive',
      run: {
        color: 'FFFFFF',
        font: 'Calibri',
        size: 30,
      },
    },
    {
      id: 'recommendation-neutral',
      name: 'recommendation-neutral',
      run: {
        color: 'FFFFFF',
        font: 'Calibri',
        size: 24,
      },
    },
    {
      id: 'recommendation-negative',
      name: 'recommendation-negative',
      run: {
        color: 'FFFFFF',
        font: 'Calibri',
        size: 20,
      },
    },
    {
      id: 'recommendation-future',
      name: 'recommendation-future',
      run: {
        color: 'fbf0b2',
        font: 'Calibri',
        size: 18,
      },
    },
  ],
};

const verticalSpace = (n) => [...Array(n).keys()].map(() => new Paragraph(''));

const treeTypesReducer = (language) => (string, type, index, arr) =>
  `${string}${index !== 0 ? ', ' : ''}${type[language]}${
    type.endangered ? '†' : ''
  }${type.nonresident ? '°' : ''}${type.pioneer ? '*' : ''}`;

const getScenarioColumn = (scenario, projection, language, t) => {
  const { forestType, transitionForestType } = projection;
  const altitudinalZone = getAZ(projection.altitudinalZone);
  const scenarios = getScenarios(scenario, t);
  const treeValues = list(projection, true).slice(0, 3);

  return (
    forestType && {
      header: `${
        transitionForestType
          ? `${forestType} (${transitionForestType}) `
          : `${forestType} `
      } ${info('altitudinalZone', altitudinalZone)[language]}`,
      subHeader: scenarios.names.join(', '),
      dominantType: info('treeType', treeValues[0][0]),
      importantTypes: treeValues[1].map((code) => info('treeType', code)),
      otherTypes: treeValues[2].map((code) => info('treeType', code)),
    }
  );
};

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

export const getTitle = (text, heading = 'HEADING_2', children) => {
  const options = {
    text,
    heading: HeadingLevel[heading],
  };
  if (children) {
    options.children = children;
  }
  return new Paragraph(options);
};

const svgToBlob = async (dataUri) =>
  fetch(dataUri)
    .then((response) => response.text())
    .then((string) => {
      const temp = document.createElement('div');
      temp.innerHTML = string;
      const svg = temp.firstChild;
      return svgAsPngUri(svg);
    })
    .then((uri) => fetch(uri).then((res) => res.blob()));

const createRecommendationsTable = async (
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
    columnWidths: [pageWidthDXA / 6, (pageWidthDXA / 6) * 5],
    rows,
  });
};

export const createScenariosTable = (
  location,
  projectionResult,
  projectionMode,
  latinActive,
  language,
  t,
) => {
  const columns = getScenarioColumns(
    location,
    projectionMode,
    projectionResult,
    getScenarioColumn,
    language,
    t,
  );
  const backgroundColorHeader = {
    fill: 'bbe0e3',
    type: ShadingType.CLEAR,
    color: 'auto',
  };
  const backgroundColorCell = {
    fill: 'e7f3f4',
    type: ShadingType.CLEAR,
    color: 'auto',
  };
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      // Headers
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            shading: backgroundColorHeader,
            margins: cellPadding,
            children: [],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                shading: backgroundColorHeader,
                margins: cellPadding,
                children: [
                  new Paragraph({
                    text: column.header,
                    style: 'scenarios-primary-bold',
                  }),
                  new Paragraph({
                    text: column.subHeader,
                    style: 'scenarios-primary',
                  }),
                ],
              }),
          ),
        ],
      }),
      // Dominant forest type
      new TableRow({
        children: [
          new TableCell({
            shading: backgroundColorHeader,
            margins: cellPadding,
            children: [
              new Paragraph({
                text: t('projection.treeTypesOne'),
                style: 'scenarios-primary-bold',
              }),
            ],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                shading: backgroundColorCell,
                margins: cellPadding,
                children: [
                  new Paragraph({
                    text: column.dominantType[latinActive ? 'la' : language],
                    style: 'scenarios-primary',
                  }),
                ],
              }),
          ),
        ],
      }),
      // Important forest types
      new TableRow({
        children: [
          new TableCell({
            shading: backgroundColorHeader,
            margins: cellPadding,
            children: [
              new Paragraph({
                text: t('projection.treeTypesTwo'),
                style: 'scenarios-primary-bold',
              }),
            ],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                shading: backgroundColorCell,
                margins: cellPadding,
                children: [
                  new Paragraph({
                    text: column.importantTypes.reduce(
                      treeTypesReducer(latinActive ? 'la' : language),
                      '',
                    ),
                    style: 'scenarios-primary',
                  }),
                ],
              }),
          ),
        ],
      }),
      // Other forest types
      new TableRow({
        children: [
          new TableCell({
            shading: backgroundColorHeader,
            margins: cellPadding,
            children: [
              new Paragraph({
                text: t('projection.treeTypesThree'),
                style: 'scenarios-primary-bold',
              }),
            ],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                shading: backgroundColorCell,
                margins: cellPadding,
                children: [
                  new Paragraph({
                    text: column.otherTypes.reduce(
                      treeTypesReducer(latinActive ? 'la' : language),
                      '',
                    ),
                    style: 'scenarios-primary',
                  }),
                ],
              }),
          ),
        ],
      }),
    ],
  });
};

export const exportRecommendations = async (
  location,
  projectionResult,
  projectionMode,
  future,
  latinActive,
  i18n,
  t,
) => {
  if (projectionResult) {
    const mainTitle = getTitle(
      t('export.recommendationMainTitle'),
      'HEADING_1',
    );
    const date = new Paragraph({
      text: `${t('export.date')}: ${new Date().toLocaleDateString(
        `${i18n.language}-${i18n.language.toUpperCase()}`,
      )}`,
      style: 'scenarios-primary',
    });
    const locationCoords = toLonLat(location.coordinate)
      .map((val) => val.toFixed(3))
      .toString()
      .replace(',', ', ');
    const coordinates = new Paragraph({
      text: `${t('export.coordinate')}: ${locationCoords}`,
      style: 'scenarios-primary',
    });
    const selectedLocation = info('forestType', location.forestType);
    const locationString = new Paragraph({
      text: `${t('info.locationTitle')}: ${location.forestType} - ${
        selectedLocation[latinActive ? 'la' : i18n.language]
      }`,
      style: 'scenarios-primary',
    });
    const recommendationsTable = await createRecommendationsTable(
      location,
      projectionResult,
      projectionMode,
      future,
      latinActive,
      i18n.language,
      t,
    );
    const scenariosTable = createScenariosTable(
      location,
      projectionResult,
      projectionMode,
      latinActive,
      i18n.language,
      t,
    );
    const doc = new Document({
      styles: style,
      sections: [
        {
          children: [
            mainTitle,
            date,
            coordinates,
            locationString,
            recommendationsTable,
            ...verticalSpace(3),
            scenariosTable,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'treeapp_recommendation.docx');
    });
  }
};

export default style;
