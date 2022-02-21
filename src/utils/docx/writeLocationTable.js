import React from 'react';
import { Paragraph, Table, ImageRun, TextRun } from 'docx';
import TilleringSingle from '../../components/ForestTypeDescription/lu/TilleringSingle';
import Tillering from '../../components/ForestTypeDescription/lu/Tillering';
import Site from '../../components/ForestTypeDescription/lu/Site';
import { PAGE_WIDTH_DXA, getLocationTableRow, jsxToBlob } from './exportUtils';
import {
  vegetationMapping,
  soilMapping,
  getTilleringTreeTypes,
} from '../../components/ForestTypeDescription/lu/utils';
import { getImageUrl } from '../reliefMappings';
import { writeDataTable } from './writeDataTable';

export const writeLocationTable = async (location, profile, t) => {
  const tilleringHardwoodPng = await jsxToBlob(
    <TilleringSingle data={location.tilleringHardwood} />,
  );
  const tilleringPng = await jsxToBlob(<Tillering data={location.tillering} />);
  const sitePng = await jsxToBlob(<Site data={location.expoAndAspect} />);
  const reliefPng =
    getImageUrl(location.code, profile) &&
    (await fetch(getImageUrl(location.code, profile)).then((response) =>
      response.blob(),
    ));

  const rows = [
    getLocationTableRow(t('lu.forestType.tilleringHardwood'), [
      new Paragraph({
        children: [
          tilleringHardwoodPng
            ? new ImageRun({
                data: tilleringHardwoodPng,
                transformation: {
                  width: 225,
                  height: 30,
                },
              })
            : new TextRun('-'),
        ],
      }),
    ]),
    getLocationTableRow(t('lu.forestType.tillering'), [
      new Paragraph(''),
      new Paragraph({
        children: [
          tilleringPng
            ? new ImageRun({
                data: tilleringPng,
                transformation: {
                  width: 225,
                  height:
                    getTilleringTreeTypes(location.tillering).length * 19 + 30,
                },
              })
            : new TextRun('-'),
        ],
      }),
      new Paragraph(''),
    ]),
    getLocationTableRow(
      `${t('lu.forestType.tilleringFirwood')} min (opt)`,
      location.tilleringFirwood.every((val) => !val)
        ? '-'
        : `${location.tilleringFirwood[0]}${
            location.tilleringFirwood[1]
              ? ` (${location.tilleringFirwood[1]})`
              : ''
          }`,
    ),
    getLocationTableRow(
      t('lu.forestType.pioneerTreeTypes'),
      location.pioneerTreeTypes.toString().replace(',', ', '),
    ),
    getLocationTableRow(
      t('lu.forestType.compactRisk.label'),
      t(`lu.forestType.compactRisk.${location.compactRisk}`),
    ),
    getLocationTableRow(
      t('lu.forestType.priority.label'),
      location.priority
        ? t(`lu.forestType.priority.${location.priority}`)
        : '-',
    ),
    getLocationTableRow(t('lu.forestType.aptitude'), location.aptitude),
    getLocationTableRow(t('lu.forestType.rejuvDev'), location.forestryRejuvDev),
    getLocationTableRow(t('lu.forestType.care'), location.forestryCare),
    getLocationTableRow(t('lu.forestType.description'), location.description),
    getLocationTableRow(
      t('lu.forestType.heightDispersion'),
      location.heightDispersion,
    ),
    getLocationTableRow(t('lu.forestType.terrain'), [
      new Paragraph({
        children: [
          reliefPng
            ? new ImageRun({
                data: reliefPng,
                transformation: {
                  width: 150,
                  height: 90,
                },
              })
            : new TextRun('-'),
        ],
      }),
    ]),
    getLocationTableRow(
      `${t('forestTypeDiagram.slope')} & ${t(
        'forestTypeDiagram.aspect.label',
      )}`,
      [
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
      ],
    ),
    getLocationTableRow(t('forestTypeDiagram.vegetation'), location.vegetation),
    getLocationTableRow(t('forestType.vegetationIndicator'), [
      writeDataTable(
        location.vegetationIndicator,
        vegetationMapping,
        'lu.forestType.vegetationIndicator',
        t,
      ),
    ]),
    getLocationTableRow(t('lu.forestType.soil.label'), [
      writeDataTable(location.soil, soilMapping, 'lu.forestType.soil', t),
    ]),
  ];

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows,
  });
};

export default writeLocationTable;
