import React from 'react';
import { Paragraph, Table, ImageRun, TextRun, BorderStyle } from 'docx';

import Site from '../../../components/ForestTypeModal/ForestTypeDescription/bl/Site';
import { PAGE_WIDTH_DXA, getLocationTableRow, jsxToBlob } from '../exportUtils';
import {
  vegetationMapping,
  getTilleringTreeTypes,
  soilIconTranslator,
} from '../../../components/ForestTypeModal/ForestTypeDescription/bl/utils';
import { getValidForestTypes } from '../../comparisonUtils';
import { writeDataTable } from '../writeDataTable';

const writeLocationTable = async (data, t) => {
  const sitePng = await jsxToBlob(<Site data={data.expoAndAspect} />);
  const transitions = getValidForestTypes(data.transitions, 'bl');
  const borderConfig = {
    color: 'e0e1e2',
    style: BorderStyle.SINGLE,
    size: 1,
  };

  const rows = [
    getLocationTableRow('Eigenschaften', data.properties),
    getLocationTableRow('Bestockungsziele', data.tillering),
    getLocationTableRow('Verjüngung und Entwicklung', data.forestryRejuvDev),
    getLocationTableRow('Pflege', data.forestryCare),
    getLocationTableRow('Beschrieb Naturwald', data.descriptionNaturalForest),
    getLocationTableRow('Höhenverbreitung', data.heightDispersion),
    getLocationTableRow('Standort', data.location),
    getLocationTableRow('Geologie', data.geology),
    getLocationTableRow('Vegetation', data.vegetation),
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
    getLocationTableRow('Laubholzanteil', `${data.tilleringHardwood}%`),
    getLocationTableRow('Zeigergruppen', [
      writeDataTable(
        data.vegetationIndicator,
        vegetationMapping,
        'bl.forestType.vegetationIndicators',
        soilIconTranslator,
        t,
      ),
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
  ];

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows,
  });
};

export default writeLocationTable;
