import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import { setRecommendationMode } from '../store/actions';
import Recommendation from './Recommendation';
import styles from './ProjectionResult.module.css';

const requiredFieldsForProjection = [
  'forestEcoregion',
  'forestType',
  'altitudinalZone',
];

function ProjectionResult() {
  const dispatch = useDispatch();
  const { location } = useSelector(state => ({
    projectionOptions: state.projectionOptions,
    mapLocation: state.mapLocation,
    location: state.location,
    projectionMode: state.projectionMode,
  }));
  const { t } = useTranslation();

  const panes = [
    {
      menuItem: t('recommendationMode.today'),
      recommendationMode: 'today',
      render: () => <Recommendation futureDisabled />,
    },
    {
      menuItem: t('recommendationMode.moderate'),
      recommendationMode: 'moderate',
      render: () => <Recommendation />,
    },
    {
      menuItem: t('recommendationMode.extreme'),
      recommendationMode: 'extreme',
      render: () => <Recommendation />,
    },
  ];

  const missingFields = requiredFieldsForProjection.filter(
    field => location[field] === undefined,
  );

  return missingFields.length === 0 ? (
    <div className={styles.container}>
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
