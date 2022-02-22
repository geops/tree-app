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
import {
  writeLine,
  style,
  verticalSpace,
  pageBreak,
  pageProperties,
} from '../exportUtils';
import writeLocationTable from './writeLocationTable';
import writeAssociationsTable from './writeAssociationsTable';

const getTitle = (title, latin) =>
  new Paragraph({
    children: [
      new TextRun(title),
      new TextRun({
        text: latin,
        italics: true,
      }),
    ],
    heading: HeadingLevel.HEADING_3,
  });

export const exportLocation = async (location, language, t) => {
  const mainTitle = new Paragraph({
    text: t('export.recommendationMainTitle'),
    heading: HeadingLevel.HEADING_1,
  });

  const profile = writeLine(t('profiles.lu'), t('export.profile'));

  const date = writeLine(
    `${new Date().toLocaleDateString(`${language}-${language.toUpperCase()}`)}`,
    t('export.date'),
  );

  const permalink = new Paragraph({
    style: 'main-20',
    children: [
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: t('export.link'),
            style: 'Hyperlink',
          }),
        ],
        link: window.location.href,
      }),
    ],
  });

  const locationTitle = getTitle(
    `${location.code} - ${location[language]} `,
    location.la,
  );
  const locationTable = await writeLocationTable(location, t);

  const associationGroup = info(
    'associationGroup',
    location.associationGroupCode,
    'lu',
  );

  const associationsTitle = getTitle(
    `${associationGroup.code} - ${associationGroup[language]} `,
    associationGroup.la,
  );
  const associationsTable = writeAssociationsTable(
    associationGroup,
    language,
    t,
  );

  const doc = new Document({
    styles: style,
    sections: [
      {
        properties: pageProperties,
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
      },
    ],
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t('app.locationDescription')}.docx`);
  });
};

export default exportLocation;
