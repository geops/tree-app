import {
  AltitudinalZoneCode,
  Location,
  ProjectOptionKey,
  SilverFirAreaCode,
  TreeAppProfile,
} from "../types";

import parseQueryResult from "./parseQueryResult";
import safeJsonParse from "./safeJsonParse";

export const primaryProjectionFields: ProjectOptionKey[] = [
  "forestEcoregion",
  "altitudinalZone",
  "forestType",
];
export const secondaryProjectionFields: ProjectOptionKey[] = [
  "slope",
  "additional",
  "silverFirArea",
  "relief",
];

export function getProfilePrefix(profile?: TreeAppProfile): string {
  return profile === "ch" ? "" : `${profile}_`;
}

export function uniqueConcat<T>(x: T[], y: T[]): T[] {
  // @ts-expect-error dev
  return Array.from(new Set((x || []).concat(y))).sort((a, b): number => a - b);
}

export const validateFieldValue = (
  field: string,
  value: Location[keyof Location],
  values: { code: string }[],
) => {
  if (value && values && values.find((v) => v.code === value) === undefined) {
    throw new Error(`${value as string} for ${field} is not valid.`);
  }
};

export const hochmontanAltitudinalZones = ["81", "82", "83"];

export const reduceHochmontanAz = (
  targetAltitudinalZone: AltitudinalZoneCode,
): AltitudinalZoneCode =>
  hochmontanAltitudinalZones.includes(targetAltitudinalZone)
    ? "80"
    : targetAltitudinalZone;

export const reduceHochmontanSilverFir = (
  targetAltitudinalZone?: AltitudinalZoneCode,
  silverFirArea?: string,
): SilverFirAreaCode | undefined => {
  if (!targetAltitudinalZone) return;
  return (
    hochmontanAltitudinalZones.includes(targetAltitudinalZone)
      ? targetAltitudinalZone.slice(1)
      : silverFirArea
  ) as SilverFirAreaCode;
};

export const reduceHochmontanLocation = (
  location: Location,
  targetAltitudinalZone: AltitudinalZoneCode,
): Location => ({
  ...location,
  altitudinalZone: reduceHochmontanAz(targetAltitudinalZone),
  silverFirArea: reduceHochmontanSilverFir(
    targetAltitudinalZone,
    location.silverFirArea,
  ),
});

export const sortOptions = (a: string, b: string) => {
  if (a === "unknown") return 1; // Place 'unknown' at the end
  if (b === "unknown") return -1; // Keep 'unknown' at the end
  return Number(a) - Number(b); // Sort numerically
};

const helpers = {
  parseQueryResult,
  primaryProjectionFields,
  reduceHochmontanAz,
  reduceHochmontanLocation,
  reduceHochmontanSilverFir,
  safeJsonParse,
  secondaryProjectionFields,
  uniqueConcat,
  validateFieldValue,
};

export default helpers;
