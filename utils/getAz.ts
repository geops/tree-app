import { reduceHochmontanAz } from "@geops/tree-lib";

import type { AltitudinalZoneCode } from "@geops/tree-lib/types";

function getAZ(altitudinalZone?: AltitudinalZoneCode) {
  return reduceHochmontanAz(altitudinalZone) as AltitudinalZoneCode;
}

export default getAZ;
