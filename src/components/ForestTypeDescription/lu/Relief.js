import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { utils } from '@geops/tree-lib';
import NoData from '../NoData';
import styles from '../ForestTypeDescription.module.css';

const { getReliefImageUrl } = utils();
function Relief({ code }) {
  const activeProfile = useSelector((state) => state.activeProfile);
  const imageUrl = useMemo(
    () => getReliefImageUrl(code, activeProfile),
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
