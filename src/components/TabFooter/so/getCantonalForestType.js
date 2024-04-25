import { info } from '@geops/tree-lib';

const getCantonalForestType = (
  naisForestTypeCode,
  profile,
  altitudinalZoneCode,
) => {
  if (!naisForestTypeCode) return null;
  let ftInfo;
  try {
    const ftInfos = info('forestType', undefined, profile)?.filter((ft) => ft.codeNaisFuture === naisForestTypeCode);
    if (!altitudinalZoneCode) {
      [ftInfo] = ftInfos;
    }
    const altitudinalZone = info('altitudinalZone', altitudinalZoneCode);
    ftInfo = ftInfos?.find((ft) => ft.altitudinalZoneFuture === altitudinalZone.de) || ftInfos[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`No forest type found for ${naisForestTypeCode} in ${profile}`, error);
  }
  return ftInfo;
};

export default getCantonalForestType;
