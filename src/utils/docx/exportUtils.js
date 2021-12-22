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

export const PAGE_WIDTH_DXA = 10264; // Actual available page space for content

// Cell styles
export const cellPadding = {
  marginUnitType: WidthType.DXA,
  top: 100,
  left: 50,
  bottom: 100,
  right: 50,
};
export const cellIconPadding = {
  marginUnitType: WidthType.DXA,
  top: 0,
  left: 400,
  bottom: 0,
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

export const noBorder = getBorderStyle('006268', BorderStyle.NIL);
export const defaultBorder = getBorderStyle('e0e1e2');
export const darkBorder = getBorderStyle('777778', BorderStyle.OUTSET);

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
    style: 'main-20',
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
  fontStyle = 'main-20',
  border = defaultBorder,
) =>
  new TableCell({
    borders: border,
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
    borders: darkBorder,
    margins: padding,
    children,
    width,
  });

export const getLocationTableCell = (
  content,
  fontStyle = 'main-20',
  padding = cellPadding,
) => {
  let children = [];
  if (typeof content === 'string') {
    children = content.split('\\n').map(
      (string) =>
        new Paragraph({
          text: string,
          style: fontStyle,
        }),
    );
  }
  if (Array.isArray(content)) {
    children = [...content];
  }
  return new TableCell({
    verticalAlign: VerticalAlign.CENTER,
    borders: defaultBorder,
    margins: padding,
    children,
  });
};

export const getLocationTableRow = (headerText, valueContent) =>
  new TableRow({
    children: [
      getLocationTableCell(headerText, 'main-20-bold'),
      getLocationTableCell(valueContent),
    ],
  });

export const pageProperties = {
  page: {
    margin: {
      top: 700,
      bottom: 700,
      left: 1068, // left margin larger to have space to punch holes
      right: 568,
    },
  },
};

const fontSizes = [24, 20, 16]; // large, medium, small font sizes

// Main docx style https://docx.js.org/#/usage/styling-with-js
export const style = {
  default: {
    heading1: {
      run: {
        size: 34,
        bold: true,
        color: treeAppColorMain.fill,
        font: 'Arial',
      },
      paragraph: {
        spacing: {
          after: 40,
        },
      },
    },
    heading3: {
      run: {
        size: 24,
        bold: true,
        color: '000000',
        font: 'Arial',
      },
      paragraph: {
        spacing: {
          after: 40,
        },
      },
    },
  },
  paragraphStyles: [
    ...fontSizes.map((fontSize) => ({
      id: `main-${fontSize}`,
      name: `main-${fontSize}`,
      run: {
        size: fontSize,
        color: '000000',
        font: 'Arial',
      },
      paragraph: {
        spacing: {
          before: 0,
          after: 0,
        },
      },
    })),
    {
      id: 'main-20-bold',
      name: 'main-20-bold',
      run: {
        size: 20,
        color: '000000',
        font: 'Arial',
        bold: true,
      },
      paragraph: {
        spacing: {
          before: 0,
          after: 0,
        },
      },
    },
    {
      id: 'recommendation-future',
      name: 'recommendation-future',
      run: {
        color: '777778',
        font: 'Arial',
        size: 14,
      },
    },
  ],
};

export default style;
