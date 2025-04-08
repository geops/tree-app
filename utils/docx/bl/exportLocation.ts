import { Document, HeadingLevel, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

import useStore from "@/store";

import {
  getPermalink,
  getTitle,
  pageBreak,
  pageProperties,
  style,
  verticalSpace,
  writeLine,
} from "../exportUtils";

import writeAssociationsTable from "./writeAssociationsTable";
import writeLocationTable from "./writeLocationTable";

import type { BlAssociationGroup, BlForestType } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

export const exportLocation = async (
  forestType: BlForestType,
  language: TreeAppLanguage,
  t: (string: string) => string,
) => {
  const { treeClient } = useStore.getState();
  const mainTitle = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    text: t("export.recommendationMainTitle"),
  });

  const profile = writeLine(t("profiles.bl"), "Profil");
  const date = writeLine(
    `${new Date().toLocaleDateString(`${language}-${language.toLocaleUpperCase()}`)}`,
    "Datum",
  );
  const permalink = getPermalink("Link");

  const locationTitle = getTitle(
    `${forestType.code} - ${forestType.de} `,
    forestType.la,
  );
  const locationTable = await writeLocationTable(forestType, t);

  let children = [
    mainTitle,
    profile,
    date,
    permalink,
    ...verticalSpace(1),
    locationTitle,
    locationTable,
  ];

  const associationGroup = treeClient.getTypes<BlAssociationGroup>(
    "bl_associationgroup",
    undefined,
    undefined,
    `WHERE '${forestType.code}' IN (
        SELECT value
        FROM json_each(bl_associationgroup.locations)
        )`,
  )?.[0];

  if (associationGroup) {
    const associationsTitle = getTitle(associationGroup?.de);
    const associationsTable = writeAssociationsTable(associationGroup);
    children = [...children, pageBreak, associationsTitle, associationsTable];
  }

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
    saveAs(blob, "Tree-App_Standortbeschreibung.docx");
  });
};

export default exportLocation;
