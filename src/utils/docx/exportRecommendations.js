import {
  Paragraph,
  HeadingLevel,
  Document,
  Packer,
  TextRun,
  ExternalHyperlink,
} from 'docx';
import { saveAs } from 'file-saver';
import { toLonLat } from 'ol/proj';
import { info } from '@geops/tree-lib';
import { writeLine, style, verticalSpace } from './utils';
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
  if (projectionResult) {
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

    const locationCoords = toLonLat(location.coordinate)
      .map((val) => val.toFixed(3))
      .toString()
      .replace(',', ', ');
    const coordinates = writeLine(
      `: ${locationCoords}`,
      `${t('export.coordinate')}`,
    );

    const forestEcoregion = writeLine(
      `: ${location.forestEcoregion}`,
      `${t('forestEcoregion.label')}`,
    );

    const silverFirArea = writeLine(
      `: ${location.silverFirArea}`,
      `${t('silverFirArea.label')}`,
    );

    const selectedLocation = info('forestType', location.forestType);
    const locationString = writeLine(
      `: ${location.forestType} - ${
        selectedLocation[latinActive ? 'la' : i18n.language]
      }`,
      `${t('info.locationTitle')}`,
    );

    const altitudinalZone = writeLine(
      `: ${location.altitudinalZone}`,
      `${t('altitudinalZone.label')}`,
    );

    const permalink = new Paragraph({
      style: 'scenarios-primary',
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
            ...verticalSpace(3),
            scenariosTable,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Tree-App_${t('app.recommendation')}.docx`);
    });
  }
};

export default style;
