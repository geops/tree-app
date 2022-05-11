import mappings from './mappings';
import sortUtils from './sort';

const { getFirstLetterIndex } = sortUtils;

export const getMapping = (type, profile) => {
  if (!type || !profile) {
    throw new Error('type and profile need to be specified.');
  }
  let result = mappings[profile];
  if (!result) {
    throw new Error(`${profile} is not a valid profile for ${type}.`);
  }
  result = result[type];
  if (!result) {
    throw new Error(`${type} is not a valid type.`);
  }
  return result;
};

export const getReliefImageUrl = (code, profile) => {
  if (!code || !profile) {
    throw new Error('Code and profile need to be specified.');
  }
  const profileReliefMapping = getMapping('relief', profile);
  if (!profileReliefMapping) {
    throw new Error(`${profile} is not a valid profile for relief.`);
  }
  const imageName = profileReliefMapping.find((string) => {
    const forestTypeCodeNumber = code.slice(
      0,
      getFirstLetterIndex(code) || code.length,
    );
    const forestTypes = string.split(',');
    return forestTypes.includes(forestTypeCodeNumber);
  });
  return imageName && `/images/${profile}/relief/${imageName}.png`;
};

const utils = {
  getMapping,
  getReliefImageUrl,
};
export default utils;
