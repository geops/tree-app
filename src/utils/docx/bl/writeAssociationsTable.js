import { Table, Paragraph } from 'docx';
import { getValidForestTypes } from '../../comparisonUtils';
import { PAGE_WIDTH_DXA, getLocationTableRow, writeLine } from '../exportUtils';

const writeAssociationsTable = (associationGroup) => {
  const forestSubTypes = getValidForestTypes(associationGroup.locations, 'bl');
  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows: [
      getLocationTableRow('Standortbeschreibung', associationGroup.description),
      getLocationTableRow('Waldbild', associationGroup.forestAppearance),
      getLocationTableRow(
        'Höhenverbreitung',
        associationGroup.heightDispersion,
      ),
      getLocationTableRow('Nutzung und Pflege', associationGroup.useAndCare),
      getLocationTableRow('Fläche', [
        writeLine(associationGroup.areaBl, 'Basel-Land'),
        writeLine(associationGroup.areaBs, 'Basel-Stadt'),
        writeLine(associationGroup.areaBlBsPercent, 'Gesamter Flächenanteil'),
      ]),
      getLocationTableRow(
        'Standortstypen',
        forestSubTypes?.map(
          (ft) =>
            new Paragraph({
              text: `${ft.code} - ${ft.de}`,
              style: 'main-20',
            }),
        ),
      ),
    ],
  });
};

export default writeAssociationsTable;
