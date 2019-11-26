import { recommend } from '@geops/tree-lib';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { Checkbox, Grid, Tab } from 'semantic-ui-react';

import HelpModal from './HelpModal';
import TreeTypeList from './TreeTypeList';
import { ReactComponent as AttentionIcon } from '../icons/recommendationAttention.svg';
import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';
import styles from './Recommendation.module.css';

function Recommendation() {
  const { t } = useTranslation();
  const [future, setFuture] = useState(false);
  const { forestType, projections } = useSelector(state => ({
    forestType: state.location.forestType,
    projections: state.projectionResult.projections,
  }));

  const recommendations = useMemo(() => {
    let result;
    try {
      if (projections && projections.length === 0) {
        result = recommend(forestType, [{ forestType }], future);
      } else {
        result = recommend(forestType, projections, future);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Recommendation error: ', error);
    }
    return result;
  }, [forestType, projections, future]);

  return (
    <Tab.Pane>
      {recommendations && (
        <Grid columns={3} padded verticalAlign="middle">
          <Grid.Row centered>
            <Grid.Column textAlign="center" width={4} tablet={2} mobile={2}>
              <PositiveIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <HelpModal header={t('help.recommendationPositiveHeader')}>
                <Trans i18nKey="help.recommendationPositive">help text</Trans>
              </HelpModal>
            </Grid.Column>
            <Grid.Column width={11}>
              <div className={styles.large}>
                <TreeTypeList
                  className={styles.bold}
                  codes={recommendations[0]}
                />{' '}
                <TreeTypeList codes={recommendations[1]} />
              </div>
              <div className={styles.yellow}>
                <TreeTypeList
                  className={styles.bold}
                  codes={recommendations[2]}
                />{' '}
                <TreeTypeList codes={recommendations[3]} />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign="center" width={4} tablet={2} mobile={2}>
              <NeutralIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <HelpModal header={t('help.recommendationNeutralHeader')}>
                <Trans i18nKey="help.recommendationNeutral">help text</Trans>
              </HelpModal>
            </Grid.Column>
            <Grid.Column width={11}>
              <div className={styles.centered}>
                <TreeTypeList
                  className={styles.bold}
                  codes={recommendations[4]}
                />{' '}
                <TreeTypeList codes={recommendations[5]} />
              </div>
              <div className={`${styles.small} ${styles.yellow}`}>
                <TreeTypeList
                  className={styles.bold}
                  codes={recommendations[6]}
                />{' '}
                <TreeTypeList codes={recommendations[7]} />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign="center" width={4} tablet={2} mobile={2}>
              <NegativeIcon fill="white" className={styles.icon} />
            </Grid.Column>
            <Grid.Column width={1}>
              <HelpModal header={t('help.recommendationNegativeHeader')}>
                <Trans i18nKey="help.recommendationNegative">help text</Trans>
              </HelpModal>
            </Grid.Column>
            <Grid.Column width={11}>
              <div className={styles.small}>
                <TreeTypeList
                  className={styles.bold}
                  codes={recommendations[8]}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
          {recommendations[9].length > 0 && (
            <Grid.Row>
              <Grid.Column textAlign="center" width={4}>
                <AttentionIcon fill="white" className={styles.icon} />
              </Grid.Column>
              <Grid.Column width={1}>
                <HelpModal header={t('help.recommendationAttentionHeader')}>
                  <Trans i18nKey="help.recommendationAttention">
                    help text{' '}
                    <a
                      href="https://www.bafu.admin.ch/bafu/de/home/themen/wald/publikationen-studien/publikationen/vollzugshilfe-waldschutz.html"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      link
                    </a>
                  </Trans>
                </HelpModal>
              </Grid.Column>
              <Grid.Column width={11}>
                <TreeTypeList
                  className={styles.bold}
                  codes={recommendations[9]}
                />
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
