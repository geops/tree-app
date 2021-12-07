import { Table, TableRow } from 'docx';
import { PAGE_WIDTH_DXA, getLocationCell } from './utils';

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
          getLocationCell(
            `${mapping[index]?.toUpperCase()}: ${t(
              `${translationPath}.${mapping[index]}`,
            )}`,
          ),
          getLocationCell(icon),
        ],
      }),
    ];
  }, []);

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 4, PAGE_WIDTH_DXA / 12],
    rows,
  });
};

export default writeDataTable;
