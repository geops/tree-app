import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import NoData from '../NoData';
import styles from '../ForestTypeDescription.module.css';
import { getFirstLetterIndex } from '../../../utils/sortForestTypes';
import reliefMappings from '../../../utils/reliefMappings';

const getImageUrl = (code) => {
  const imageName = reliefMappings.lu.find((string) => {
    const forestTypeCodeNumber = code.slice(
      0,
      getFirstLetterIndex(code) || code.length,
    );
    const forestTypes = string.split(',');
    return forestTypes.includes(forestTypeCodeNumber);
  });
  return imageName && `/images/lu/relief/${imageName}.png`;
};

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
