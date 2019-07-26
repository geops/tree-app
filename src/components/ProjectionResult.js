import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Header, Tab } from 'semantic-ui-react';

import { setRecommendationMode } from '../store/actions';
import Recommendation from './Recommendation';

function ProjectionResult() {
  const dispatch = useDispatch();
  const { projectionLocation, location } = useSelector(state => ({
    projectionLocation: state.projectionLocation,
    location: state.location,
  }));
  const { t } = useTranslation();

  const panes = [
    {
      menuItem: t('recommendationMode.today'),
      recommendationMode: 'today',
      render: () => (
        <Recommendation
          forestTypeToday={location.forestType}
          forest={location.forestType}
          todayFutureToggler={false}
        />
      ),
    },
    {
      menuItem: t('recommendationMode.moderate'),
      recommendationMode: 'moderate',
      render: () => (
        <Recommendation
          forestTypeToday={location.forestType}
          forestTypeFuture={projectionLocation.forestType}
          forest={projectionLocation.forestType}
          todayFutureToggler
        />
      ),
    },
    {
      menuItem: t('recommendationMode.extreme'),
      recommendationMode: 'extreme',
      render: () => (
        <Recommendation
          forestTypeToday={location.forestType}
          forestTypeFuture={projectionLocation.forestType}
          forest={projectionLocation.forestType}
          todayFutureToggler
        />
      ),
    },
  ];

  return (
    <>
      {projectionLocation.forestType && (
        <>
          <Divider horizontal>
            <Header color="olive">{t('app.result')}</Header>
          </Divider>
          <Tab
            panes={panes}
            defaultActiveIndex={1}
            onTabChange={(e, data) => {
              const { recommendationMode } = data.panes[data.activeIndex];
              dispatch(setRecommendationMode(recommendationMode));
            }}
          />
        </>
      )}
    </>
  );
}

export default ProjectionResult;
