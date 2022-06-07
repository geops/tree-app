import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './ForestTypeDescription.module.css';
import NoData from './NoData';
import { getImageUrl } from '../../../utils/reliefMappings';

function Relief({ code, trimCode }) {
  const activeProfile = useSelector((state) => state.activeProfile);
  const imageUrl = useMemo(
    () => getImageUrl(code, activeProfile, trimCode),
    [code, activeProfile, trimCode],
  );
  return imageUrl ? (
    <img src={imageUrl} alt={`${code}-relief`} className={styles.relief} />
  ) : (
    <NoData />
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
