import {
  Paragraph,
  HeadingLevel,
  Document,
  Packer,
  TextRun,
  ExternalHyperlink,
} from 'docx';
import { saveAs } from 'file-saver';
import {
  writeLine,
  style,
  verticalSpace,
  pageProperties,
} from '../exportUtils';
import writeLocationTable from './writeLocationTable';

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

  const profile = writeLine(t('profiles.bl'), t('export.profile'));

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
        ],
      },
    ],
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t('app.locationDescription')}.docx`);
  });
};

export default exportLocation;
