import { Paragraph, HeadingLevel, Document, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { info } from '@geops/tree-lib';

import {
  writeLine,
  style,
  verticalSpace,
  pageProperties,
  pageBreak,
  getTitle,
  getPermalink,
} from '../exportUtils';
import writeLocationTable from './writeLocationTable';
import writeAssociationsTable from './writeAssociationsTable';

export const exportLocation = async (location, language, t) => {
  const mainTitle = new Paragraph({
    text: t('export.recommendationMainTitle'),
    heading: HeadingLevel.HEADING_1,
  });

  const profile = writeLine(t('profiles.bl'), 'Profil');
  const date = writeLine(
    `${new Date().toLocaleDateString(`${language}-${language.toUpperCase()}`)}`,
    'Datum',
  );
  const permalink = getPermalink('Link');

  const locationTitle = getTitle(
    `${location.code} - ${location[language]} `,
    location.la,
  );
  const locationTable = await writeLocationTable(location, t);

  let children = [
    mainTitle,
    profile,
    date,
    permalink,
    ...verticalSpace(1),
    locationTitle,
    locationTable,
  ];

  const associationGroup = info('associationGroup', undefined, 'bl').find(
    (assGroup) => assGroup.locations.includes(location.code),
  );

  if (associationGroup) {
    const associationsTitle = getTitle(associationGroup?.de);
    const associationsTable = writeAssociationsTable(
      associationGroup,
      language,
      t,
    );
    children = [...children, pageBreak, associationsTitle, associationsTable];
  }

  const doc = new Document({
    styles: style,
    sections: [
      {
        properties: pageProperties,
        children,
      },
    ],
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, 'Tree-App_Standortbeschreibung.docx');
  });
};

export default exportLocation;
