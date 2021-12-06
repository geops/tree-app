import {
  Paragraph,
  TextRun,
  WidthType,
  ShadingType,
  TableCell,
  VerticalAlign,
  BorderStyle,
} from 'docx';
import { svgAsPngUri } from 'save-svg-as-png';

// Cell styles
export const cellPadding = {
  marginUnitType: WidthType.DXA,
  top: 200,
  left: 200,
  bottom: 200,
  right: 200,
};
export const cellIconPadding = {
  marginUnitType: WidthType.DXA,
  top: 200,
  left: 400,
  bottom: 200,
  right: 200,
};

const noBorderStyle = {
  top: { style: BorderStyle.NIL, size: 1, color: '006268' },
  bottom: { style: BorderStyle.NIL, size: 1, color: '006268' },
  left: { style: BorderStyle.NIL, size: 1, color: '006268' },
  right: { style: BorderStyle.NIL, size: 1, color: '006268' },
};

// Colors
export const getColor = (hex) => ({
  fill: hex,
  type: ShadingType.CLEAR,
  color: 'auto',
});

export const treeAppColorMain = getColor('006268');
export const treeAppColorToday = getColor('004d4f');
export const treeAppColorModerate = getColor('003c3e');
export const treeAppColorExtreme = getColor('002c2d');

export const style = {
  default: {
    heading1: {
      run: {
        size: 40,
        bold: true,
        color: treeAppColorMain.fill,
        font: 'Arial',
      },
      paragraph: {
        spacing: {
          after: 240,
        },
      },
    },
  },
  paragraphStyles: [
    {
      id: 'main',
      name: 'main',
      run: {
        size: 24,
        color: '000000',
        font: 'Arial',
      },
      paragraph: {
        spacing: {
          before: 120,
          after: 120,
        },
      },
    },
    {
      id: 'scenarios-primary',
      name: 'scenarios-primary',
      run: {
        size: 24,
        color: 'FFFFFF',
        font: 'Arial',
      },
      paragraph: {
        spacing: {
          before: 120,
          after: 120,
        },
      },
    },
    {
      id: 'scenarios-primary-bold',
      name: 'scenarios-primary-bold',
      run: {
        size: 24,
        color: 'FFFFFF',
        font: 'Arial',
        bold: true,
      },
      paragraph: {
        spacing: {
          before: 120,
          after: 120,
        },
      },
    },
    {
      id: 'recommendation-positive',
      name: 'recommendation-positive',
      run: {
        color: 'FFFFFF',
        font: 'Arial',
        size: 30,
      },
    },
    {
      id: 'recommendation-neutral',
      name: 'recommendation-neutral',
      run: {
        color: 'FFFFFF',
        font: 'Arial',
        size: 24,
      },
    },
    {
      id: 'recommendation-negative',
      name: 'recommendation-negative',
      run: {
        color: 'FFFFFF',
        font: 'Arial',
        size: 20,
      },
    },
    {
      id: 'recommendation-future',
      name: 'recommendation-future',
      run: {
        color: 'fbf0b2',
        font: 'Arial',
        size: 18,
      },
    },
  ],
};

export const PAGE_WIDTH_DXA = 9000;

// Helpers
export const treeTypesReducer = (language) => (string, type, index) =>
  `${string}${index !== 0 ? ', ' : ''}${type[language]}${
    type.endangered ? '†' : ''
  }${type.nonresident ? '°' : ''}${type.pioneer ? '*' : ''}`;

export const verticalSpace = (n) =>
  [...Array(n).keys()].map(() => new Paragraph(''));

export const writeLine = (text, key) => {
  const children = [new TextRun(text)];
  if (key) {
    children.unshift(
      new TextRun({
        text: key,
        bold: true,
      }),
    );
  }
  return new Paragraph({
    children,
    style: 'main',
  });
};

export const svgToBlob = async (dataUri) =>
  fetch(dataUri)
    .then((response) => response.text())
    .then((string) => {
      const temp = document.createElement('div');
      temp.innerHTML = string;
      const svg = temp.firstChild;
      return svgAsPngUri(svg);
    })
    .then((uri) => fetch(uri).then((res) => res.blob()));

export const pageBreak = new Paragraph({
  pageBreakBefore: true,
  text: ' ',
});

export const getScenariosTextCell = (text, bgColor, fontStyle) =>
  new TableCell({
    shading: bgColor,
    margins: cellPadding,
    children: [
      new Paragraph({
        text,
        style: fontStyle,
      }),
    ],
  });

export const getRecommendationCell = (children, padding = cellPadding, width) =>
  new TableCell({
    verticalAlign: VerticalAlign.CENTER,
    borders: noBorderStyle,
    shading: treeAppColorMain,
    margins: padding,
    children,
    width,
  });

export default style;
