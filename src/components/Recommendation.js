import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Header, List, Tab, Button } from 'semantic-ui-react';

import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';
import styles from './Recommendation.module.css';

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

  const recommendations = useMemo(() => {
    let result;
    try {
      result = recommend(location.forestType, forestType, future);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Recommendation error: ', error);
    }
    return result;
  }, [location.forestType, forestType, future]);

  return (
    recommendations && (
      <Tab.Pane>
        <Header inverted>
          {`${forestType} - ${translate(
            'forestType',
            forestType,
            i18n.language,
          )}`}
        </Header>

        <Button.Group>
          <Button
            disabled={futureDisabled}
            active={!future}
            onClick={() => setFuture(false)}
            className={styles.button}
          >
            <h5>{t('recommendation.todayHeader')}</h5>
            <p>{t('todayFutureToggler.todayMessage')}</p>
          </Button>
          <Button
            disabled={futureDisabled}
            active={future}
            onClick={() => setFuture(true)}
            className={styles.button}
          >
            <h5>{t('recommendation.futureHeader')}</h5>
            <p>{t('todayFutureToggler.futureMessage')}</p>
          </Button>
        </Button.Group>

        <Header inverted>{t('recommendation.header')}</Header>
        <Grid stackable columns={3}>
          <Grid.Column>
            <Header inverted>
              <PositiveIcon fill="white" className={styles.icon} />
              {t('recommendation.positive')}
            </Header>
            <List>
              {recommendations.positive.map(r => (
                <List.Item key={r}>
                  {translate('treeType', r, i18n.language)}
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header inverted>
              <NeutralIcon fill="white" className={styles.icon} />
              {t('recommendation.neutral')}
            </Header>
            <List>
              {recommendations.neutral.map(r => (
                <List.Item key={r}>
                  {translate('treeType', r, i18n.language)}
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header inverted>
              <NegativeIcon fill="white" className={styles.icon} />
              {t('recommendation.negative')}
            </Header>
            <List>
              {recommendations.negative.map(r => (
                <List.Item key={r}>
                  {translate('treeType', r, i18n.language)}
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          {recommendations.attention && recommendations.attention.length > 0 && (
            <Grid.Column>
              <Header inverted>{t('recommendation.attention')}</Header>
              <List>
                {recommendations.attention.map(r => (
                  <List.Item key={r}>
                    {translate('treeType', r, i18n.language)}
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
          )}
        </Grid>
      </Tab.Pane>
    )
  );
}

Recommendation.propTypes = {
  todayFutureToggler: PropTypes.bool,
};

Recommendation.defaultProps = {
  todayFutureToggler: false,
};

export default Recommendation;
