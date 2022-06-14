import React from 'react';
import { Paragraph, Table, ImageRun, TextRun, BorderStyle } from 'docx';

import Site from '../../../components/ForestTypeModal/ForestTypeDescription/bl/Site';
import {
  PAGE_WIDTH_DXA,
  getLocationTableRow,
  jsxToBlob,
  getImageHtml,
} from '../exportUtils';
import {
  vegetationMapping,
  getTilleringTreeTypes,
  soilIconTranslator,
} from '../../../components/ForestTypeModal/ForestTypeDescription/bl/utils';
import { getValidForestTypes } from '../../comparisonUtils';
import { writeDataTable } from '../writeDataTable';
import { getImageUrl } from '../../reliefMappings';

const writeLocationTable = async (data, t) => {
  const sitePng = await jsxToBlob(<Site data={data.expoAndAspect} />);
  const imagePath = getImageUrl(data.code, 'bl');
  const imageHtml = imagePath && (await getImageHtml(imagePath));
  const imageBlob =
    imagePath && (await fetch(imagePath).then((response) => response.blob()));
  const transitions = getValidForestTypes(data.transitions, 'bl');
  const borderConfig = {
    color: 'e0e1e2',
    style: BorderStyle.SINGLE,
    size: 1,
  };

  const rows = [
    getLocationTableRow(
      'Laubholzanteil',
      data.tilleringHardwood ? `${data.tilleringHardwood}%` : '-',
    ),
    getLocationTableRow(
      'Als Hauptbaumart geeignet',
      getTilleringTreeTypes(data.tilleringTreeTypes, 'D') || '-',
      undefined,
      {
        top: borderConfig,
        bottom: { style: BorderStyle.NIL },
        left: borderConfig,
        right: borderConfig,
      },
    ),
    getLocationTableRow(
      'Als Nebenbaumart geeignet',
      getTilleringTreeTypes(data.tilleringTreeTypes, 'N') || '-',
      undefined,
      {
        top: { style: BorderStyle.NIL },
        bottom: { style: BorderStyle.NIL },
        left: borderConfig,
        right: borderConfig,
      },
    ),
    getLocationTableRow(
      'Baumart mitpflegen',
      getTilleringTreeTypes(data.tilleringTreeTypes, 'S') || '-',
      undefined,
      {
        top: { style: BorderStyle.NIL },
        bottom: { style: BorderStyle.NIL },
        left: borderConfig,
        right: borderConfig,
      },
    ),
    getLocationTableRow(
      'Gastbaumart, als Hauptbaumart geeignet',
      getTilleringTreeTypes(data.tilleringTreeTypes, 'G') || '-',
      undefined,
      {
        top: { style: BorderStyle.NIL },
        bottom: borderConfig,
        left: borderConfig,
        right: borderConfig,
      },
    ),
    getLocationTableRow('Eigenschaften', data.properties),
    getLocationTableRow('Bestockungsziele', data.tillering),
    getLocationTableRow('Verjüngung und Entwicklung', data.forestryRejuvDev),
    getLocationTableRow('Pflege', data.forestryCare),
    getLocationTableRow(
      t('bl.forestType.descriptionNaturalForest'),
      data.descriptionNaturalForest,
    ),
    getLocationTableRow(
      'Übergänge zu',
      transitions?.map(
        (ft) =>
          new Paragraph({
            text: `${ft.code} - ${ft.de}`,
            style: 'main-20',
          }),
      ),
    ),
    getLocationTableRow('Höhenverbreitung', data.heightDispersion),
    getLocationTableRow('Standort', data.location),
    getLocationTableRow('Geologie', data.geology),
    getLocationTableRow(t('forestType.terrain'), [
      new Paragraph({
        children: [
          imageBlob
            ? new ImageRun({
                data: imageBlob,
                transformation: {
                  width: imageHtml.width,
                  height: imageHtml.height,
                },
              })
            : new TextRun('-'),
        ],
      }),
    ]),
    getLocationTableRow('Hangneigung & Exposition', [
      new Paragraph({
        children: [
          sitePng
            ? new ImageRun({
                data: sitePng,
                transformation: {
                  width: 120,
                  height: 120,
                },
              })
            : new TextRun('-'),
        ],
      }),
    ]),
    getLocationTableRow('Vegetation', data.vegetation),
    getLocationTableRow('Zeigerartengruppen', [
      writeDataTable(
        data.vegetationIndicator,
        vegetationMapping,
        'bl.forestType.vegetationIndicators',
        soilIconTranslator,
        t,
      ),
    ]),
  ];

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows,
  });
};

export default writeLocationTable;
