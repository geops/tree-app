import { info } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Header, Menu, Tab } from 'semantic-ui-react';

import ProjectionTab from './ProjectionTab';
import Recommendation from './Recommendation';
import styles from './ProjectionResult.module.css';

import { ReactComponent as EarthExtremeIcon } from '../icons/earthExtreme.svg';
import { ReactComponent as EarthModerateIcon } from '../icons/earthModerate.svg';
import { ReactComponent as EarthTodayIcon } from '../icons/earthToday.svg';

function ProjectionResult() {
  const { location, projectionMode, projectionResult } = useSelector(state => ({
    location: state.location,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
  }));
  const { i18n, t } = useTranslation();
  const { forestType } = location;

  const panes = [];
  panes.push({
    menuItem: t('recommendation.header'),
    render: () => <Recommendation />,
  });

  projectionResult.forEach(r => {
    const p = r.projections[r.projections.length - 1];
    const icons = [];
    const scenarios = [];
    if (p && projectionMode === 'f') {
      if (location.altitudinalZone === p.altitudinalZone) {
        icons.push(<EarthTodayIcon key="today" className={styles.iconToday} />);
        scenarios.push(t('projectionScenario.today'));
      } else {
        scenarios.push(t('projectionScenario.manual'));
      }
    } else if (p) {
      if (location.altitudinalZone === p.altitudinalZone) {
        icons.push(<EarthTodayIcon key="today" className={styles.iconToday} />);
        scenarios.push(t('projectionScenario.today'));
      }

      if (
        location.targetAltitudinalZoneModerate === p.altitudinalZone &&
        location.targetAltitudinalZoneExtreme === p.altitudinalZone
      ) {
        icons.push(<EarthModerateIcon key="mod" className={styles.icon} />);
        icons.push(<EarthExtremeIcon key="extreme" className={styles.icon} />);
        scenarios.push(t('projectionScenario.moderateExtreme'));
      } else if (location.targetAltitudinalZoneModerate === p.altitudinalZone) {
        icons.push(<EarthModerateIcon key="mod" className={styles.icon} />);
        scenarios.push(t('projectionScenario.moderate'));
      } else if (location.targetAltitudinalZoneExtreme === p.altitudinalZone) {
        icons.push(<EarthExtremeIcon key="extreme" className={styles.icon} />);
        scenarios.push(t('projectionScenario.extreme'));
      }
    }
    if (scenarios.length > 0) {
      panes.push({
        menuItem: (
          <Menu.Item key={p.altitudinalZone} className={styles.arrow}>
            {icons}
            <div>
              <div data-cypress="projectionResultMenuItem">
                {p.transitionForestType
                  ? ` ${p.forestType} (${p.transitionForestType}) `
                  : ` ${p.forestType} `}
                <span className={styles.altitudinalZone}>
                  {info('altitudinalZone', p.altitudinalZone)[i18n.language]}
                </span>
              </div>
              <div className={styles.scenario}>{scenarios.join(', ')}</div>
            </div>
          </Menu.Item>
        ),
        render: () => <ProjectionTab location={p} />,
      });
    }
  });

  return forestType ? (
    <div className={styles.container}>
      {panes.length > 1 ? (
        <Tab
          className={styles.tab}
          menu={{
            className: styles.tabMenu,
            inverted: true,
            secondary: true,
            size: 'large',
            widths: panes.length,
          }}
          panes={panes}
        />
      ) : (
        <Header className={styles.notFound} inverted>
          {t('recommendation.noProjectionFound')}
        </Header>
      )}
    </div>
  ) : null;
}

export default ProjectionResult;
