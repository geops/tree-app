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
  const { location, projectionMode, projections } = useSelector(state => ({
    projectionMode: state.projectionMode,
    location: state.location,
    projections: [...state.projectionResult.projections],
  }));
  const { i18n, t } = useTranslation();

  const { altitudinalZone, forestType, targetAltitudinalZone } = location;
  if (
    altitudinalZone &&
    (altitudinalZone === targetAltitudinalZone ||
      projections.findIndex(p => p.altitudinalZone === altitudinalZone) === -1)
  ) {
    projections.unshift({ altitudinalZone, forestType });
  }

  const panes = [];
  if (altitudinalZone && altitudinalZone === targetAltitudinalZone) {
    panes.push({
      menuItem: t('recommendation.header'),
      render: () => <Recommendation />,
    });
  }

  projections.forEach(p => {
    const icons = [];
    const scenarios = [];
    if (projectionMode === 'f') {
      if (location.altitudinalZone === p.altitudinalZone) {
        icons.push(<EarthTodayIcon key="today" className={styles.iconToday} />);
        scenarios.push(t('projectionScenario.today'));
      } else {
        scenarios.push(t('projectionScenario.manual'));
      }
    } else {
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
              <div>
                {p.forestType}{' '}
                <span className={styles.altitudinalZone}>
                  {info('altitudinalZone', p.altitudinalZone)[i18n.language]}
                </span>
              </div>
              <div className={styles.scenario}>{scenarios.join(', ')}</div>
            </div>
          </Menu.Item>
        ),
        render: () => <ProjectionTab forestType={p.forestType} />,
      });
    }
  });

  return forestType && (location.coordinate || targetAltitudinalZone) ? (
    <div className={styles.container}>
      {panes.length > 0 ? (
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
