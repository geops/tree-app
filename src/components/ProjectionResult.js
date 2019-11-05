import { info } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Menu, Tab } from 'semantic-ui-react';

import ProjectionTab from './ProjectionTab';
import Recommendation from './Recommendation';
import styles from './ProjectionResult.module.css';

function ProjectionResult() {
  const { projectionResult } = useSelector(state => ({
    projectionResult: state.projectionResult,
  }));
  const { i18n, t } = useTranslation();

  const panes = [
    {
      menuItem: t('recommendation.header'),
      render: () => <Recommendation />,
    },
  ];
  projectionResult.projections.forEach(p =>
    panes.push({
      menuItem: (
        <Menu.Item key={p.forestType} className={styles.arrow}>
          {p.forestType}{' '}
          {info('altitudinalZone', p.altitudinalZone)[i18n.language]}
        </Menu.Item>
      ),
      render: () => <ProjectionTab forestType={p.forestType} />,
    }),
  );

  return (
    projectionResult.projections.length > 0 && (
      <div className={styles.container}>
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
      </div>
    )
  );
}

export default ProjectionResult;
