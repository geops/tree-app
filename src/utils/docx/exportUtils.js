import {
  Paragraph,
  TextRun,
  WidthType,
  ShadingType,
  TableCell,
  VerticalAlign,
  BorderStyle,
  TableRow,
} from 'docx';
import { svgAsPngUri } from 'save-svg-as-png';
import { renderToString } from 'react-dom/server';
import isSvg from 'is-svg';

export const PAGE_WIDTH_DXA = 9000;

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

export const getBorderStyle = (
  color = '000000',
  style = BorderStyle.SINGLE,
  size = 1,
) => ({
  top: { style, size, color },
  bottom: { style, size, color },
  left: { style, size, color },
  right: { style, size, color },
});

export const noBorderStyle = getBorderStyle('006268', BorderStyle.NIL);
export const locationBorderStyle = getBorderStyle('e0e1e2');

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

// Main docx style https://docx.js.org/#/usage/styling-with-js
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
    heading3: {
      run: {
        size: 28,
        bold: true,
        color: '000000',
        font: 'Arial',
      },
      paragraph: {
        spacing: {
          after: 150,
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
      id: 'main-bold',
      name: 'main-bold',
      run: {
        size: 24,
        color: '000000',
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

// Docx layout/formatting helpers
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
      new TextRun({
        text: ': ',
      }),
    );
  }
  return new Paragraph({
    children,
    style: 'main',
  });
};

export const pageBreak = new Paragraph({
  pageBreakBefore: true,
  text: ' ',
});

// Image helpers
export const svgStringToBlob = async (string) => {
  const temp = document.createElement('div');
  temp.innerHTML = string;
  const svg = temp.firstChild;
  return svgAsPngUri(svg).then((uri) => fetch(uri).then((res) => res.blob()));
};

export const svgUriToBlob = async (dataUri) =>
  fetch(dataUri)
    .then((response) => response.text())
    .then(await svgStringToBlob);

export const jsxToBlob = (jsx) =>
  isSvg(renderToString(jsx)) ? svgStringToBlob(renderToString(jsx)) : null;

// Docx table helpers
export const getScenariosTableCell = (
  text,
  bgColor,
  fontStyle = 'scenarios-primary',
) =>
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

export const getRecommendationTableCell = (
  children,
  padding = cellPadding,
  width,
) =>
  new TableCell({
    verticalAlign: VerticalAlign.CENTER,
    borders: noBorderStyle,
    shading: treeAppColorMain,
    margins: padding,
    children,
    width,
  });

export const getLocationTableCell = (
  content,
  fontStyle = 'main',
  padding = cellPadding,
) => {
  let children = [...content];
  if (typeof content === 'string') {
    children = content.split('\\n').map(
      (string) =>
        new Paragraph({
          text: string,
          style: fontStyle,
        }),
    );
  }
  return new TableCell({
    verticalAlign: VerticalAlign.CENTER,
    borders: locationBorderStyle,
    margins: padding,
    children,
  });
};

export const getLocationTableRow = (headerText, valueContent) =>
  new TableRow({
    children: [
      getLocationTableCell(headerText, 'main-bold'),
      getLocationTableCell(valueContent),
    ],
  });

export default style;
