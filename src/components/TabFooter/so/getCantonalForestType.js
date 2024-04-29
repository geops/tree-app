import { info } from '@geops/tree-lib';

const getCantonalForestType = (
  code,
  profile,
  altitudinalZoneCode,
  filterAttribute = 'codeNaisFuture',
) => {
  if (!code) return null;
  let ftInfo;
  try {
    const ftInfos = info('forestType', undefined, profile)?.filter((ft) => {
      if (Array.isArray(ft[filterAttribute])) {
        return ft[filterAttribute].includes(code);
      }
      return ft[filterAttribute] === code
    });
    if (!altitudinalZoneCode) {
      [ftInfo] = ftInfos;
    } else {
      const altitudinalZone = info('altitudinalZone', altitudinalZoneCode);
      ftInfo = ftInfos?.find((ft) => ft.altitudinalZoneFuture === altitudinalZone?.de) || ftInfos[0];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`No forest type found for ${code} in ${profile}`, error);
  }
  return ftInfo;
};

export default getCantonalForestType;
