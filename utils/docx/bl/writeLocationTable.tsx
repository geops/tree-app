import { cantonalMappings } from "@geops/tree-lib";
import { BorderStyle, ImageRun, Paragraph, Table, TextRun } from "docx";

import Site from "@/components/ForestTypeModal/ForestTypeDescription/bl/Site";
import getImageHtml from "@/utils/getImageHtml";
import getReliefImageUrl from "@/utils/getReliefImageUrl";
import { getValidForestTypes } from "@/utils/getValidForestTypes";

import {
  getTilleringTreeTypes,
  soilIconTranslator,
} from "../../../components/ForestTypeModal/ForestTypeDescription/bl/utils";
import { getLocationTableRow, jsxToBlob, PAGE_WIDTH_DXA } from "../exportUtils";
import { writeDataTable } from "../writeDataTable";

import type { BlForestType } from "@geops/tree-lib/types";

// const { getImageHtml, getMapping, getReliefImageUrl } = utils();

const vegetationMapping = cantonalMappings?.bl?.vegetation;

const writeLocationTable = async (
  data: BlForestType,
  t: (key: string) => string,
) => {
  const sitePng = await jsxToBlob(<Site data={data.expoandaspect} />);
  const imagePath = getReliefImageUrl(data.code, "bl");
  const imageHtml = imagePath && (await getImageHtml(imagePath));
  const imageBlob =
    imagePath &&
    (await fetch(imagePath)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer()));
  const transitions = getValidForestTypes<BlForestType>(data.transitions, "bl");
  const borderConfig = {
    color: "e0e1e2",
    size: 1,
    style: BorderStyle.SINGLE,
  };

  const rows = [
    getLocationTableRow(
      "Laubholzanteil",
      data.tilleringhardwood ? `${data.tilleringhardwood}%` : "-",
    ),
    getLocationTableRow(
      "Als Hauptbaumart geeignet",
      getTilleringTreeTypes(data.tilleringtreetypes, "D") ?? "-",
      undefined,
      {
        bottom: { style: BorderStyle.NIL },
        left: borderConfig,
        right: borderConfig,
        top: borderConfig,
      },
    ),
    getLocationTableRow(
      "Als Nebenbaumart geeignet",
      getTilleringTreeTypes(data.tilleringtreetypes, "N") ?? "-",
      undefined,
      {
        bottom: { style: BorderStyle.NIL },
        left: borderConfig,
        right: borderConfig,
        top: { style: BorderStyle.NIL },
      },
    ),
    getLocationTableRow(
      "Baumart mitpflegen",
      getTilleringTreeTypes(data.tilleringtreetypes, "S") ?? "-",
      undefined,
      {
        bottom: { style: BorderStyle.NIL },
        left: borderConfig,
        right: borderConfig,
        top: { style: BorderStyle.NIL },
      },
    ),
    getLocationTableRow(
      "Gastbaumart, als Hauptbaumart geeignet",
      getTilleringTreeTypes(data.tilleringtreetypes, "G") ?? "-",
      undefined,
      {
        bottom: borderConfig,
        left: borderConfig,
        right: borderConfig,
        top: { style: BorderStyle.NIL },
      },
    ),
    getLocationTableRow("Eigenschaften", data.properties),
    getLocationTableRow("Bestockungsziele", data.tillering),
    getLocationTableRow("Verjüngung und Entwicklung", data.forestryrejuvdev),
    getLocationTableRow("Pflege", data.forestrycare),
    getLocationTableRow(
      t("bl.forestType.descriptionNaturalForest"),
      data.descriptionnaturalforest,
    ),
    getLocationTableRow(
      "Übergänge zu",
      transitions?.map(
        (ft) =>
          new Paragraph({
            style: "main-20",
            text: `${ft.code} - ${ft.de}`,
          }),
      ),
    ),
    getLocationTableRow("Höhenverbreitung", data.heightdispersion),
    getLocationTableRow("Standort", data.location),
    getLocationTableRow("Geologie", data.geology),
    getLocationTableRow(t("forestType.terrain"), [
      new Paragraph({
        children: [
          imageBlob
            ? // @ts-expect-error Don't need fallback
              new ImageRun({
                data: imageBlob,
                transformation: {
                  height: (imageHtml as HTMLImageElement)?.height,
                  width: (imageHtml as HTMLImageElement)?.width,
                },
              })
            : new TextRun("-"),
        ],
      }),
    ]),
    getLocationTableRow("Hangneigung & Exposition", [
      new Paragraph({
        children: [
          sitePng
            ? // @ts-expect-error Don't need fallback
              new ImageRun({
                data: sitePng,
                transformation: {
                  height: 120,
                  width: 120,
                },
              })
            : new TextRun("-"),
        ],
      }),
    ]),
    getLocationTableRow("Vegetation", data.vegetation),
    getLocationTableRow("Zeigerartengruppen", [
      writeDataTable(
        data.vegetationindicator,
        vegetationMapping!,
        "bl.forestType.vegetationIndicators",
        t,
        soilIconTranslator,
      ),
    ]),
  ];

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows,
  });
};

export default writeLocationTable;
