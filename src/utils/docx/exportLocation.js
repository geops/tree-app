import {
  Paragraph,
  HeadingLevel,
  Document,
  Packer,
  TextRun,
  ExternalHyperlink,
} from 'docx';
import { saveAs } from 'file-saver';
// import { info } from '@geops/tree-lib';
import { writeLine, style, verticalSpace, pageBreak } from './utils';
import { writeLocationTable } from './writeLocationTable';
// import { writeAssociationsTable } from './writeAssociationsTable';

export const exportLocation = async (location, activeProfile, language, t) => {
  const mainTitle = new Paragraph({
    text: t('export.recommendationMainTitle'),
    heading: HeadingLevel.HEADING_1,
  });

  const date = writeLine(
    `${new Date().toLocaleDateString(`${language}-${language.toUpperCase()}`)}`,
    t('export.date'),
  );

  const locationString = writeLine(
    `${location.code} - ${location[language]} (${location.la})`,
    `${t('app.location')}`,
  );

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

  // const scenariosTable = writeAssociationsTable(
  //   location,
  //   projectionResult,
  //   projectionMode,
  //   latinActive,
  //   i18n.language,
  //   t,
  // );

  const doc = new Document({
    styles: style,
    sections: [
      {
        children: [
          mainTitle,
          date,
          locationString,
          permalink,
          ...verticalSpace(3),
          locationTable,
          pageBreak,
          // scenariosTable,
        ],
      },
    ],
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t('app.locationDescription')}.docx`);
  });
};

export default exportLocation;
