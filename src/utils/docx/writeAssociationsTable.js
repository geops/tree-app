import {
  //   Paragraph,
  Table,
  TableRow,
  //   ImageRun,
  //   VerticalAlign,
  //   TextRun,
} from 'docx';
// import { info } from '@geops/tree-lib';
// import { getRecommendation } from '../recommendationUtils';
import {
  //   treeTypesReducer,
  //   cellIconPadding,
  //   svgToBlob,
  PAGE_WIDTH_DXA,
  //   getRecommendationCell,
} from './utils';

export const writeAssociationsTable = async (
  location,
  projectionResult,
  projectionMode,
  future,
  latinActive,
  language,
  t,
) => {
  const rows = [
    new TableRow({
      children: [],
    }),
  ];

  return new Table({
    columnWidths: [PAGE_WIDTH_DXA / 6, (PAGE_WIDTH_DXA / 6) * 5],
    rows,
  });
};

export default writeAssociationsTable;
