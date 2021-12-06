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
import { writeRecommendationsTable } from './writeRecommendationsTable';
import { writeScenariosTable } from './writeScenariosTable';

export const exportRecommendations = async (
  location,
  projectionResult,
  projectionMode,
  future,
  latinActive,
  i18n,
  t,
) => {
  const mainTitle = new Paragraph({
    text: t('export.recommendationMainTitle'),
    heading: HeadingLevel.HEADING_1,
  });

  const date = writeLine(
    `: ${new Date().toLocaleDateString(
      `${i18n.language}-${i18n.language.toUpperCase()}`,
    )}`,
    t('export.date'),
  );

  const coordinates = writeLine(
    `: ${location.coordinate.toString().replace(',', ', ')}`,
    `${t('export.coordinate')}`,
  );

  const forestEcoregion = writeLine(
    `: ${info('forestEcoregion', location.forestEcoregion)[i18n.language]}`,
    `${t('forestEcoregion.label')}`,
  );

  const silverFirArea = writeLine(
    `: ${info('silverFirArea', location.silverFirArea)[i18n.language]}`,
    `${t('silverFirArea.label')}`,
  );

  const selectedLocation = info('forestType', location.forestType);
  const locationString = writeLine(
    `: ${location.forestType} - ${
      selectedLocation[latinActive ? 'la' : i18n.language]
    }`,
    `${t('export.locationType')}`,
  );

  const altitudinalZone = writeLine(
    `: ${info('altitudinalZone', location.altitudinalZone)[i18n.language]}`,
    `${t('altitudinalZone.label')}`,
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

  const details = [
    mainTitle,
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

  const recommendationsTable = await writeRecommendationsTable(
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
          ...verticalSpace(3),
          recommendationsTable,
          pageBreak,
          scenariosTable,
        ],
      },
    ],
  });

  return Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Tree-App_${t('app.recommendation')}.docx`);
  });
};

export default exportRecommendations;
