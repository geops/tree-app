import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { Checkbox, Grid, Tab, Message } from 'semantic-ui-react';

import HelpModal from './HelpModal';
import LatinSwitcher from './LatinSwitcher';
import TreeTypeList from './TreeTypeList';
import { ReactComponent as AttentionIcon } from '../icons/recommendationAttention.svg';
import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';
import { getRecommendation } from '../utils/recommendationUtils';
import { setFuture } from '../store/actions';
import styles from './Recommendation.module.css';

function Recommendation({ sameAltitudinalZone }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { location, projectionMode, projectionResult, future } = useSelector(
    (state) => ({
      location: state.location,
      projectionMode: state.projectionMode,
      projectionResult: state.projectionResult,
      future: state.future,
    }),
  );

  const r = useMemo(
    () =>
      getRecommendation(
        location,
        projectionResult,
        projectionMode,
        future,
        sameAltitudinalZone,
      ),
    [location, projectionMode, projectionResult, future, sameAltitudinalZone],
  );

  return (
    <Tab.Pane data-cypress="recommendationPane">
      {r && (
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
                <TreeTypeList className={styles.bold} codes={r[0]} />{' '}
                <TreeTypeList codes={r[1]} />
              </div>
              <div className={`${styles.medium} ${styles.yellow}`}>
                <TreeTypeList className={styles.bold} codes={r[2]} />{' '}
                <TreeTypeList codes={r[3]} />
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
              <div className={styles.medium}>
                <TreeTypeList className={styles.bold} codes={r[4]} />{' '}
                <TreeTypeList codes={r[5]} />
              </div>
              <div className={styles.yellow}>
                <TreeTypeList className={styles.bold} codes={r[6]} />{' '}
                <TreeTypeList codes={r[7]} />
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
              <TreeTypeList className={styles.bold} codes={r[8]} />
            </Grid.Column>
          </Grid.Row>
          {(r[9].length > 0 || r[10].length > 0) && (
            <Grid.Row centered>
              <Grid.Column textAlign="center" width={4} tablet={2} mobile={2}>
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
                <div className={styles.medium}>
                  <TreeTypeList className={styles.bold} codes={r[9]} />
                  <div className={styles.yellow}>
                    <TreeTypeList className={styles.bold} codes={r[10]} />
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column textAlign="center" width={4} />
            <Grid.Column width={12}>
              <Checkbox
                className={styles.checkbox}
                checked={future}
                label={t('recommendation.future')}
                onClick={() => dispatch(setFuture(!future))}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={4} />
            <Grid.Column width={12}>
              <LatinSwitcher className={styles.checkbox} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
      {sameAltitudinalZone && (
        <Message className={styles.sameAltitudinalZone}>
          {t('recommendation.sameAltitudinalZone')}
        </Message>
      )}
    </Tab.Pane>
  );
}

Recommendation.propTypes = {
  sameAltitudinalZone: PropTypes.bool.isRequired,
};

export default Recommendation;
