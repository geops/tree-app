import { Paragraph, Table, TableRow, TableCell } from 'docx';
import { list, info } from '@geops/tree-lib';
import { getAZ, getScenarios, getScenarioColumns } from '../projectionUtils';
import {
  treeTypesReducer,
  PAGE_WIDTH_DXA,
  cellPadding,
  treeAppColorMain,
  treeAppColorToday,
  treeAppColorModerate,
  treeAppColorExtreme,
  getScenariosTableCell,
} from './exportUtils';

const getColumnColor = (index) => {
  if (index === 1) {
    return treeAppColorModerate;
  }
  if (index === 2) {
    return treeAppColorExtreme;
  }
  return treeAppColorToday;
};
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
            shading: treeAppColorMain,
            margins: cellPadding,
            children: [],
          }),
          ...columns.map(
            (column, idx) =>
              new TableCell({
                shading: getColumnColor(idx),
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
          getScenariosTableCell(
            t('projection.treeTypesOne'),
            treeAppColorMain,
            'scenarios-primary-bold',
          ),
          ...columns.map((column, idx) =>
            getScenariosTableCell(
              column.dominantTypes.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
              getColumnColor(idx),
            ),
          ),
        ],
      }),
      // Important forest types
      new TableRow({
        children: [
          getScenariosTableCell(
            t('projection.treeTypesTwo'),
            treeAppColorMain,
            'scenarios-primary-bold',
          ),
          ...columns.map((column, idx) =>
            getScenariosTableCell(
              column.importantTypes.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
              getColumnColor(idx),
            ),
          ),
        ],
      }),
      // Other forest types
      new TableRow({
        children: [
          getScenariosTableCell(
            t('projection.treeTypesThree'),
            treeAppColorMain,
            'scenarios-primary-bold',
          ),
          ...columns.map((column, idx) =>
            getScenariosTableCell(
              column.otherTypes.reduce(
                treeTypesReducer(latinActive ? 'la' : language),
                '',
              ),
              getColumnColor(idx),
            ),
          ),
        ],
      }),
    ],
  });
};

export default writeScenariosTable;
