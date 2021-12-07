import {
  Paragraph,
  HeadingLevel,
  Document,
  Packer,
  TextRun,
  ExternalHyperlink,
} from 'docx';
import { saveAs } from 'file-saver';
import { info } from '@geops/tree-lib';
import { writeLine, style, verticalSpace, pageBreak } from './utils';
import { writeLocationTable } from './writeLocationTable';
import { writeAssociationsTable } from './writeAssociationsTable';

export const exportLocation = async (location, activeProfile, language, t) => {
  const mainTitle = new Paragraph({
    text: t('export.recommendationMainTitle'),
    heading: HeadingLevel.HEADING_1,
  });

  const date = writeLine(
    `${new Date().toLocaleDateString(`${language}-${language.toUpperCase()}`)}`,
    t('export.date'),
  );

  const locationTitle = new Paragraph({
    children: [
      new TextRun(`${location.code} - ${location[language]} `),
      new TextRun({
        text: location.la,
        italics: true,
      }),
    ],
    heading: HeadingLevel.HEADING_3,
  });

  const permalink = new Paragraph({
    style: 'main',
    children: [
      new TextRun({
        text: t('export.link'),
        bold: true,
      }),
      new TextRun(': '),
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: `${window.location.href}`,
            style: 'Hyperlink',
          }),
        ],
        link: window.location.href,
      }),
    ],
  });

  const locationTable = await writeLocationTable(
    location,
    language,
    activeProfile,
    t,
  );

  const associationGroup = info(
    'associationGroup',
    location.associationGroupCode,
    activeProfile,
  );

  const associationsTitle = new Paragraph({
    children: [
      new TextRun(`${associationGroup.code} - ${associationGroup[language]} `),
      new TextRun({
        text: associationGroup.la,
        italics: true,
      }),
    ],
    heading: HeadingLevel.HEADING_3,
  });

  const associationsTable = writeAssociationsTable(
    associationGroup,
    activeProfile,
    language,
    t,
  );

  const doc = new Document({
    styles: style,
    sections: [
      {
        children: [
          mainTitle,
          date,
          permalink,
          ...verticalSpace(2),
          locationTitle,
          locationTable,
          pageBreak,
          associationsTitle,
          associationsTable,
        ],
      },
    ],
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t('app.locationDescription')}.docx`);
  });
};

export default exportLocation;
