import {
  Document,
  ExternalHyperlink,
  FileChild,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

import useStore from "@/store";

import { pageProperties, style, verticalSpace, writeLine } from "./exportUtils";
import { writeRecommendationTable } from "./writeRecommendationTable";
import { writeScenariosTable } from "./writeScenariosTable";

import type {
  AltitudinalZone,
  BlForestType,
  ForestEcoregion,
  ForestType,
  LuForestType,
} from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

type AnyForestType = BlForestType | ForestType | LuForestType;

export const exportRecommendation = async (
  language: TreeAppLanguage,
  t: (string: string) => string = (string) => string,
) => {
  const {
    activeProfile,
    future,
    latinActive,
    location,
    projectionMode,
    projectionResult,
    treeClient,
  } = useStore.getState();

  const mainTitle = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    text: t("export.recommendationMainTitle"),
  });

  const profile = writeLine(
    t(`profiles.${activeProfile}`),
    t("export.profile"),
  );

  const date = writeLine(
    `${new Date().toLocaleDateString(`${language}-${language.toUpperCase()}`)}`,
    t("export.date"),
  );

  const coordinates = writeLine(
    `${location.coordinate?.map((val) => val.toFixed()).join(", ")}`,
    `${t("export.coordinate")}`,
  );

  const forestEcoregion = writeLine(
    `${
      treeClient.getTypes<ForestEcoregion>("forestecoregion", [language], {
        code: `= '${location.forestEcoregion}'`,
      })?.[0][language]
    }`,
    `${t("forestEcoregion.label")}`,
  );

  const silverFirArea = writeLine(
    `${
      treeClient.getTypes<Record<TreeAppLanguage, string>>(
        "silverfirarea",
        [language],
        {
          code: `= '${location.silverFirArea}'`,
        },
      )?.[0]?.[language]
    }`,
    `${t("silverFirArea.label")}`,
  );

  let selectedLocation;
  try {
    selectedLocation = treeClient.getForestTypeByCode<AnyForestType>(
      location.forestType ?? "",
      [language, "la"],
      activeProfile,
    );
    if (!selectedLocation) {
      throw new Error(`No forest type found in profile ${activeProfile}`);
    }
  } catch {
    selectedLocation = treeClient.getForestTypeByCode<AnyForestType>(
      location.forestType ?? "",
      [language, "la"],
    );
  }
  const locationString = writeLine(
    `${location.forestType} - ${
      // @ts-expect-error - Some profiles have no french translation, but we just fall back to German
      selectedLocation[latinActive ? "la" : language] ?? selectedLocation.de
    }`,
    `${t("export.locationType")}`,
  );

  const altitudinalZone = writeLine(
    `${
      treeClient.getTypes<AltitudinalZone>("altitudinalzone", [language], {
        code: `= '${location.altitudinalZone}'`,
      })?.[0][language]
    }`,
    `${t("altitudinalZone.label")}`,
  );

  const permalink = new Paragraph({
    children: [
      new ExternalHyperlink({
        children: [
          new TextRun({
            style: "Hyperlink",
            text: t("export.link"),
          }),
        ],
        link: window.location.href,
      }),
    ],
    style: "main-20",
  });

  const recommendationTitle = new Paragraph({
    heading: HeadingLevel.HEADING_3,
    text: t("app.recommendation"),
  });

  const futureInfo =
    future &&
    new Paragraph({
      style: "recommendation-future",
      text: t("export.future"),
    });

  const details = [
    mainTitle,
    profile,
    date,
    coordinates,
    forestEcoregion,
    silverFirArea,
    locationString,
    altitudinalZone,
    permalink,
  ];

  if (projectionMode === "f") {
    details.push(writeLine(t("export.mode")));
  }

  const recommendationsTable = await writeRecommendationTable(
    location,
    projectionResult,
    projectionMode,
    future,
    latinActive,
    language,
  );

  const scenariosTable = writeScenariosTable(
    location,
    projectionResult,
    projectionMode,
    latinActive,
    language,
    t,
  );

  const children = [
    ...details,
    ...verticalSpace(1),
    recommendationTitle,
    recommendationsTable,
    futureInfo,
    ...verticalSpace(2),
    scenariosTable,
  ] as FileChild[];

  const doc = new Document({
    sections: [
      {
        children,
        properties: pageProperties,
      },
    ],
    styles: style,
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t("app.recommendation")}.docx`);
  });
};

export default exportRecommendation;
