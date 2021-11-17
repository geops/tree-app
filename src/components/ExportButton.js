import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  TextRun,
} from 'docx';
import { list, info } from '@geops/tree-lib';
import { hochmontanAltitudinalZones } from '../store/enhancers/projection';
import Button from './Button';

import styles from './ExportButton.module.css';

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

function getColumn(scenario, projection, language, t, treeValues) {
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

const createTitle = (location, language, t) =>
  new Paragraph({
    text: `${location.info.code}: ${location.info[language]}`,
    heading: HeadingLevel.HEADING_2,
  });

const createTable = (
  location,
  projectionResult,
  projectionMode,
  language,
  t,
  latinActive,
) => {
  const treeValues = list(location, true).slice(0, 3);
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
      columns.push(
        getColumn('todayModerateExtreme', location, language, t, treeValues),
      );
    } else if (moderateKey === extremeKey) {
      columns.push(getColumn('today', location, language, t, treeValues));
      columns.push(
        getColumn('moderateExtreme', moderate, language, t, treeValues),
      );
    } else if (todayKey === moderateKey) {
      columns.push(
        getColumn('todayModerate', location, language, t, treeValues),
      );
      columns.push(getColumn('extreme', extreme, language, t, treeValues));
    } else if (todayKey === extremeKey) {
      columns.push(
        getColumn('todayExtreme', location, language, t, treeValues),
      );
      columns.push(getColumn('moderate', moderate, language, t, treeValues));
    } else {
      columns.push(getColumn('today', location, language, t, treeValues));
      columns.push(getColumn('moderate', moderate, language, t, treeValues));
      columns.push(getColumn('extreme', extreme, language, t, treeValues));
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
                  new Paragraph(t(column.header)),
                  new Paragraph(t(column.subHeader)),
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
            children: [new Paragraph(t('projection.treeTypesTwo'))],
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
                      (string, type, index, arr) =>
                        `${string}${index !== 0 ? ', ' : ''}${type[language]}${
                          type.endangered ? '†' : ''
                        }${type.nonresident ? '°' : ''}${
                          type.pioneer ? '*' : ''
                        }`,
                      '',
                    ),
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
            children: [new Paragraph(t('projection.treeTypesThree'))],
          }),
          ...columns.map(
            (column) =>
              new TableCell({
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph(t(column.header))],
              }),
          ),
        ],
      }),
    ],
  });
};

function ExportButton({ sameAltitudinalZone }) {
  const { t, i18n } = useTranslation();
  const { location, projectionMode, projectionResult, latinActive } =
    useSelector((state) => ({
      location: state.location,
      projectionMode: state.projectionMode,
      projectionResult: state.projectionResult,
      latinActive: state.latinActive,
    }));
  const treeValues = useMemo(() => list(location, true), [location]).slice(
    0,
    3,
  );

  // const recommendation = useMemo(() => {
  //   let projections;
  //   let result;

  //   if (projectionMode === 'f') {
  //     projections = projectionResult.form.projections?.slice(-1) || [];
  //   } else {
  //     const { moderate, extreme } = projectionResult;
  //     projections = [
  //       ...(moderate.projections ? moderate.projections.slice(-1) : [location]),
  //       ...(extreme.projections ? extreme.projections.slice(-1) : [location]),
  //     ];
  //   }

  //   try {
  //     if ((projections && projections.length === 0) || sameAltitudinalZone) {
  //       result = recommend(location, [location], false);
  //     } else {
  //       result = recommend(location, projections, false);
  //     }
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.log('Recommendation error: ', error);
  //   }
  //   return result;
  // }, [location, projectionMode, projectionResult, sameAltitudinalZone]);

  // console.log(recommendation);
  const exportDocX = useCallback(() => {
    if (projectionResult) {
      const title = createTitle(location, i18n.language, t, latinActive);
      const table = createTable(
        location,
        projectionResult,
        projectionMode,
        i18n.language,
        t,
        latinActive,
        treeValues,
      );
      const doc = new Document({
        sections: [
          {
            children: [
              new TextRun(
                'My awesome text here for my university dissertation',
              ),
              title,
              table,
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'tree-app.docx');
      });
    }
  }, [
    projectionResult,
    location,
    i18n.language,
    t,
    latinActive,
    treeValues,
    projectionMode,
  ]);

  return (
    <div className={styles.container}>
      <Button className={styles.togglebutton} onClick={exportDocX}>
        {t('DOCX exportieren')}
      </Button>
    </div>
  );
}

ExportButton.propTypes = {
  sameAltitudinalZone: PropTypes.bool,
};

ExportButton.defaultProps = {
  sameAltitudinalZone: false,
};

export default ExportButton;
