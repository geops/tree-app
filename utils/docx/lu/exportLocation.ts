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

import type { LuAssociationGroup, LuForestType } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

export const exportLocation = async (
  forestType: LuForestType,
  language: TreeAppLanguage,
  t: (key: string) => string,
) => {
  const { treeClient } = useStore.getState();
  const mainTitle = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    text: t("export.recommendationMainTitle"),
  });

  const profile = writeLine(t("profiles.lu"), t("export.profile"));
  const date = writeLine(
    `${new Date().toLocaleDateString(`${language}-${language.toUpperCase()}`)}`,
    t("export.date"),
  );
  const permalink = getPermalink(t("export.link"));

  const locationTitle = getTitle(
    `${forestType.code} - ${forestType.de} `,
    forestType.la,
  );
  const locationTable = await writeLocationTable(forestType, t);

  const associationGroup = treeClient.getTypes<LuAssociationGroup>(
    "lu_associationgroup",
    undefined,
    { code: `= '${forestType.associationgroupcode}'` },
  )?.[0];

  const associationsTitle = getTitle(
    `${associationGroup.code} - ${associationGroup.de} `,
    associationGroup.la,
  );
  const associationsTable = writeAssociationsTable(associationGroup, t);

  const doc = new Document({
    sections: [
      {
        children: [
          mainTitle,
          profile,
          date,
          permalink,
          ...verticalSpace(1),
          locationTitle,
          locationTable,
          pageBreak,
          associationsTitle,
          associationsTable,
        ],
        properties: pageProperties,
      },
    ],
    styles: style,
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t("app.locationDescription")}.docx`);
  });
};

export default exportLocation;
