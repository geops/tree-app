import { Paragraph, Table, TableRow, TableCell } from 'docx';
import { list, info, utils } from '@geops/tree-lib';
import { getScenarios, getScenarioColumns } from '../projectionUtils';
import {
  treeTypesReducer,
  PAGE_WIDTH_DXA,
  cellPadding,
  darkBorder,
  getScenariosTableCell,
} from './exportUtils';

const getScenarioColumn = (scenario, projection, language, t) => {
  const { forestType, transitionForestType } = projection;
  const altitudinalZone = utils.projection.getAZ(projection.altitudinalZone);
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
      dominantTypes: treeValues[0].map((code) => info('treeType', code)),
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
  const columnWidth = PAGE_WIDTH_DXA / (columns.length + 1);
  return new Table({
    pageBreakBefore: true,
    columnWidths: [1, ...columns].map(() => columnWidth),
    rows: [
      // Headers
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            margins: cellPadding,
            borders: darkBorder,
            children: [],
          }),
          ...columns.map(
            (column, idx) =>
              new TableCell({
                margins: cellPadding,
                borders: darkBorder,
                children: [
                  new Paragraph({
                    text: column.header,
                    style: 'main-20-bold',
                  }),
                  new Paragraph({
                    text: column.subHeader,
                    style: 'main-20',
                  }),
                ],
              }),
          ),
        ],
      }),
      // Dominant forest type
      new TableRow({
        children: [
          getScenariosTableCell(
            t('projection.treeTypesOne'),
            'main-20-bold',
            darkBorder,
          ),
          ...columns.map((column, idx) =>
            getScenariosTableCell(
              column.dominantTypes.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
            ),
          ),
        ],
      }),
      // Important forest types
      new TableRow({
        children: [
          getScenariosTableCell(
            t('projection.treeTypesTwo'),
            'main-20-bold',
            darkBorder,
          ),
          ...columns.map((column, idx) =>
            getScenariosTableCell(
              column.importantTypes.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
            ),
          ),
        ],
      }),
      // Other forest types
      new TableRow({
        children: [
          getScenariosTableCell(
            t('projection.treeTypesThree'),
            'main-20-bold',
            darkBorder,
          ),
          ...columns.map((column, idx) =>
            getScenariosTableCell(
              column.otherTypes.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
            ),
          ),
        ],
      }),
    ],
  });
};

export default writeScenariosTable;
