import { Table, TableRow, Paragraph, AlignmentType } from 'docx';
import { PAGE_WIDTH_DXA, getLocationTableCell } from './exportUtils';

const getIcon = (key) => {
  switch (key) {
    case 1:
      return '+';
    case 2:
      return '□';
    case 3:
      return '■';
    default:
      return '–';
  }
};

export const writeDataTable = (
  soils,
  mapping,
  translationPath,
  translator,
  t,
) => {
  const rows = (soils || []).reduce((all, indicator, index, arr) => {
    if (!indicator) {
      return all;
    }

    let translated = indicator;
    if (translator && typeof translator === 'function') {
      // In case a profile uses different values
      translated = translator(indicator);
    }

    const icon = getIcon(translated);
    return [
      ...all,
      new TableRow({
        children: [
          getLocationTableCell(
            `${mapping[index]?.toUpperCase()}: ${t(
              `${translationPath}.${mapping[index]}`,
            )}`,
          ),
          getLocationTableCell([
            new Paragraph({
              alignment: AlignmentType.CENTER,
              text: icon,
            }),
          ]),
        ],
      }),
    ];
  }, []);

  return rows.length > 0
    ? new Table({
        columnWidths: [(PAGE_WIDTH_DXA / 8) * 5, PAGE_WIDTH_DXA / 12],
        rows,
      })
    : new Paragraph('-');
};

export default writeDataTable;
