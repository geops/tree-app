import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import PositiveIcon from '../icons/RecommendationPositive';
import NegativeIcon from '../icons/RecommendationNegative';
import NeutralIcon from '../icons/RecommendationNeutral';
import AttentionIcon from '../icons/RecommendationAttention';
import { ReactComponent as EarthExtremeIcon } from '../icons/earthExtreme.svg';
import { ReactComponent as EarthModerateIcon } from '../icons/earthModerate.svg';
import { ReactComponent as EarthTodayIcon } from '../icons/earthToday.svg';

import styles from './InfoRecommendation.module.css';

function InfoRecommendation() {
  const { t } = useTranslation();
  return (
    <Trans i18nKey="info.recommendation">
      <p>general description</p>
      <p>
        <strong>recommendation</strong> description
      </p>
      <ul className={`${styles.iconList} ${styles.iconListBackground}`}>
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
