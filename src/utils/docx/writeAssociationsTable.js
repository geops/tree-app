import { Table } from 'docx';
import { info } from '@geops/tree-lib';
import { PAGE_WIDTH_DXA, getLocationRow } from './utils';

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
      getLocationRow(
        t('lu.forestType.aptitudeMeaning'),
        associationGroup.aptitudeMeaning,
      ),
      getLocationRow(
        t('lu.forestType.description'),
        associationGroup.description,
      ),
      getLocationRow(
        t('lu.forestType.heightDispersion'),
        associationGroup.heightDispersion,
      ),
      getLocationRow(t('lu.forestType.location'), associationGroup.location),
      getLocationRow(t('forestTypeDiagram.soil.header'), associationGroup.soil),
      getLocationRow(
        t('lu.forestType.heightDispersion'),
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
