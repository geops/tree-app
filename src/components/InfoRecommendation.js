import React from 'react';
import { Trans } from 'react-i18next';

import { ReactComponent as EarthExtremeIcon } from '../icons/earthExtreme.svg';
import { ReactComponent as EarthModerateIcon } from '../icons/earthModerate.svg';
import { ReactComponent as EarthTodayIcon } from '../icons/earthToday.svg';
import { ReactComponent as AttentionIcon } from '../icons/recommendationAttention.svg';
import { ReactComponent as NegativeIcon } from '../icons/recommendationNegative.svg';
import { ReactComponent as NeutralIcon } from '../icons/recommendationNeutral.svg';
import { ReactComponent as PositiveIcon } from '../icons/recommendationPositive.svg';

import styles from './InfoRecommendation.module.css';

function InfoRecommendation() {
  return (
    <Trans i18nKey="info.recommendation">
      <p>general description</p>
      <p>
        <strong>recommendation</strong> description
      </p>
      <ul className={styles.iconList}>
        <li>
          <PositiveIcon /> positive
        </li>
        <li>
          <NeutralIcon /> neutral
        </li>
        <li>
          <NegativeIcon /> negative
        </li>
        <li>
          <AttentionIcon /> attention{' '}
          <a href="https://www.bafu.admin.ch/bafu/de/home/themen/wald/publikationen-studien/publikationen/vollzugshilfe-waldschutz.html">
            link
          </a>
        </li>
      </ul>
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
