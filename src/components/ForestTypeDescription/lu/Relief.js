import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import NoData from '../NoData';
import styles from '../ForestTypeDescription.module.css';
import { getImageUrl } from './utils';

function Relief({ code }) {
  const imageUrl = useMemo(() => getImageUrl(code), [code]);
  return imageUrl ? (
    <img src={imageUrl} alt={`${code}-relief`} className={styles.relief} />
  ) : (
    <NoData />
  );
}

Relief.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Relief;
