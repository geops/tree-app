import { recommend, translate } from '@geops/tree-lib';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Checkbox, Grid, Tab } from 'semantic-ui-react';

import { ReactComponent as AttentionIcon } from '../icons/recommendationAttention.svg';
import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import styles from './Recommendation.module.css';

function Recommendation() {
  const { t, i18n } = useTranslation();
  const [future, setFuture] = useState(false);
  const { pLocation, location } = useSelector(state => ({
    pLocation: state.projectionLocation,
    location: state.location,
  }));

  const recommendations = useMemo(() => {
    let result;
    try {
      result = recommend(location.forestType, pLocation.forestType, future);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Recommendation error: ', error);
    }
    return result;
  }, [location.forestType, pLocation.forestType, future]);

  return (
    <Tab.Pane>
      {recommendations && (
        <Grid columns={3} className={styles.grid} padded verticalAlign="middle">
          <Grid.Row>
            <Grid.Column textAlign="center" width={4}>
              <PositiveIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <InfoIcon fill="white" className={styles.infoIcon} />
            </Grid.Column>
            <Grid.Column width={11}>
              {recommendations.positive
                .map(tt => translate('treeType', tt, i18n.language))
                .join(' ')}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={4}>
              <NeutralIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <InfoIcon fill="white" className={styles.infoIcon} />
            </Grid.Column>
            <Grid.Column width={11}>
              {recommendations.neutral
                .map(tt => translate('treeType', tt, i18n.language))
                .join(' ')}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={4}>
              <NegativeIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <InfoIcon fill="white" className={styles.infoIcon} />
            </Grid.Column>
            <Grid.Column width={11}>
              {recommendations.negative
                .map(tt => translate('treeType', tt, i18n.language))
                .join(' ')}
            </Grid.Column>
          </Grid.Row>
          {recommendations.attention.length > 0 && (
            <Grid.Row>
              <Grid.Column textAlign="center" width={4}>
                <AttentionIcon fill="white" className={styles.icon} />
              </Grid.Column>
              <Grid.Column width={1}>
                <InfoIcon fill="white" className={styles.infoIcon} />
              </Grid.Column>
              <Grid.Column width={11}>
                {recommendations.attention
                  .map(tt => translate('treeType', tt, i18n.language))
                  .join(' ')}
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column textAlign="center" width={4}></Grid.Column>
            <Grid.Column width={12}>
              <Checkbox
                className={styles.checkbox}
                checked={future}
                label={t('recommendation.future')}
                onClick={() => setFuture(!future)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Tab.Pane>
  );
}

export default Recommendation;
