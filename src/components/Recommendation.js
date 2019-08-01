import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Header, List, Tab, Form, Divider } from 'semantic-ui-react';

import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';
import styles from './Recommendation.module.css';

function Recommendation({ todayFutureToggler }) {
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
        {todayFutureToggler && (
          <Form inverted>
            <Form.Field>
              <Form.Radio
                label={t('todayFutureToggler.today')}
                name="radioGroup"
                checked={future === false}
                onChange={() => setFuture(false)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Radio
                label={t('todayFutureToggler.future')}
                name="radioGroup"
                checked={future === true}
                onChange={() => setFuture(true)}
              />
            </Form.Field>
          </Form>
        )}
        <Divider hidden />
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
