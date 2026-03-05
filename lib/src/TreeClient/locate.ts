/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import get from "lodash.get";
import intersection from "lodash.intersection";

import {
  AltitudinalZoneCode,
  Ecogram,
  ForestEcoregionCode,
  ForestType,
  LocateResult,
  Location,
  OneOrTwo,
  SilverFirAreaCode,
  TreeAppProfile,
  TreeLocationGroup,
  TypesRecord,
  YesNoUnknown,
} from "../types";
import { getProfilePrefix } from "../utils";
import {
  altitudinalZoneForestEcoregionLookup,
  aspectLookup,
  slopeLookup,
} from "../utils/lookups";

import TreeClient from ".";

const isTruthyNumberOrZero = (value: null | number | undefined) =>
  value !== null &&
  value !== undefined &&
  (!Number.isNaN(value) || value === 0);

const by12 = (value?: number): boolean => [1, 2].includes(value!);

function byYesNoUnknown(value?: number, condition?: YesNoUnknown): boolean {
  if (condition === "yes") {
    return by12(value);
  }
  if (condition === "no") {
    return value === 0;
  }
  if (condition === "unknown") {
    return value === 9;
  }

  return false;
}

/**
 * This function tries to locate the forest type for a given location.
 *
 * @param {object} location The current location.
 * @param {string} [profile] Profile code.
 * @returns {object} Includes ecogram, forest types and options.
 */
function locate(
  this: TreeClient,
  location: Location,
  profile: TreeAppProfile = "ch",
): LocateResult {
  const { data: locations } = this.executeQuery<{
    altitudinalzone: AltitudinalZoneCode;
    ecogramid?: number;
    forestecoregion: ForestEcoregionCode;
    profile: TreeAppProfile;
    silverfirarea: SilverFirAreaCode;
  }>(
    `select altitudinalzone, forestecoregion, silverfirarea, ecogramid from ${getProfilePrefix(profile)}locations where profile = '${profile}'`,
  );

  if (!locations?.length) {
    console.error(
      new Error(`No location or ecogram data for ${profile} profile`),
    );
  }

  const { data: forestEcoregionCodes } = this.executeQuery<{
    code: ForestEcoregionCode;
  }>("select code from forestecoregion");
  let ecogram: Ecogram[] = [];
  const options: {
    altitudinalZone?: AltitudinalZoneCode[];
    forestEcoregion: ForestEcoregionCode[];
    indicator?: string[];
    silverFirArea?: SilverFirAreaCode[];
    treeType?: string[];
  } = {
    forestEcoregion: forestEcoregionCodes.map((f) => f.code),
  };
  const { altitudinalZone, forestEcoregion, silverFirArea } = location;
  const locationsByFe = locations.filter(
    (l) => l.forestecoregion === forestEcoregion,
  );
  if (locationsByFe.length) {
    options.altitudinalZone = locationsByFe.map((lfe) => lfe.altitudinalzone);
    const locationsByAz = locationsByFe.filter(
      (lfe) => lfe.altitudinalzone === altitudinalZone,
    );
    if (locationsByAz.length) {
      options.silverFirArea = locationsByAz.map((lfeaz) => lfeaz.silverfirarea);
      const lfeazs =
        locationsByAz.find((lfeaz) => lfeaz.silverfirarea === silverFirArea) ??
        locationsByAz.find((lfeaz) => lfeaz.silverfirarea === "unknown");

      if (lfeazs?.ecogramid) {
        const { data: ecograms } = this.executeQuery<Ecogram>(
          `select * from ${getProfilePrefix(profile)}ecograms where id = ${lfeazs.ecogramid}`,
        );
        ecogram = ecograms;
      }
    }
  }

  let forestTypes = this.getTypes<ForestType>();
  if (forestEcoregion && altitudinalZone) {
    forestTypes = forestTypes.filter((ft) => {
      const altitudinalZoneForestEcoregion: OneOrTwo = get(
        ft.altitudinalzoneforestecoregion,
        altitudinalZoneForestEcoregionLookup[forestEcoregion][altitudinalZone]!,
      );
      return by12(altitudinalZoneForestEcoregion);
    });
  }

  const indicatorTableName = this.executeQuery<{ name: string }>(`SELECT name 
    FROM sqlite_master 
    WHERE type='table' AND name='${profile}_indicator';`)?.data?.[0]?.name || "indicator";
  const { data: indicators } = this.executeQuery<TypesRecord>(
    `select * from ${indicatorTableName}`,
  );
  if (location.indicators && location.indicators.length > 0) {
    const indicatorsForestTypes = location.indicators.map(
      (li) => indicators?.find((it) => it.code === li)?.foresttypes,
    );
    forestTypes = forestTypes.filter((ft) =>
      indicatorsForestTypes.every((ift) => ift?.includes(ft.code)),
    );
  }

  const treeTypeTableName = this.executeQuery<{ name: string }>(`SELECT name 
    FROM sqlite_master 
    WHERE type='table' AND name='${profile}_treetype';`)?.data?.[0]?.name || "treetype";
  const { data: treeTypes } = this.executeQuery<TypesRecord>(
    `select * from ${treeTypeTableName}`,
  );
  if (location.treeTypes && location.treeTypes.length > 0) {
    const treeTypesForestTypes = location.treeTypes.map(
      (ltt) => treeTypes.find((ttt) => ttt.code === ltt)?.foresttypes,
    );
    forestTypes = forestTypes.filter((ft) =>
      treeTypesForestTypes.every((ttft) => ttft?.includes(ft.code)),
    );
  }
  if (location.coniferTreeHeightMax) {
    forestTypes = forestTypes.filter(
      (ft) =>
        ft.height &&
        location.coniferTreeHeightMax &&
        ft.height[0] >= location.coniferTreeHeightMax,
    );
  }
  if (location.deciduousTreeHeightMax) {
    forestTypes = forestTypes.filter(
      (ft) =>
        ft.height &&
        location.deciduousTreeHeightMax &&
        ft.height[1] >= location.deciduousTreeHeightMax,
    );
  }
  if (location.carbonateFine) {
    forestTypes = forestTypes.filter(
      (ft) =>
        isTruthyNumberOrZero(ft.carbonate?.[0]) &&
        byYesNoUnknown(ft.carbonate?.[0], location.carbonateFine),
    );
  }
  if (location.carbonateRock) {
    forestTypes = forestTypes.filter(
      (ft) =>
        isTruthyNumberOrZero(ft?.carbonate?.[1]) &&
        byYesNoUnknown(ft?.carbonate?.[1], location.carbonateRock),
    );
  }
  if (location.geomorphologyRockBand) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology?.[0]));
  }
  if (location.geomorphologyBlockyRockyStrong) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology?.[1]));
  }
  if (location.geomorphologyBlockyRockyLittle) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology?.[2]));
  }
  if (location.geomorphologyLimestonePavement) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology?.[3]));
  }
  if (location.geomorphologyRocksModeratelyMoved) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology?.[4]));
  }
  if (location.geomorphologyRocksStronglyMoved) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology?.[5]));
  }
  if (location.geomorphologyRocksStabilised) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology?.[6]));
  }
  if (location.reliefTypeCentralSlope) {
    forestTypes = forestTypes.filter((ft) => by12(ft.relieftype?.[0]));
  }
  if (location.reliefTypeHollow) {
    forestTypes = forestTypes.filter((ft) => by12(ft.relieftype?.[1]));
  }
  if (location.reliefTypeDome) {
    forestTypes = forestTypes.filter((ft) => by12(ft.relieftype?.[2]));
  }
  if (location.reliefTypePlateau) {
    forestTypes = forestTypes.filter((ft) => by12(ft.relieftype?.[3]));
  }
  if (location.reliefTypeSteep) {
    forestTypes = forestTypes.filter((ft) => by12(ft.relieftype?.[4]));
  }
  if (location.aspects) {
    forestTypes = forestTypes.filter((ft) =>
      location.aspects?.some((la) =>
        by12(
          get(
            ft.aspect,
            aspectLookup.findIndex((al) => al === la),
          ),
        ),
      ),
    );
  }
  if (location.slopes) {
    forestTypes = forestTypes.filter((ft) =>
      location.slopes?.some((ls) =>
        by12(
          get(
            ft.slope,
            slopeLookup.findIndex((sl) => sl === ls),
          ),
        ),
      ),
    );
  }
  if (location.groups) {
    forestTypes = forestTypes.filter((ft) =>
      location.groups?.some((g: TreeLocationGroup) => ft[`group_${g}`]),
    );
  }
  const allForestTypes = forestTypes.map((ft) => ft.code);
  const byForestTypes = (item: TypesRecord) =>
    intersection(item.foresttypes, allForestTypes).length > 0;

  options.indicator = indicators.filter(byForestTypes).map((i) => i.code);
  options.treeType = treeTypes.filter(byForestTypes).map((tt) => tt.code);

  const getForestTypesByGroup = (group: TreeLocationGroup) =>
    !location.groups || location.groups.includes(group)
      ? forestTypes.filter((ft) => ft[`group_${group}`]).map((ft) => ft.code)
      : [];

  const forestTypesByGroup = {
    main: getForestTypesByGroup("main"),
    pioneer: getForestTypesByGroup("pioneer"),
    riverside: getForestTypesByGroup("riverside"),
    special: getForestTypesByGroup("special"),
    volatile: getForestTypesByGroup("volatile"),
  };
  if (
    ecogram?.length &&
    (!location.groups || location.groups.includes("main"))
  ) {
    ecogram = ecogram.map((e) => {
      const a = intersection(e.foresttypes, forestTypesByGroup.main).length > 0; // active
      return { ...e, a };
    });
  }

  return {
    ecogram: ecogram?.length ? ecogram : [],
    forestTypes: forestTypesByGroup,
    options,
  } as LocateResult;
}

export default locate;
