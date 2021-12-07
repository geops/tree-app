import React from 'react';
import { Paragraph, Table, ImageRun } from 'docx';
import { renderToString } from 'react-dom/server';
import TilleringSingle from '../../components/ForestTypeDescription/lu/TilleringSingle';
import Tillering from '../../components/ForestTypeDescription/lu/Tillering';
import Site from '../../components/ForestTypeDescription/lu/Site';
import { PAGE_WIDTH_DXA, getLocationRow, svgStringToBlob } from './utils';
import {
  vegetationMapping,
  soilMapping,
  getTilleringTreeTypes,
} from '../../components/ForestTypeDescription/lu/utils';
import { getImageUrl } from '../reliefMappings';

const getTypesString = (array, mapping, translationPath, t) =>
  array.reduce((all, indicator, index, arr) => {
    if (!indicator) {
      return all;
    }
    let icon = '+';
    if (indicator !== 1) {
      icon = indicator === 2 ? '□' : '■';
    }
    return `${all}${mapping[index]?.toUpperCase()}: ${t(
      `${translationPath}.${mapping[index]}`,
    )}    ${icon}${index + 1 !== arr.length ? '\\n' : ''}`;
  }, '');

export const writeLocationTable = async (location, profile, t) => {
  const tilleringHardwoodPng = await svgStringToBlob(
    renderToString(<TilleringSingle data={location.tilleringHardwood} />),
  );
  const tilleringPng = await svgStringToBlob(
    renderToString(<Tillering data={location.tillering} />),
  );
  const sitePng = await svgStringToBlob(
    renderToString(<Site data={location.expoAndAspect} />),
  );
  const reliefPng = await fetch(getImageUrl(location.code, profile)).then(
    (response) => response.blob(),
  );

  const rows = [
    getLocationRow(t('lu.forestType.tilleringHardwood'), [
      new Paragraph({
        children: [
          new ImageRun({
            data: tilleringHardwoodPng,
            transformation: {
              width: 300,
              height: 40,
            },
          }),
        ],
      }),
    ]),
    getLocationRow(t('lu.forestType.tillering'), [
      new Paragraph({
        children: [
          new ImageRun({
            data: tilleringPng,
            transformation: {
              width: 300,
              height:
                getTilleringTreeTypes(location.tillering).length * 25 + 30,
            },
          }),
        ],
      }),
    ]),
    getLocationRow(
      `${t('lu.forestType.tilleringFirwood')} min (opt)`,
      location.tilleringFirwood.every((val) => !val)
        ? '-'
        : `${location.tilleringFirwood[0]}${
            location.tilleringFirwood[1]
              ? ` (${location.tilleringFirwood[1]})`
              : ''
          }`,
    ),
    getLocationRow(
      t('lu.forestType.pioneerTreeTypes'),
      location.pioneerTreeTypes.toString().replace(',', ', '),
    ),
    getLocationRow(
      t('lu.forestType.compactRisk.label'),
      t(`lu.forestType.compactRisk.${location.compactRisk}`),
    ),
    getLocationRow(
      t('lu.forestType.priority.label'),
      location.priority
        ? t(`lu.forestType.priority.${location.priority}`)
        : '-',
    ),
    getLocationRow(t('lu.forestType.aptitude'), location.aptitude),
    getLocationRow(t('lu.forestType.rejuvDev'), location.forestryRejuvDev),
    getLocationRow(t('lu.forestType.care'), location.forestryCare),
    getLocationRow(t('lu.forestType.description'), location.description),
    getLocationRow(
      t('lu.forestType.heightDispersion'),
      location.heightDispersion,
    ),
    getLocationRow(t('lu.forestType.terrain'), [
      new Paragraph({
        children: [
          new ImageRun({
            data: reliefPng,
            transformation: {
              width: 300,
              height: 180,
            },
          }),
        ],
      }),
    ]),
    getLocationRow(
      `${t('forestTypeDiagram.slope')} & ${t(
        'forestTypeDiagram.aspect.label',
      )}`,
      [
        new Paragraph({
          children: [
            new ImageRun({
              data: sitePng,
              transformation: {
                width: 250,
                height: 250,
              },
            }),
          ],
        }),
      ],
    ),
    getLocationRow(t('forestTypeDiagram.vegetation'), location.vegetation),
    getLocationRow(
      t('lu.forestType.vegetationIndicator.label'),
      getTypesString(
        location.vegetationIndicator,
        vegetationMapping,
        'lu.forestType.vegetationIndicator',
        t,
      ),
    ),
    getLocationRow(
      t('lu.forestType.soil.label'),
      getTypesString(location.soil, soilMapping, 'lu.forestType.soil', t),
    ),
  ];

  return new Table({
    columnWidths: [(PAGE_WIDTH_DXA / 6) * 2, (PAGE_WIDTH_DXA / 6) * 4],
    rows,
  });
};

export default writeLocationTable;
