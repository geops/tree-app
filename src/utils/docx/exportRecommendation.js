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
import { writeLine, style, verticalSpace } from './exportUtils';
import { writeRecommendationTable } from './writeRecommendationTable';
import { writeScenariosTable } from './writeScenariosTable';

export const exportRecommendation = async (
  location,
  projectionResult,
  projectionMode,
  future,
  latinActive,
  activeProfile,
  i18n,
  t,
) => {
  const mainTitle = new Paragraph({
    text: t('export.recommendationMainTitle'),
    heading: HeadingLevel.HEADING_1,
  });

  const profile = writeLine(
    t(`profiles.${activeProfile}`),
    t('export.profile'),
  );

  const date = writeLine(
    `${new Date().toLocaleDateString(
      `${i18n.language}-${i18n.language.toUpperCase()}`,
    )}`,
    t('export.date'),
  );

  const coordinates = writeLine(
    `${location.coordinate.toString().replace(',', ', ')}`,
    `${t('export.coordinate')}`,
  );

  const forestEcoregion = writeLine(
    `${info('forestEcoregion', location.forestEcoregion)[i18n.language]}`,
    `${t('forestEcoregion.label')}`,
  );

  const silverFirArea = writeLine(
    `${info('silverFirArea', location.silverFirArea)[i18n.language]}`,
    `${t('silverFirArea.label')}`,
  );

  let selectedLocation;
  try {
    selectedLocation = info('forestType', location.forestType, activeProfile);
  } catch {
    selectedLocation = info('forestType', location.forestType);
  }
  const locationString = writeLine(
    `${location.forestType} - ${
      selectedLocation[latinActive ? 'la' : i18n.language]
    }`,
    `${t('export.locationType')}`,
  );

  const altitudinalZone = writeLine(
    `${info('altitudinalZone', location.altitudinalZone)[i18n.language]}`,
    `${t('altitudinalZone.label')}`,
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

  const recommendationTitle = new Paragraph({
    text: t('app.recommendation'),
    heading: HeadingLevel.HEADING_3,
  });

  const futureInfo =
    future &&
    new Paragraph({
      text: t('export.future'),
      style: 'recommendation-future',
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

  if (projectionMode === 'f') {
    details.push(writeLine(t('export.mode')));
  }

  const recommendationsTable = await writeRecommendationTable(
    location,
    projectionResult,
    projectionMode,
    future,
    latinActive,
    i18n.language,
    t,
  );

  const scenariosTable = writeScenariosTable(
    location,
    projectionResult,
    projectionMode,
    latinActive,
    i18n.language,
    t,
  );

  const doc = new Document({
    styles: style,
    sections: [
      {
        children: [
          ...details,
          ...verticalSpace(1),
          recommendationTitle,
          recommendationsTable,
          futureInfo,
          ...verticalSpace(2),
          scenariosTable,
        ],
      },
    ],
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t('app.recommendation')}.docx`);
  });
};

export default exportRecommendation;
