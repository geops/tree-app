import { UnderlineType } from 'docx';

export const style = {
  default: {
    heading1: {
      run: {
        size: 28,
        bold: true,
        color: '000000',
        font: 'Calibri',
      },
      paragraph: {
        spacing: {
          after: 120,
        },
      },
    },
    heading2: {
      run: {
        size: 26,
        bold: true,
        underline: {
          type: UnderlineType.DOUBLE,
          color: 'FF0000',
        },
      },
      paragraph: {
        spacing: {
          before: 240,
          after: 120,
        },
      },
    },
    listParagraph: {
      run: {
        color: '#FF0000',
      },
    },
    tableParagraph: {
      run: {
        color: '#FF0000',
        font: 'Calibri',
      },
    },
  },
  paragraphStyles: [
    {
      id: 'table',
      name: 'Table',
      run: {
        color: '000000',
        font: 'Calibri',
      },
    },
  ],
};

export default style;
