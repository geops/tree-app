import React from 'react';
import { Paragraph, Table, ImageRun, TextRun } from 'docx';
import { utils } from '@geops/tree-lib';
import TilleringSingle from '../../../components/ForestTypeModal/ForestTypeDescription/lu/TilleringSingle';
import Tillering from '../../../components/ForestTypeModal/ForestTypeDescription/lu/Tillering';
import Site from '../../../components/ForestTypeModal/ForestTypeDescription/lu/Site';
import { PAGE_WIDTH_DXA, getLocationTableRow, jsxToBlob } from '../exportUtils';
import { getTilleringTreeTypes } from '../../../components/ForestTypeModal/ForestTypeDescription/lu/utils';
import { writeDataTable } from '../writeDataTable';

const { getReliefImageUrl, getMapping, getImageHtml } = utils();

const writeLocationTable = async (location, t) => {
  const tilleringHardwoodPng = await jsxToBlob(
    <TilleringSingle data={location.tilleringHardwood} />,
  );
  const tilleringPng = await jsxToBlob(<Tillering data={location.tillering} />);
  const sitePng = await jsxToBlob(<Site data={location.expoAndAspect} />);
  const imagePath = getReliefImageUrl(location.code, 'lu', true);
  const imageHtml = imagePath && (await getImageHtml(imagePath));
  const imageBlob =
    imagePath && (await fetch(imagePath).then((response) => response.blob()));

  const vegetationMapping = getMapping('vegetation', 'lu');
  const soilMapping = getMapping('soil', 'lu');

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
    getLocationTableRow(t('forestType.care'), location.forestryRejuvDev),
    getLocationTableRow(t('forestType.care'), location.forestryCare),
    getLocationTableRow(t('lu.forestType.description'), location.description),
    getLocationTableRow(
      t('lu.forestType.heightDispersion'),
      location.heightDispersion,
    ),
    getLocationTableRow(t('forestType.terrain'), [
      new Paragraph({
        children: [
          imageBlob
            ? new ImageRun({
                data: imageBlob,
                transformation: {
                  width: imageHtml.width / 3,
                  height: imageHtml.height / 3,
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
        'lu.forestType.vegetationIndicators',
        undefined,
        t,
      ),
    ]),
    getLocationTableRow(t('lu.forestType.soil.label'), [
      writeDataTable(
        location.soil,
        soilMapping,
        'lu.forestType.soil.typeMapping',
        undefined,
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
