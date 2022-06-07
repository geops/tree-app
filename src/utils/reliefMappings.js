import { getFirstLetterIndex } from './sortForestTypes';

const lu = [
  '1,2',
  '6,7',
  '8',
  '9,10,11',
  '12,13',
  '14,15,16',
  '17',
  '18,19,20,21',
  '22,23,24',
  '26,27',
  '28,29,30,32',
  '44,45',
  '46',
  '48',
  '49,50',
  '53,56,57,60',
  '62,65',
  '67,69,70,71',
  'AV',
];

const bl = [
  '1,6,7a(10a),7S(10a),9a,9w,10a,12e,14,15,16,18*',
  '7a',
  '7b,7a(9a),7S(9a),8a(12a),8a,8d',
  '7S,9a(11),27,27h,30,44',
  '8a(12e)',
  '8S',
  '11,12S,20,26,26h',
  '12a,12a(9a),12w,13a,13e,13h,13eh,17,18M,19,22,22C,25*',
  '29',
  '35A',
  '38',
  '39',
  '48',
  '61,62',
  '65',
];

const reliefMappings = {
  lu,
  bl,
};

/**
 * @param {string} code A valid forest type code
 * @param {string} activeProfile A valid tree-app profile with relief mapping
 * @param {boolean} trimCode Only uses the base code number when set to true (12a => 12)
 * @returns {string} image path
 */
export const getImageUrl = (code, activeProfile, trimCode = false) => {
  const imageName = reliefMappings[activeProfile].find((string) => {
    let forestTypeCodeNumber = code;
    if (trimCode) {
      forestTypeCodeNumber = code.slice(
        0,
        getFirstLetterIndex(code) || code.length,
      );
    }
    const forestTypes = string.split(',');
    return forestTypes.includes(forestTypeCodeNumber);
  });
  return imageName && `/images/${activeProfile}/relief/${imageName}.png`;
};

export default reliefMappings;
