import React, { useCallback, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Header, Menu, Tab } from 'semantic-ui-react';
import { info, utils } from '@geops/tree-lib';

import ProjectionTab from './ProjectionTab';
import Recommendation from './Recommendation';
import ExportButton from './ExportButton';
import styles from './ProjectionResult.module.css';

import { getScenarios, getScenarioColumns } from '../utils/projectionUtils';
import { exportRecommendation } from '../utils/docx/exportRecommendation';

const { getAZ } = utils();

function getPane(scenario, projection, language, t) {
  const { forestType, transitionForestType } = projection;
  const altitudinalZone = getAZ(projection.altitudinalZone);
  const scenarios = getScenarios(scenario, t);

  return (
    forestType && {
      menuItem: (
        <Menu.Item className={styles.arrow} key={scenario}>
          <div className={styles.icons}>{scenarios.icons}</div>
          <div data-cypress="projectionResultMenuItem">
            {transitionForestType
              ? ` ${forestType} (${transitionForestType}) `
              : ` ${forestType} `}
            <span className={styles.altitudinalZone}>
              {info('altitudinalZone', altitudinalZone)[language]}
            </span>
          </div>
          <div className={styles.scenario}>{scenarios.names.join(', ')}</div>
        </Menu.Item>
      ),
      render: () => <ProjectionTab location={projection} key={scenario} />,
    }
  );
}
const checkFields = ['slope', 'additional', 'relief'];

function ProjectionResult() {
  const {
    location,
    mapLocation,
    projectionMode,
    projectionResult,
    latinActive,
    future,
    activeProfile,
  } = useSelector((state) => ({
    location: state.location,
    mapLocation: state.mapLocation,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
    latinActive: state.latinActive,
    future: state.future,
    activeProfile: state.activeProfile,
  }));
  const { i18n, t } = useTranslation();
  const AZToday = getAZ(location.altitudinalZone);
  const TAZModerate = getAZ(location.targetAltitudinalZoneModerate);
  const TAZExtreme = getAZ(location.targetAltitudinalZoneExtreme);
  const sameAltitudinalZone = AZToday === TAZModerate && AZToday === TAZExtreme;
  const { options } =
    projectionMode === 'm' ? projectionResult.extreme : projectionResult.form;

  const panes = useMemo(
    () => [
      {
        menuItem: t('recommendation.header'),
        render: () => (
          <Recommendation sameAltitudinalZone={sameAltitudinalZone} />
        ),
      },
      ...getScenarioColumns(
        location,
        mapLocation,
        projectionMode,
        projectionResult,
        getPane,
        i18n.language,
        t,
      ),
    ],
    [
      i18n.language,
      location,
      mapLocation,
      projectionMode,
      projectionResult,
      sameAltitudinalZone,
      t,
    ],
  );

  const finalPanes = panes.filter((p) => p);
  const foundProjection = sameAltitudinalZone || finalPanes.length > 2;
  const checkField =
    foundProjection === false &&
    checkFields.find(
      (field) =>
        Array.isArray(options[field]) &&
        options[field].filter((o) => o !== 'unknown').length > 0,
    );

  const exportDocx = useCallback(
    () =>
      exportRecommendation(
        location,
        projectionResult,
        projectionMode,
        future,
        latinActive,
        activeProfile,
        i18n,
        t,
      ),
    [
      location,
      projectionResult,
      projectionMode,
      future,
      latinActive,
      activeProfile,
      i18n,
      t,
    ],
  );

  return location.altitudinalZone && location.forestType ? (
    <div className={styles.container}>
      {foundProjection ? (
        <>
          <Tab
            className={styles.tab}
            menu={{
              className: styles.tabMenu,
              inverted: true,
              secondary: true,
              widths: finalPanes.length,
            }}
            panes={finalPanes}
          />
          <div className={styles.exportButtonWrapper}>
            <ExportButton onClick={exportDocx} />
          </div>
        </>
      ) : (
        <>
          <Header className={styles.notFound} inverted>
            {t(
              checkField
                ? `recommendation.checkField`
                : 'recommendation.noProjectionFound',
              { field: t(`${checkField}.label`) },
            )}
          </Header>
          {mapLocation.forestType && (
            <Header className={styles.checkMapLocation} inverted>
              <Trans i18nKey="recommendation.checkMapLocation" />
            </Header>
          )}
        </>
      )}
    </div>
  ) : null;
}

export default ProjectionResult;
