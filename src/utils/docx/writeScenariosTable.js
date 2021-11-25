import {
  Paragraph,
  Table,
  TableRow,
  WidthType,
  TableCell,
  ShadingType,
} from 'docx';
import { list, info } from '@geops/tree-lib';
import { getAZ, getScenarios, getScenarioColumns } from '../projectionUtils';
import { cellPadding, treeTypesReducer } from './utils';

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

export const writeScenariosTable = (
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

export default writeScenariosTable;
