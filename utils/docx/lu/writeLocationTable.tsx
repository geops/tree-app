import { cantonalMappings } from "@geops/tree-lib";
import { ImageRun, Paragraph, Table, TextRun } from "docx";

import getTilleringTreeTypes from "@/components/ForestTypeModal/ForestTypeDescription/lu/getTilleringTreeTypes";
import getImageHtml from "@/utils/getImageHtml";
import getReliefImageUrl from "@/utils/getReliefImageUrl";

import Site from "../../../components/ForestTypeModal/ForestTypeDescription/lu/Site";
import Tillering from "../../../components/ForestTypeModal/ForestTypeDescription/lu/Tillering";
import TilleringSingle from "../../../components/ForestTypeModal/ForestTypeDescription/lu/TilleringSingle";
import { getLocationTableRow, jsxToBlob, PAGE_WIDTH_DXA } from "../exportUtils";
import { writeDataTable } from "../writeDataTable";

import type { LuForestType } from "@geops/tree-lib/types";

const vegetationMapping = cantonalMappings?.lu?.vegetation;
const soilMapping = cantonalMappings?.lu?.soil;

const writeLocationTable = async (
  data: LuForestType,
  t: (key: string) => string,
) => {
  const tilleringHardwoodPng = await jsxToBlob(
    <TilleringSingle data={data.tilleringhardwood} />,
  );
  const tilleringPng = await jsxToBlob(<Tillering data={data.tillering} />);
  const sitePng = await jsxToBlob(<Site data={data.expoandaspect} />);
  const imagePath = getReliefImageUrl(data.code, "lu", true);
  const imageHtml = imagePath && (await getImageHtml(imagePath));
  const imageBlob =
    imagePath &&
    (await fetch(imagePath)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer()));

  const rows = [
    getLocationTableRow(t("lu.forestType.tilleringHardwood"), [
      new Paragraph({
        children: [
          tilleringHardwoodPng
            ? // @ts-expect-error Don't need fallback
              new ImageRun({
                data: tilleringHardwoodPng,
                transformation: {
                  height: 30,
                  width: 225,
                },
              })
            : new TextRun("-"),
        ],
      }),
    ]),
    getLocationTableRow(t("lu.forestType.tillering"), [
      new Paragraph(""),
      new Paragraph({
        children: [
          tilleringPng
            ? // @ts-expect-error Don't need fallback
              new ImageRun({
                data: tilleringPng,
                transformation: {
                  height:
                    getTilleringTreeTypes(data.tillering).length * 19 + 30,
                  width: 225,
                },
              })
            : new TextRun("-"),
        ],
      }),
      new Paragraph(""),
    ]),
    getLocationTableRow(
      `${t("lu.forestType.tilleringFirwood")} min (opt)`,
      data.tilleringfirwood.every((val) => !val)
        ? "-"
        : `${data.tilleringfirwood[0]}${
            data.tilleringfirwood[1] ? ` (${data.tilleringfirwood[1]})` : ""
          }`,
    ),
    getLocationTableRow(
      t("lu.forestType.pioneerTreeTypes"),
      data.pioneertreetypes.toString().replace(",", ", "),
    ),
    getLocationTableRow(
      t("lu.forestType.compactRisk.label"),
      t(`lu.forestType.compactRisk.${data.compactrisk}`),
    ),
    getLocationTableRow(
      t("lu.forestType.priority.label"),
      data.priority ? t(`lu.forestType.priority.${data.priority}`) : "-",
    ),
    getLocationTableRow(t("lu.forestType.aptitude"), data.aptitude),
    getLocationTableRow(t("forestType.care"), data.forestryrejuvdev),
    getLocationTableRow(t("forestType.care"), data.forestrycare),
    getLocationTableRow(t("lu.forestType.description"), data.description),
    getLocationTableRow(
      t("lu.forestType.heightDispersion"),
      data.heightdispersion,
    ),
    getLocationTableRow(t("forestType.terrain"), [
      new Paragraph({
        children: [
          imageBlob
            ? // @ts-expect-error Don't need fallback
              new ImageRun({
                data: imageBlob,
                transformation: {
                  height: (imageHtml as HTMLImageElement).height / 3,
                  width: (imageHtml as HTMLImageElement).width / 3,
                },
              })
            : new TextRun("-"),
        ],
      }),
    ]),
    getLocationTableRow(
      `${t("forestTypeDiagram.slope")} & ${t(
        "forestTypeDiagram.aspect.label",
      )}`,
      [
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
      ],
    ),
    getLocationTableRow(t("forestTypeDiagram.vegetation"), data.vegetation),
    getLocationTableRow(t("forestType.vegetationIndicator"), [
      writeDataTable(
        data.vegetationindicator,
        vegetationMapping!,
        "lu.forestType.vegetationIndicator",
        t,
        undefined,
      ),
    ]),
    getLocationTableRow(t("lu.forestType.soil.label"), [
      writeDataTable(
        data.soil,
        soilMapping!,
        "lu.forestType.soil.typeMapping",
        t,
        undefined,
      ),
    ]),
  ];

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows,
  });
};

export default writeLocationTable;
