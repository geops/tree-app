import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Header, Menu, Tab } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import { hochmontanAltitudinalZones } from '../store/enhancers/projection';
import ProjectionTab from './ProjectionTab';
import Recommendation from './Recommendation';
import styles from './ProjectionResult.module.css';

import { ReactComponent as EarthExtremeIcon } from '../icons/earthExtreme.svg';
import { ReactComponent as EarthModerateIcon } from '../icons/earthModerate.svg';
import { ReactComponent as EarthTodayIcon } from '../icons/earthToday.svg';

function getAZ(altitudinalZone) {
  if (hochmontanAltitudinalZones.includes(altitudinalZone)) {
    return '80';
  }
  return altitudinalZone;
}

function getPane(scenario, projection, language, t) {
  const icons = [];
  const scenarios = [];
  const { forestType, transitionForestType } = projection;
  const altitudinalZone = getAZ(projection.altitudinalZone);
  if (scenario.toLowerCase().includes('today')) {
    icons.push(<EarthTodayIcon key="today" className={styles.iconToday} />);
    scenarios.push(t('projectionScenario.today'));
  }
  if (scenario.toLowerCase().includes('form')) {
    scenarios.push(t('projectionScenario.manual'));
  }
  if (scenario.toLowerCase().includes('moderateextreme')) {
    icons.push(<EarthModerateIcon key="mod" className={styles.icon} />);
    icons.push(<EarthExtremeIcon key="extreme" className={styles.icon} />);
    scenarios.push(t('projectionScenario.moderateExtreme'));
  } else if (scenario.toLowerCase().includes('moderate')) {
    icons.push(<EarthModerateIcon key="mod" className={styles.icon} />);
    scenarios.push(t('projectionScenario.moderate'));
  } else if (scenario.toLowerCase().includes('extreme')) {
    icons.push(<EarthExtremeIcon key="extreme" className={styles.icon} />);
    scenarios.push(t('projectionScenario.extreme'));
  }

  return (
    forestType && {
      menuItem: (
        <Menu.Item className={styles.arrow}>
          <div className={styles.icons}>{icons}</div>
          <div data-cypress="projectionResultMenuItem">
            {transitionForestType
              ? ` ${forestType} (${transitionForestType}) `
              : ` ${forestType} `}
            <span className={styles.altitudinalZone}>
              {info('altitudinalZone', altitudinalZone)[language]}
            </span>
          </div>
          <div className={styles.scenario}>{scenarios.join(', ')}</div>
        </Menu.Item>
      ),
      render: () => <ProjectionTab location={projection} />,
    }
  );
}
const checkFields = ['slope', 'additional', 'relief'];

function ProjectionResult() {
  const { location, mapLocationForestType, projectionMode, projectionResult } =
    useSelector((state) => ({
      location: state.location,
      mapLocationForestType: state.mapLocation.forestType,
      projectionMode: state.projectionMode,
      projectionResult: state.projectionResult,
    }));
  const { i18n, t } = useTranslation();
  const AZToday = getAZ(location.altitudinalZone);
  const TAZModerate = getAZ(location.targetAltitudinalZoneModerate);
  const TAZExtreme = getAZ(location.targetAltitudinalZoneExtreme);
  const sameAltitudinalZone = AZToday === TAZModerate && AZToday === TAZExtreme;
  const { options } =
    projectionMode === 'm' ? projectionResult.extreme : projectionResult.form;

  const panes = [];
  panes.push({
    menuItem: t('recommendation.header'),
    render: () => <Recommendation sameAltitudinalZone={sameAltitudinalZone} />,
  });

  if (projectionMode === 'f' && projectionResult.form.projections) {
    const form = projectionResult.form.projections.slice(-1)[0] || {};
    panes.push(getPane('today', location, i18n.language, t));
    panes.push(getPane('form', form, i18n.language, t));
  } else {
    const moderateLoc = projectionResult.moderate.projections
      ? projectionResult.moderate.projections.slice(-1)[0] || {}
      : {};
    const extremeLoc = projectionResult.extreme.projections
      ? projectionResult.extreme.projections.slice(-1)[0] || {}
      : {};
    if (TAZModerate === TAZExtreme) {
      if (AZToday === TAZModerate) {
        panes.push(getPane('todayModerateExtreme', location, i18n.language, t));
      } else {
        panes.push(getPane('today', location, i18n.language, t));
        panes.push(getPane('moderateExtreme', moderateLoc, i18n.language, t));
      }
    } else if (AZToday === TAZModerate) {
      panes.push(getPane('todayModerate', location, i18n.language, t));
      panes.push(getPane('extreme', extremeLoc, i18n.language, t));
    } else if (AZToday === TAZExtreme) {
      panes.push(getPane('todayExtreme', location, i18n.language, t));
      panes.push(getPane('moderate', moderateLoc, i18n.language, t));
    } else {
      panes.push(getPane('today', location, i18n.language, t));
      panes.push(getPane('moderate', moderateLoc, i18n.language, t));
      panes.push(getPane('extreme', extremeLoc, i18n.language, t));
    }
  }

  const finalPanes = panes.filter((p) => p);
  const foundProjection = sameAltitudinalZone || finalPanes.length > 2;
  const checkField =
    foundProjection === false &&
    checkFields.find(
      (field) =>
        Array.isArray(options[field]) &&
        options[field].filter((o) => o !== 'unknown').length > 0,
    );

  return location.altitudinalZone && location.forestType ? (
    <div className={styles.container}>
      {foundProjection ? (
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
          {mapLocationForestType && (
            <Header className={styles.checkMapLocation} inverted>
              {t('recommendation.checkMapLocation')}
            </Header>
          )}
        </>
      )}
    </div>
  ) : null;
}

export default ProjectionResult;
