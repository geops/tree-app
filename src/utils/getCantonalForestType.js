import { info, utils } from '@geops/tree-lib';

const getCantonalForestTypes = (
  naisForestTypeCode,
  profile,
  isFuture = false,
) => {
  if (!naisForestTypeCode) return [];
  let ftMapping = null;
  try {
    const mapping = utils().getMapping('forestTypes', profile);
    ftMapping = isFuture ? mapping.future : mapping.current;
  } catch (error) {
    console.log(`No forest type mapping found for ${profile}`, error);
  }

  if (!ftMapping) return [];
  let cantonalForestTypes = [];
  if (ftMapping && ftMapping[naisForestTypeCode]) {
    const mappedFts = ftMapping[naisForestTypeCode];
    cantonalForestTypes = mappedFts.reduce((allFts, ft) => {
      let ftInfo;
      try {
        ftInfo = info('forestType', ft, profile);
      } catch (error) {
        console.log(`No forest type found for ${ft} in ${profile}`, error);
      }
      return ftInfo ? [...allFts, ftInfo] : [...allFts, { code: ft }];
    }, []);
  }
  return cantonalForestTypes;
};

export default getCantonalForestTypes;
