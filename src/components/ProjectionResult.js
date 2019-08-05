import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import useComponentSize from '@rehooks/component-size';

import { setRecommendationMode } from '../store/actions';
import Recommendation from './Recommendation';
import styles from './ProjectionResult.module.css';
import { ReactComponent as RecommendationPointer } from '../icons/recommendationPointer.svg';

function ProjectionResult() {
  const dispatch = useDispatch();
  const projectionLocation = useSelector(state => state.projectionLocation);
  const { t } = useTranslation();

  const ref = useRef(null);
  const { height } = useComponentSize(ref);
  const panes = [
    {
      menuItem: t('recommendationMode.today'),
      recommendationMode: 'today',
      render: () => <Recommendation />,
    },
    {
      menuItem: t('recommendationMode.moderate'),
      recommendationMode: 'moderate',
      render: () => <Recommendation todayFutureToggler />,
    },
    {
      menuItem: t('recommendationMode.extreme'),
      recommendationMode: 'extreme',
      render: () => <Recommendation todayFutureToggler />,
    },
  ];

  return projectionLocation.forestType && projectionLocation.altitudinalZone ? (
    <div
      ref={ref}
      className={styles.container}
      style={{ bottom: `${20 - height}px` }}
    >
      <RecommendationPointer className={styles.pointer} />
      <Tab
        className={styles.tab}
        defaultActiveIndex={2}
        menu={{
          borderless: true,
          inverted: true,
          pointing: true,
          secondary: true,
          widths: '3',
        }}
        onTabChange={(e, data) => {
          const { recommendationMode } = data.panes[data.activeIndex];
          dispatch(setRecommendationMode(recommendationMode));
        }}
        panes={panes}
      />
    </div>
  ) : null;
}

export default ProjectionResult;
