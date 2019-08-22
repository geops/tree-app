import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Header, Tab, Button } from 'semantic-ui-react';

import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';
import styles from './Recommendation.module.css';
import RecommendationTreeList from './RecommendationTreeList';

function Recommendation({ futureDisabled }) {
  const { t, i18n } = useTranslation();
  const [future, setFuture] = useState(false);
  const { projectionLocation, location, recommendationMode } = useSelector(
    state => ({
      projectionLocation: state.projectionLocation,
      location: state.location,
      recommendationMode: state.recommendationMode,
    }),
  );

  const forestType =
    recommendationMode === 'today'
      ? location.forestType
      : projectionLocation.forestType;
  const forestTypeLabel =
    projectionLocation.forestType &&
    translate('forestType', forestType, i18n.language);

  const recommendFuture = futureDisabled ? false : future;

  const recommendations = useMemo(() => {
    let result;
    try {
      result = recommend(location.forestType, forestType, recommendFuture);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Recommendation error: ', error);
    }
    return result;
  }, [location.forestType, forestType, recommendFuture]);

  return (
    <Tab.Pane>
      <Header inverted>
        {forestTypeLabel
          ? `${forestType} - ${forestTypeLabel}`
          : forestType || t('recommendation.noProjectionFound')}
      </Header>
      {(projectionLocation.forestType || recommendationMode === 'today') && (
        <>
          <Button.Group>
            <Button
              disabled={futureDisabled}
              active={!recommendFuture}
              onClick={() => setFuture(false)}
              className={styles.button}
            >
              <h5>{t('recommendation.todayHeader')}</h5>
              <p>{t('recommendation.todayMessage')}</p>
            </Button>
            <Button
              disabled={futureDisabled}
              active={recommendFuture}
              onClick={() => setFuture(true)}
              className={styles.button}
            >
              <h5>{t('recommendation.futureHeader')}</h5>
              <p>{t('recommendation.futureMessage')}</p>
            </Button>
          </Button.Group>

          <Header inverted>{t('recommendation.header')}</Header>
          <Grid stackable columns={3} className={styles.grid}>
            <Grid.Column>
              <Header inverted>
                <PositiveIcon fill="white" className={styles.icon} />
                {t('recommendation.positive')}
              </Header>

              <RecommendationTreeList
                className={styles.list}
                recommendationTreeList={recommendations.positive}
              />
            </Grid.Column>
            <Grid.Column>
              <Header inverted>
                <NeutralIcon fill="white" className={styles.icon} />
                {t('recommendation.neutral')}
              </Header>
              <RecommendationTreeList
                className={styles.list}
                recommendationTreeList={recommendations.neutral}
              />
            </Grid.Column>
            <Grid.Column>
              <Header inverted>
                <NegativeIcon fill="white" className={styles.icon} />
                {t('recommendation.negative')}
              </Header>
              <RecommendationTreeList
                className={styles.list}
                recommendationTreeList={recommendations.negative}
              />
            </Grid.Column>
            {recommendations.attention && recommendations.attention.length > 0 && (
              <Grid.Column>
                <Header inverted>{t('recommendation.attention')}</Header>
                <RecommendationTreeList
                  className={styles.list}
                  recommendationTreeList={recommendations.attention}
                />
              </Grid.Column>
            )}
          </Grid>
        </>
      )}
    </Tab.Pane>
  );
}

Recommendation.propTypes = {
  futureDisabled: PropTypes.bool,
};

Recommendation.defaultProps = {
  futureDisabled: false,
};

export default Recommendation;
