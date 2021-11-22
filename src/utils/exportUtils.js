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
} from 'docx';
import { saveAs } from 'file-saver';
import { toLonLat } from 'ol/proj';
import { list, info } from '@geops/tree-lib';
import { getAZ, getScenarios, getScenarioColumns } from './projectionUtils';
import { getRecommendation } from './recommendationUtils';

const pageWidthDXA = 9000;
const cellPadding = {
  marginUnitType: WidthType.DXA,
  top: 200,
  left: 200,
  bottom: 200,
  right: 200,
};

export const style = {
  default: {
    heading1: {
      run: {
        size: 28,
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
    },
    {
      id: 'recommendation-positive',
      name: 'recommendation-positive',
      run: {
        color: 'FFFFFF',
        font: 'Calibri',
        size: 32,
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

const createRecommendationsTable = (
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
  // console.log(recommendations);
  const backgroundColorCell = {
    fill: '006268',
    type: ShadingType.CLEAR,
    color: 'auto',
  };

  return new Table({
    columnWidths: [pageWidthDXA / 5, (pageWidthDXA / 5) * 4],
    rows: [
      // Headers
      new TableRow({
        children: [
          new TableCell({
            shading: backgroundColorCell,
            margins: cellPadding,
            children: [],
          }),
          new TableCell({
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
            shading: backgroundColorCell,
            margins: cellPadding,
            children: [
              new Paragraph({
                text: 'placeholder',
                style: 'recommendation-neutral',
              }),
            ],
          }),
          new TableCell({
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
            width: {
              size: 500,
              type: WidthType.DXA,
            },
            shading: backgroundColorCell,
            margins: cellPadding,
            children: [],
          }),
          new TableCell({
            shading: backgroundColorCell,
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
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 500,
              type: WidthType.DXA,
            },
            shading: backgroundColorCell,
            margins: cellPadding,
            children: [],
          }),
          new TableCell({
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
    ],
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

export const exportScenarios = (
  location,
  mapLocation,
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
      text: `${new Date().toLocaleDateString(
        `${i18n.language}-${i18n.language.toUpperCase()}`,
      )}`,
      style: 'scenarios-primary',
    });
    const locationCoords = toLonLat(mapLocation.coordinate)
      .map((val) => val.toFixed(3))
      .toString()
      .replace(',', ', ');
    const coordinates = new Paragraph({
      text: locationCoords,
      style: 'scenarios-primary',
    });
    const recommendationsTable = createRecommendationsTable(
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
