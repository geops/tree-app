import {
  AltitudinalZoneCode,
  Location,
  ProjectOptionKey,
  ProjectResult,
} from "../types";
import {
  reduceHochmontanAz,
  reduceHochmontanLocation,
  uniqueConcat,
  validateFieldValue,
} from "../utils";
import { secondaryProjectionFields as secondaryFields } from "../utils";

import TreeClient from "./";

function project(
  this: TreeClient,
  location: Location,
  targetAltitude?: AltitudinalZoneCode,
  previousResult: null | ProjectResult = null,
): ProjectResult {
  const altitudinalZones = this.getAltitudinalZones();
  const altitudeList = altitudinalZones
    .map((az) => az.code)
    .sort((a, b) => Number(b) - Number(a));
  const reducedTAZ = targetAltitude
    ? reduceHochmontanAz(targetAltitude)
    : targetAltitude;
  const reducedLocation = location.altitudinalZone
    ? reduceHochmontanLocation(location, location.altitudinalZone)
    : location;
  const altitudeIdx = altitudeList.indexOf(reducedLocation.altitudinalZone!);
  const targetAltitudeIdx = altitudeList.indexOf(reducedTAZ!);
  let result = previousResult ?? { options: {}, projections: [] };

  validateFieldValue("targetAltitudinalZone", reducedTAZ, altitudinalZones);

  const previous = result.projections?.slice(-1)[0];
  result = this.reduceProjections(
    reducedLocation,
    targetAltitudeIdx,
    result,
    altitudeList,
  );

  const last = result.projections?.slice(-1)[0];
  const lastAltitudeIdx = last && altitudeList.indexOf(last.altitudinalZone);

  if (previous && previous.altitudinalZone === last?.altitudinalZone) {
    // Could not find projection to targetAltitude
    result.projections = [];

    // Try to find projection using "unknown" for secondary fields.
    for (const secondaryField of secondaryFields) {
      if (reducedLocation[secondaryField] !== "unknown") {
        const secondaryLocation = {
          ...reducedLocation,
          [secondaryField]: "unknown",
        };
        result = this.project(secondaryLocation, reducedTAZ, result);
        break;
      }
    }
  } else if (lastAltitudeIdx && lastAltitudeIdx < targetAltitudeIdx) {
    result = this.project({ ...reducedLocation, ...last }, reducedTAZ, result);
  }

  if (result && reducedLocation.forestType && altitudeIdx !== -1) {
    result.options.targetAltitudinalZone = altitudeList.slice(altitudeIdx);
  }

  if (reducedLocation.transitionForestType) {
    const { transitionAltitudinalZone, transitionForestType, ...tl } =
      reducedLocation;
    tl.forestType = transitionForestType;
    tl.altitudinalZone = transitionAltitudinalZone ?? tl.altitudinalZone;
    // console.log("TRANSITION: ", this.reduceProjections(tl, targetAltitudeIdx, result, altitudeList));

    const transition = this.project(tl, reducedTAZ);
    const tp = transition.projections ?? [];
    Object.entries(transition.options).forEach(([k, v]) => {
      if (secondaryFields.includes(k as ProjectOptionKey)) {
        // @ts-expect-error dev
        result.options[k as ProjectOptionKey] = uniqueConcat<ProjectOptionKey>(
          // @ts-expect-error dev
          result.options[k as ProjectOptionKey] as unknown[],
          v as unknown[],
        );
      }
    });
    result.options.transitionForestType = transition.options.forestType;
    result.options.transitionAltitudinalZone =
      transition.options.altitudinalZone;
    result.projections = (result.projections ?? []).map((p) => {
      const i = tp.findIndex((t) => t.altitudinalZone === p.altitudinalZone);
      return { ...p, transitionForestType: tp[i]?.forestType };
    });
  }

  // if (result.options.forestType) {
  //   result.options.forestType = result.options.forestType;
  // }

  if (!previousResult && (result.projections ?? []).length === 0) {
    delete result.projections;
  }

  console.log("PROJECT RESULT", result);

  return result;
}

export default project;
