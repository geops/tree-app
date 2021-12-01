import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NoData from '../NoData';
import styles from '../ForestTypeDescription.module.css';
import { getFirstLetterIndex } from '../../../utils/sortForestTypes';

const getReliefMapping = (activeProfile) => ({
  '1,2': `/images/${activeProfile}/relief/1,2.png`,
  '6,7': `/images/${activeProfile}/relief/6,7.png`,
  8: `/images/${activeProfile}/relief/8.png`,
  '9,10,11': `/images/${activeProfile}/relief/9,10,11.png`,
  '12,13': `/images/${activeProfile}/relief/12,13.png`,
  '14,15,16': `/images/${activeProfile}/relief/14,15,16.png`,
  17: `/images/${activeProfile}/relief/17.png`,
  '18,19,20,21': `/images/${activeProfile}/relief/18,19,20,21.png`,
  '22,23,24': `/images/${activeProfile}/relief/22,23,24.png`,
  '26,27': `/images/${activeProfile}/relief/26,27.png`,
  '28,29,30,32': `/images/${activeProfile}/relief/28,29,30,32.png`,
  '44,45': `/images/${activeProfile}/relief/44,45.png`,
  46: `/images/${activeProfile}/relief/46.png`,
  48: `/images/${activeProfile}/relief/48.png`,
  '49,50': `/images/${activeProfile}/relief/49,50.png`,
  '53,56,57,60': `/images/${activeProfile}/relief/53,56,57,60.png`,
  '62,65': `/images/${activeProfile}/relief/62,65.png`,
  '67,69,70,71': `/images/${activeProfile}/relief/67,69,70,71.png`,
  AV: `images/${activeProfile}/relief/AV.png`,
});

const getImageUrl = (code, activeProfile) => {
  let url = null;
  const reliefMapping = getReliefMapping(activeProfile);
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
  const activeProfile = useSelector((state) => state.activeProfile);
  const imageUrl = useMemo(
    () => getImageUrl(code, activeProfile),
    [code, activeProfile],
  );
  return (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt={`${code}-relief`} className={styles.relief} />
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
