import { Table } from 'docx';
import { info } from '@geops/tree-lib';
import { PAGE_WIDTH_DXA, getLocationTableRow } from './exportUtils';

export const writeAssociationsTable = (
  associationGroup,
  activeProfile,
  language,
  t,
) => {
  const forestSubTypes = info('forestType', null, activeProfile).filter(
    (type) => type.associationGroupCode === associationGroup.code,
  );

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows: [
      getLocationTableRow(
        t('lu.forestType.aptitudeMeaning'),
        associationGroup.aptitudeMeaning,
      ),
      getLocationTableRow(
        t('lu.forestType.description'),
        associationGroup.description,
      ),
      getLocationTableRow(
        t('lu.forestType.heightDispersion'),
        associationGroup.heightDispersion,
      ),
      getLocationTableRow(
        t('lu.forestType.location'),
        associationGroup.location,
      ),
      getLocationTableRow(
        t('forestTypeDiagram.soil.header'),
        associationGroup.soil,
      ),
      getLocationTableRow(
        t('lu.forestType.subGroups'),
        forestSubTypes.reduce(
          (all, type, idx, arr) =>
            `${all}${type.code} - ${type[language]}${
              idx + 1 !== arr ? '\\n' : ''
            }`,
          [],
        ),
      ),
    ],
  });
};

export default writeAssociationsTable;
