import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { ReactComponent as EarthExtremeIcon } from '../icons/earthExtreme.svg';
import { ReactComponent as EarthModerateIcon } from '../icons/earthModerate.svg';
import { ReactComponent as EarthTodayIcon } from '../icons/earthToday.svg';
import { ReactComponent as AttentionIcon } from '../icons/recommendationAttention.svg';
import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';

import styles from './InfoRecommendation.module.css';

function InfoRecommendation() {
  const { t } = useTranslation();
  return (
    <Trans i18nKey="info.recommendation">
      <p>general description</p>
      <p>
        <strong>recommendation</strong> description
      </p>
      <ul className={styles.iconList}>
        <li>
          <PositiveIcon />{' '}
          {{ positiveTitle: t('help.recommendationPositiveHeader') }}:{' '}
          <Trans i18nKey="help.recommendationPositive">help text</Trans>
        </li>
        <li>
          <NeutralIcon />{' '}
          {{ neutralTitle: t('help.recommendationNeutralHeader') }}:{' '}
          <Trans i18nKey="help.recommendationNeutral">help text</Trans>
        </li>
        <li>
          <NegativeIcon />{' '}
          {{ negativeTitle: t('help.recommendationNegativeHeader') }}:{' '}
          <Trans i18nKey="help.recommendationNegative">help text</Trans>
        </li>
        <li>
          <AttentionIcon />{' '}
          {{ attentionTitle: t('help.recommendationAttentionHeader') }}:{' '}
          <Trans i18nKey="help.recommendationAttention">help text</Trans>
        </li>
      </ul>
      <p>description</p>
      <h3>scenarios</h3>
      <p>description</p>
      <ul className={styles.iconList}>
        <li>
          <EarthTodayIcon className={styles.todayIcon} /> today
        </li>
        <li>
          <EarthModerateIcon /> moderate
        </li>
        <li>
          <EarthExtremeIcon /> extreme
        </li>
      </ul>
      <p>tabs</p>
      <ul>
        <li>three</li>
        <li>one</li>
        <li>two</li>
      </ul>
      <p>description</p>
    </Trans>
  );
}

export default InfoRecommendation;
