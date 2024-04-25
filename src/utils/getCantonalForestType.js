import { info } from '@geops/tree-lib';

const getCantonalForestType = (
  naisForestTypeCode,
  profile,
) => {
  if (!naisForestTypeCode) return null;
  let ftInfo;
  try {
    ftInfo = info('forestType', naisForestTypeCode, profile, 'codeNaisFuture');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`No forest type found for ${naisForestTypeCode} in ${profile}`, error);
  }
  return ftInfo;
};

export default getCantonalForestType;
