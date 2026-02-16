import {
  BorderStyle,
  ExternalHyperlink,
  HeadingLevel,
  ImageRun,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import isSvg from "is-svg";
import { renderToString } from "react-dom/server";
import { svgAsPngUri } from "save-svg-as-png";

import type { TreeType } from "@geops/tree-lib/types";
import type { IMargins, ITableCellBorders, ITableWidthProperties } from "docx";

import type { TreeAppLanguage } from "@/i18n/i18next";

export const PAGE_WIDTH_DXA = 10264; // Actual available page space for content

// Cell styles
export const cellPadding = {
  bottom: 100,
  left: 50,
  marginUnitType: WidthType.DXA,
  right: 50,
  top: 100,
};
export const cellIconPadding = {
  bottom: 0,
  left: 400,
  marginUnitType: WidthType.DXA,
  right: 200,
  top: 0,
};

export const getBorderStyle = (
  color = "000000",
  style: (typeof BorderStyle)[keyof typeof BorderStyle] = BorderStyle.SINGLE,
  size = 1,
): ITableCellBorders => ({
  bottom: { color, size, style },
  left: { color, size, style },
  right: { color, size, style },
  top: { color, size, style },
});

export const noBorder = getBorderStyle("006268", BorderStyle.NIL);
export const defaultBorder = getBorderStyle("e0e1e2");
export const darkBorder = getBorderStyle("777778", BorderStyle.OUTSET);

// Colors
export const getColor = (hex: string) => ({
  color: "auto",
  fill: hex,
  type: ShadingType.CLEAR,
});

export const treeAppColorMain = getColor("006268");
export const treeAppColorToday = getColor("004d4f");
export const treeAppColorModerate = getColor("003c3e");
export const treeAppColorExtreme = getColor("002c2d");

// Docx layout/formatting helpers
export const treeTypesReducer =
  (language: "la" | TreeAppLanguage) =>
  (string: string, type: TreeType, index: number) =>
    `${string}${index !== 0 ? ", " : ""}${type[language]}${
      type.endangered ? "†" : ""
    }${type.nonresident ? "°" : ""}${type.pioneer ? "*" : ""}`;

export const verticalSpace = (n: number) =>
  [...Array(n).keys()].map(() => new Paragraph(""));

export const writeLine = (text: string, key?: string) => {
  const children = [new TextRun(text)];
  if (key) {
    children.unshift(
      new TextRun({
        bold: true,
        text: key,
      }),
      new TextRun({
        text: ": ",
      }),
    );
  }
  return new Paragraph({
    children,
    style: "main-20",
  });
};

export const pageBreak = new Paragraph({
  pageBreakBefore: true,
  text: " ",
});

// Image helpers
export const svgStringToBlob = async (string: string) => {
  const temp = document.createElement("div");
  temp.innerHTML = string;
  const svg = temp.firstChild;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return (await svgAsPngUri(svg).then((uri: string) =>
    fetch(uri)
      .then((res) => res.blob())
      .then((blob) => blob.arrayBuffer()),
  )) as ArrayBuffer;
};

export const svgUriToBlob = async (dataUri: string) =>
  fetch(dataUri)
    .then((response) => response.text())
    .then(svgStringToBlob);

export const jsxToBlob = (jsx: React.ReactNode) =>
  isSvg(renderToString(jsx)) ? svgStringToBlob(renderToString(jsx)) : null;

export const createIcon = (buffer: ArrayBuffer | null) =>
  buffer
    ? new ImageRun({
        data: buffer,
        transformation: {
          height: 25,
          width: 25,
        },
        type: "png",
      })
    : undefined;

// Docx table helpers
export const getPermalink = (text: string) =>
  new Paragraph({
    children: [
      new ExternalHyperlink({
        children: [
          new TextRun({
            style: "Hyperlink",
            text,
          }),
        ],
        link: window.location.href,
      }),
    ],
    style: "main-20",
  });

export const getTitle = (title: string, latin?: string) => {
  if (!title) {
    return new Paragraph("");
  }
  const children = [new TextRun(title)];
  if (latin) {
    children.push(
      new TextRun({
        italics: true,
        text: latin,
      }),
    );
  }
  return new Paragraph({
    children,
    heading: HeadingLevel.HEADING_3,
  });
};

export const getScenariosTableCell = (
  text: string,
  fontStyle = "main-20",
  border = defaultBorder,
) =>
  new TableCell({
    borders: border,
    children: [
      new Paragraph({
        style: fontStyle,
        text,
      }),
    ],
    margins: cellPadding,
  });

export const getRecommendationTableCell = (
  children: (Paragraph | Table)[],
  padding = cellPadding,
  width?: ITableWidthProperties,
) =>
  new TableCell({
    borders: darkBorder,
    children,
    margins: padding,
    verticalAlign: VerticalAlign.CENTER,
    width,
  });

export const getLocationTableCell = (
  content: (Paragraph | Table)[] | string,
  fontStyle = "main-20",
  padding: IMargins = cellPadding,
  borders = defaultBorder,
) => {
  let children: (Paragraph | Table)[] = [];
  if (!content) {
    children = [new Paragraph("-")];
  }
  if (typeof content === "string") {
    children = content.split("\\n").map(
      (string) =>
        new Paragraph({
          style: fontStyle,
          text: string,
        }),
    );
  }
  if (Array.isArray(content)) {
    children = [...content];
  }
  return new TableCell({
    borders,
    children: children.length > 0 ? children : [new Paragraph("-")],
    margins: padding,
    verticalAlign: VerticalAlign.CENTER,
  });
};

export const getLocationTableRow = (
  headerText: string,
  valueContent: (Paragraph | Table)[] | string,
  padding: IMargins = cellPadding,
  borders: ITableCellBorders = defaultBorder,
) =>
  new TableRow({
    children: [
      getLocationTableCell(headerText, "main-20-bold", padding, borders),
      getLocationTableCell(valueContent, undefined, padding, borders),
    ],
  });

export const pageProperties = {
  page: {
    margin: {
      bottom: 700,
      left: 1068, // left margin larger to have space to punch holes
      right: 568,
      top: 700,
    },
  },
};

const fontSizes = [24, 20, 16]; // large, medium, small font sizes

// Main docx style https://docx.js.org/#/usage/styling-with-js
export const style = {
  default: {
    heading1: {
      paragraph: {
        spacing: {
          after: 40,
        },
      },
      run: {
        bold: true,
        color: treeAppColorMain.fill,
        font: "Arial",
        size: 34,
      },
    },
    heading3: {
      paragraph: {
        spacing: {
          after: 40,
        },
      },
      run: {
        bold: true,
        color: "000000",
        font: "Arial",
        size: 24,
      },
    },
  },
  paragraphStyles: [
    ...fontSizes.map((fontSize) => ({
      id: `main-${fontSize}`,
      name: `main-${fontSize}`,
      paragraph: {
        spacing: {
          after: 0,
          before: 0,
        },
      },
      run: {
        color: "000000",
        font: "Arial",
        size: fontSize,
      },
    })),
    {
      id: "main-20-bold",
      name: "main-20-bold",
      paragraph: {
        spacing: {
          after: 0,
          before: 0,
        },
      },
      run: {
        bold: true,
        color: "000000",
        font: "Arial",
        size: 20,
      },
    },
    {
      id: "recommendation-future",
      name: "recommendation-future",
      run: {
        color: "777778",
        font: "Arial",
        size: 14,
      },
    },
  ],
};

export default style;
