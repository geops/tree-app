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
    {
      menuItem: projectionMode === 'f' && t('recommendationMode.manual'),
      recommendationMode: /(extreme|moderate)/.test(lastRecommendationMode)
        ? lastRecommendationMode
        : 'extreme',
      render: () => <Recommendation />,
    },
  ];

  const missingFields = requiredFieldsForResult.filter(
    field => location[field] === undefined,
  );

  const idx = panes.findIndex(
    p => p.menuItem && p.recommendationMode === previousRecommendationMode,
  );

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
