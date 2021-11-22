import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toLonLat } from 'ol/proj';
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  WidthType,
  TableCell,
  HeadingLevel,
} from 'docx';
import { list, info } from '@geops/tree-lib';
import { hochmontanAltitudinalZones } from '../store/enhancers/projection';
import Button from './Button';
import docxStyle from '../utils/docxStyles';

function getAZ(altitudinalZone) {
  if (hochmontanAltitudinalZones.includes(altitudinalZone)) {
    return '80';
  }
  return altitudinalZone;
}

function getResultLocation(scenario, location) {
  return scenario.projections
    ? scenario.projections.slice(-1)[0] || location
    : location;
}

function getResultKey(location) {
  const { altitudinalZone, forestType, transitionForestType } = location;
  return `${getAZ(altitudinalZone)}|${forestType}|${transitionForestType}`;
}

const treeTypesReducer = (language) => (string, type, index, arr) =>
  `${string}${index !== 0 ? ', ' : ''}${type[language]}${
    type.endangered ? '†' : ''
  }${type.nonresident ? '°' : ''}${type.pioneer ? '*' : ''}`;

function getColumn(scenario, projection, language, t) {
  const scenarios = [];
  const { forestType, transitionForestType } = projection;
  const altitudinalZone = getAZ(projection.altitudinalZone);
  if (scenario.toLowerCase().includes('today')) {
    scenarios.push(t('projectionScenario.today'));
  }
  if (scenario.toLowerCase().includes('form')) {
    scenarios.push(t('projectionScenario.manual'));
  }
  if (scenario.toLowerCase().includes('moderateextreme')) {
    scenarios.push(t('projectionScenario.moderateExtreme'));
  } else if (scenario.toLowerCase().includes('moderate')) {
    scenarios.push(t('projectionScenario.moderate'));
  } else if (scenario.toLowerCase().includes('extreme')) {
    scenarios.push(t('projectionScenario.extreme'));
  }

  const treeValues = list(projection, true).slice(0, 3);

  return (
    forestType && {
      header: `${
        transitionForestType
          ? ` ${forestType} (${transitionForestType}) `
          : ` ${forestType} `
      } ${info('altitudinalZone', altitudinalZone)[language]}`,
      subHeader: scenarios.join(', '),
      dominantType: info('treeType', treeValues[0][0]),
      importantTypes: treeValues[1].map((code) => info('treeType', code)),
      otherTypes: treeValues[2].map((code) => info('treeType', code)),
    }
  );
}

const createTitle = (text, heading = 'HEADING_2', children) => {
  const options = {
    text,
    heading: HeadingLevel[heading],
  };
  if (children) {
    options.children = children;
  }
  return new Paragraph(options);
};

const createTable = (
  location,
  projectionResult,
  projectionMode,
  language,
  t,
  latinActive,
) => {
  const columns = [];
  if (projectionMode === 'f' && projectionResult.form.projections) {
    const form = projectionResult.form.projections.slice(-1)[0] || {};
    columns.push(getColumn('today', location, language, t));
    columns.push(getColumn('form', form, language, t));
  } else {
    const moderate = getResultLocation(projectionResult.moderate, location);
    const extreme = getResultLocation(projectionResult.extreme, location);
    const todayKey = getResultKey(location);
    const moderateKey = getResultKey(moderate);
    const extremeKey = getResultKey(extreme);
    if (moderateKey === extremeKey && todayKey === moderateKey) {
      columns.push(getColumn('todayModerateExtreme', location, language, t));
    } else if (moderateKey === extremeKey) {
      columns.push(getColumn('today', location, language, t));
      columns.push(getColumn('moderateExtreme', moderate, language, t));
    } else if (todayKey === moderateKey) {
      columns.push(getColumn('todayModerate', location, language, t));
      columns.push(getColumn('extreme', extreme, language, t));
    } else if (todayKey === extremeKey) {
      columns.push(getColumn('todayExtreme', location, language, t));
      columns.push(getColumn('moderate', moderate, language, t));
    } else {
      columns.push(getColumn('today', location, language, t));
      columns.push(getColumn('moderate', moderate, language, t));
      columns.push(getColumn('extreme', extreme, language, t));
    }
  }
  return new Table({
    columnWidths: [3505, 5505],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            children: [],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph(column.header),
                  new Paragraph(column.subHeader),
                ],
              }),
          ),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(t('projection.treeTypesOne'))],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph(column.dominantType[language])],
              }),
          ),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph({
                text: t('projection.treeTypesTwo'),
                style: 'table',
              }),
            ],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: column.importantTypes.reduce(
                      treeTypesReducer(language),
                      '',
                    ),
                    style: 'table',
                  }),
                ],
              }),
          ),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph({
                text: t('projection.treeTypesThree'),
                style: 'table',
              }),
            ],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: column.otherTypes.reduce(
                      treeTypesReducer(language),
                      '',
                    ),
                    style: 'table',
                  }),
                ],
              }),
          ),
        ],
      }),
    ],
  });
};

function ExportButton({ sameAltitudinalZone }) {
  const { t, i18n } = useTranslation();
  const {
    location,
    projectionMode,
    projectionResult,
    latinActive,
    mapLocation,
  } = useSelector((state) => ({
    location: state.location,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
    latinActive: state.latinActive,
    mapLocation: state.mapLocation,
  }));

  const exportDocX = useCallback(() => {
    if (projectionResult) {
      const mainTitle = createTitle(
        t('export.recommendationMainTitle'),
        'HEADING_1',
      );
      const date = new Paragraph(
        `${new Date().toLocaleDateString(
          `${i18n.language}-${i18n.language.toUpperCase()}`,
        )}`,
      );
      const locationCoords = toLonLat(mapLocation.coordinate).reduce(
        (string, val, idx) =>
          idx !== 0 ? `${string}, ${val.toFixed(3)}` : `${val.toFixed(3)}`,
      );
      const coordinates = new Paragraph(locationCoords);
      const table = createTable(
        location,
        projectionResult,
        projectionMode,
        i18n.language,
        t,
        latinActive,
      );
      const doc = new Document({
        creator: 'Clippy',
        title: 'Sample Document',
        description: 'A brief example of using docx',
        styles: docxStyle,
        sections: [
          {
            children: [mainTitle, date, coordinates, table],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'treeapp_recommendation.docx');
      });
    }
  }, [
    projectionResult,
    location,
    i18n.language,
    t,
    latinActive,
    projectionMode,
    mapLocation,
  ]);

  return <Button onClick={exportDocX}>{t('export.export')}</Button>;
}

ExportButton.propTypes = {
  sameAltitudinalZone: PropTypes.bool,
};

ExportButton.defaultProps = {
  sameAltitudinalZone: false,
};

export default ExportButton;
