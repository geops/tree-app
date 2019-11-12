import { info, recommend } from '@geops/tree-lib';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { Checkbox, Grid, Tab } from 'semantic-ui-react';

import HelpModal from './HelpModal';
import { ReactComponent as AttentionIcon } from '../icons/recommendationAttention.svg';
import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';
import styles from './Recommendation.module.css';

function Recommendation() {
  const { t, i18n } = useTranslation();
  const [future, setFuture] = useState(false);
  const { forestTypeToday, projections } = useSelector(state => ({
    forestTypeToday: state.location.forestType,
    projections: state.projectionResult.projections,
  }));
  const list = recommendations =>
    recommendations
      .map(code => {
        const treeInfo = info('treeType', code);
        return treeInfo[i18n.language] + (treeInfo.endangered ? '*' : '');
      })
      .join(' ');

  const recommendations = useMemo(() => {
    let result;
    try {
      result = recommend(forestTypeToday, projections, future);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Recommendation error: ', error);
    }
    return result;
  }, [forestTypeToday, projections, future]);

  return (
    <Tab.Pane>
      {recommendations && (
        <Grid columns={3} padded verticalAlign="middle">
          <Grid.Row>
            <Grid.Column textAlign="center" width={4}>
              <PositiveIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <HelpModal header={t('help.recommendationPositiveHeader')}>
                <Trans i18nKey="help.recommendationPositive">
                  help <b>bold</b> text
                </Trans>
              </HelpModal>
            </Grid.Column>
            <Grid.Column width={11}>
              <div className={styles.large}>
                <span className={styles.bold}>{list(recommendations[0])}</span>{' '}
                {list(recommendations[1])}
              </div>
              <div className={styles.yellow}>
                <span className={styles.bold}>{list(recommendations[2])}</span>{' '}
                {list(recommendations[3])}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={4}>
              <NeutralIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <HelpModal header={t('help.recommendationNeutralHeader')}>
                <Trans i18nKey="help.recommendationNeutral">
                  help <b>bold</b> text
                </Trans>
              </HelpModal>
            </Grid.Column>
            <Grid.Column width={11}>
              <div>
                <span className={styles.bold}>{list(recommendations[4])}</span>{' '}
                {list(recommendations[5])}
              </div>
              <div className={`${styles.small} ${styles.yellow}`}>
                <span className={styles.bold}>{list(recommendations[6])}</span>{' '}
                {list(recommendations[7])}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={4}>
              <NegativeIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <HelpModal header={t('help.recommendationNegativeHeader')}>
                <Trans i18nKey="help.recommendationNegative">
                  help <b>bold</b> text
                </Trans>
              </HelpModal>
            </Grid.Column>
            <Grid.Column width={11}>
              <div className={styles.small}>
                <span className={styles.bold}>{list(recommendations[8])}</span>
              </div>
            </Grid.Column>
          </Grid.Row>
          {recommendations[9].length > 0 && (
            <Grid.Row>
              <Grid.Column textAlign="center" width={4}>
                <AttentionIcon fill="white" className={styles.icon} />
              </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={11}>
                <span className={styles.bold}>{list(recommendations[9])}</span>
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
