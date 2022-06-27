/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { utils } from '@geops/tree-lib';
import styles from './ForestTypeDescription.module.css';
import diagramStyles from './Diagram.module.css';

const { getReliefImageUrl } = utils();
function Relief({ code, trimCode }) {
  const { t } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const imageUrl = useMemo(
    () => getReliefImageUrl(code, activeProfile, trimCode),
    [code, activeProfile, trimCode],
  );
  return imageUrl ? (
    <img src={imageUrl} alt={`${code}-relief`} className={styles.relief} />
  ) : (
    <span className={diagramStyles.labelMiddleBold}>
      {t('forestTypeDiagram.noData')}
    </span>
  );
}

Relief.propTypes = {
  code: PropTypes.string.isRequired,
  trimCode: PropTypes.bool,
};

Relief.defaultProps = {
  trimCode: false,
};

export default Relief;
