import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Header, Tab } from 'semantic-ui-react';

import { setRecommendationMode } from '../store/actions';
import Recommendation from './Recommendation';
import styles from './ProjectionResult.module.css';

function ProjectionResult() {
  const dispatch = useDispatch();
  const projectionLocation = useSelector(state => state.projectionLocation);
  const { t } = useTranslation();

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

  return (
    <>
      {projectionLocation.forestType && (
        <Container className={styles.container}>
          <Header inverted size="large" textAlign="center">
            {t('projectionResult.header')}
          </Header>
          <Tab
            className={styles.tab}
            defaultActiveIndex={1}
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
        </Container>
      )}
    </>
  );
}

export default ProjectionResult;
