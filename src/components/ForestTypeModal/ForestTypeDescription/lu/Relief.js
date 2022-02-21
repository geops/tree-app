import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NoData from '../NoData';
import styles from '../ForestTypeDescription.module.css';
import { getImageUrl } from '../../../../utils/reliefMappings';

function Relief({ code }) {
  const activeProfile = useSelector((state) => state.activeProfile);
  const imageUrl = useMemo(
    () => getImageUrl(code, activeProfile),
    [code, activeProfile],
  );
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
