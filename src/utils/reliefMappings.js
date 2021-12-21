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

const reliefMappings = {
  lu,
};

export const getImageUrl = (code, activeProfile) => {
  const imageName = reliefMappings[activeProfile].find((string) => {
    const forestTypeCodeNumber = code.slice(
      0,
      getFirstLetterIndex(code) || code.length,
    );
    const forestTypes = string.split(',');
    return forestTypes.includes(forestTypeCodeNumber);
  });
  return imageName && `/images/${activeProfile}/relief/${imageName}.png`;
};

export default reliefMappings;
