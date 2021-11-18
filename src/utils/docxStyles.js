import { convertInchesToTwip, UnderlineType } from 'docx';

export const style = {
  default: {
    heading1: {
      run: {
        size: 28,
        bold: true,
        italics: true,
        color: '000000',
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
          color: '000000',
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
  },
  paragraphStyles: [
    {
      id: 'aside',
      name: 'Aside',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        color: '999999',
        italics: true,
      },
      paragraph: {
        indent: {
          left: convertInchesToTwip(0.5),
        },
        spacing: {
          line: 276,
        },
      },
    },
    {
      id: 'wellSpaced',
      name: 'Well Spaced',
      basedOn: 'Normal',
      quickFormat: true,
      paragraph: {
        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
      },
    },
  ],
};

export default style;
