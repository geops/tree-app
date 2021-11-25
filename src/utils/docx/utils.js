import { Paragraph, TextRun, WidthType } from 'docx';

export const style = {
  default: {
    heading1: {
      run: {
        size: 36,
        bold: true,
        color: '000000',
        font: 'Calibri',
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
      id: 'scenarios-primary',
      name: 'scenarios-primary',
      run: {
        size: 24,
        color: '000000',
        font: 'Calibri',
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
        color: '000000',
        font: 'Calibri',
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
        font: 'Calibri',
        size: 30,
      },
    },
    {
      id: 'recommendation-neutral',
      name: 'recommendation-neutral',
      run: {
        color: 'FFFFFF',
        font: 'Calibri',
        size: 24,
      },
    },
    {
      id: 'recommendation-negative',
      name: 'recommendation-negative',
      run: {
        color: 'FFFFFF',
        font: 'Calibri',
        size: 20,
      },
    },
    {
      id: 'recommendation-future',
      name: 'recommendation-future',
      run: {
        color: 'fbf0b2',
        font: 'Calibri',
        size: 18,
      },
    },
  ],
};

export const treeTypesReducer = (language) => (string, type, index, arr) =>
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
    style: 'scenarios-primary',
  });
};

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

export default style;
