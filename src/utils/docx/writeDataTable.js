import { Table, TableRow, Paragraph, AlignmentType } from 'docx';
import { PAGE_WIDTH_DXA, getLocationTableCell } from './exportUtils';

export const writeDataTable = (soils, mapping, translationPath, t) => {
  const rows = soils.reduce((all, indicator, index, arr) => {
    if (!indicator) {
      return all;
    }
    let icon = '+';
    if (indicator !== 1) {
      icon = indicator === 2 ? '□' : '■';
    }
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

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 8) * 5, PAGE_WIDTH_DXA / 12],
    rows,
  });
};

export default writeDataTable;
