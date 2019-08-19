import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import { setRecommendationMode } from '../store/actions';
import Recommendation from './Recommendation';
import styles from './ProjectionResult.module.css';

const requiredFieldsForResult = [
  'forestEcoregion',
  'forestType',
  'altitudinalZone',
];

function ProjectionResult() {
  const dispatch = useDispatch();
  const {
    location,
    projectionMode,
    previousRecommendationMode,
    lastRecommendationMode,
  } = useSelector(state => ({
    location: state.location,
    projectionMode: state.projectionMode,
    previousRecommendationMode: state.recommendationMode,
    lastRecommendationMode: state.lastRecommendationMode,
  }));
  const { t } = useTranslation();

  const panes = [
    {
      menuItem: t('recommendationMode.today'),
      recommendationMode: 'today',
      render: () => <Recommendation futureDisabled />,
    },
    {
      menuItem: projectionMode === 'm' && t('recommendationMode.moderate'),
      recommendationMode: 'moderate',
      render: () => <Recommendation />,
    },
    {
      menuItem: projectionMode === 'm' && t('recommendationMode.extreme'),
      recommendationMode: 'extreme',
      render: () => <Recommendation />,
    },
  ];

  const missingFields = requiredFieldsForResult.filter(
    field => location[field] === undefined,
  );

  if (projectionMode === 'f') {
    panes.push({
      menuItem: t('recommendationMode.manual'),
      recommendationMode: /(extreme|moderate)/.test(lastRecommendationMode)
        ? lastRecommendationMode
        : 'extreme',
      render: () => <Recommendation />,
    });
  }

  let idx = panes.findIndex(
    p => p.menuItem && p.recommendationMode === previousRecommendationMode,
  );
  if (idx === -1) {
    idx = 2;
  }

  return missingFields.length === 0 ? (
    <div className={styles.container}>
      <Tab
        className={styles.tab}
        menu={{
          borderless: true,
          inverted: true,
          pointing: true,
          secondary: true,
          widths: '3',
        }}
        activeIndex={idx}
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
