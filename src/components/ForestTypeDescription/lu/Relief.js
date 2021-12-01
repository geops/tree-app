import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import NoData from '../NoData';
import styles from '../ForestTypeDescription.module.css';
import { getFirstLetterIndex } from '../../../utils/sortForestTypes';

const reliefMapping = {
  '1,2': '/images/relief/1,2.png',
  '6,7': '/images/relief/6,7.png',
  8: '/images/relief/8.png',
  '9,10,11': '/images/relief/9,10,11.png',
  '12,13': '/images/relief/12,13.png',
  '14,15,16': '/images/relief/14,15,16.png',
  17: '/images/relief/17.png',
  '18,19,20,21': '/images/relief/18,19,20,21.png',
  '22,23,24': '/images/relief/22,23,24.png',
  '26,27': '/images/relief/26,27.png',
  '28,29,30,32': '/images/relief/28,29,30,32.png',
  '44,45': '/images/relief/44,45.png',
  46: '/images/relief/46.png',
  48: '/images/relief/48.png',
  '49,50': '/images/relief/49,50.png',
  '53,56,57,60': '/images/relief/53,56,57,60.png',
  '62,65': '/images/relief/62,65.png',
  '67,69,70,71': '/images/relief/67,69,70,71.png',
  AV: '/images/relief/AV.png',
};

const getImageUrl = (code) => {
  let url = null;
  Object.keys(reliefMapping).forEach((key) => {
    if (!url) {
      const forestTypeCodeNumber = code.slice(
        0,
        getFirstLetterIndex(code) || code.length,
      );
      const forestTypes = key.split(',');
      url = forestTypes.includes(forestTypeCodeNumber) && reliefMapping[key];
    }
  });
  return url;
};

function Relief({ code }) {
  const imageUrl = useMemo(() => getImageUrl(code), [code]);
  return (
    <>
      {imageUrl ? (
        <img
          src={getImageUrl(code)}
          alt={`${code}-relief`}
          className={styles.relief}
        />
      ) : (
        <NoData />
      )}
    </>
  );
}

Relief.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Relief;
