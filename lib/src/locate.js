import intersection from 'lodash.intersection';

import ecograms from '../data/ecograms.json';
import locations from '../data/locations.json';
import types from '../data/types.json';

const by12 = (value) => [1, 2].includes(value);
const by129 = (value) => [1, 2, 9].includes(value);

/**
 * This function tries to locate the forest type for a given location.
 *
 * @param {object} location The current location.
 * @returns {object} Includes ecogram, forest types and options.
 */
function locate(location = {}) {
  const options = {
    forestEcoregion: types.forestEcoregion.map((fe) => fe.code),
  };
  const { forestEcoregion, altitudinalZone, silverFirArea } = location;
  let ecogram;
  if (locations[forestEcoregion]) {
    options.altitudinalZone = Object.keys(locations[forestEcoregion]);
    if (locations[forestEcoregion][altitudinalZone]) {
      options.silverFirArea = Object.keys(
        locations[forestEcoregion][altitudinalZone],
      );
      const id =
        locations[forestEcoregion][altitudinalZone][silverFirArea] ||
        locations[forestEcoregion][altitudinalZone].unknown;
      if (id) {
        ecogram = ecograms[id];
      }
    }
  }

  let forestTypes = types.forestType;
  if (location.forestEcoregion && location.altitudinalZone) {
    forestTypes = forestTypes.filter(
      (ft) =>
        ft.altitudinalZoneForestEcoregion &&
        ft.altitudinalZoneForestEcoregion.filter(
          ([az, fe]) => az === altitudinalZone && fe === forestEcoregion,
        ).length > 0,
    );
  }
  if (location.indicators && location.indicators.length > 0) {
    const indicatorsForestTypes = location.indicators.map(
      (li) => types.indicator.find((it) => it.code === li).forestTypes,
    );
    forestTypes = forestTypes.filter((ft) =>
      indicatorsForestTypes.every((ift) => ift.includes(ft.code)),
    );
  }
  if (location.treeTypes && location.treeTypes.length > 0) {
    const treeTypesForestTypes = location.treeTypes.map(
      (ltt) => types.treeType.find((ttt) => ttt.code === ltt).forestTypes,
    );
    forestTypes = forestTypes.filter((ft) =>
      treeTypesForestTypes.every((ttft) => ttft.includes(ft.code)),
    );
  }
  if (location.coniferTreeHeightMax) {
    forestTypes = forestTypes.filter(
      (ft) => ft.height && ft.height[0] >= location.coniferTreeHeightMax,
    );
  }
  if (location.deciduousTreeHeightMax) {
    forestTypes = forestTypes.filter(
      (ft) => ft.height && ft.height[1] >= location.deciduousTreeHeightMax,
    );
  }
  if (location.carbonateFine) {
    forestTypes = forestTypes.filter((ft) => by129(ft.carbonate[0]));
  }
  if (location.carbonateRock) {
    forestTypes = forestTypes.filter((ft) => by129(ft.carbonate[1]));
  }
  if (location.geomorphologyRockBand) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology[0]));
  }
  if (location.geomorphologyBlockyRockyStrong) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology[1]));
  }
  if (location.geomorphologyBlockyRockyLittle) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology[2]));
  }
  if (location.geomorphologyLimestonePavement) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology[3]));
  }
  if (location.geomorphologyRocksModeratelyMoved) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology[4]));
  }
  if (location.geomorphologyRocksStronglyMoved) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology[5]));
  }
  if (location.geomorphologyRocksStabilised) {
    forestTypes = forestTypes.filter((ft) => by12(ft.geomorphology[6]));
  }
  if (location.reliefTypeCentralSlope) {
    forestTypes = forestTypes.filter((ft) => by12(ft.reliefType[0]));
  }
  if (location.reliefTypeHollow) {
    forestTypes = forestTypes.filter((ft) => by12(ft.reliefType[1]));
  }
  if (location.reliefTypeDome) {
    forestTypes = forestTypes.filter((ft) => by12(ft.reliefType[2]));
  }
  if (location.reliefTypePlateau) {
    forestTypes = forestTypes.filter((ft) => by12(ft.reliefType[3]));
  }
  if (location.reliefTypeSteep) {
    forestTypes = forestTypes.filter((ft) => by12(ft.reliefType[4]));
  }
  if (location.aspects) {
    forestTypes = forestTypes.filter(
      (ft) => intersection(ft.aspect, location.aspects).length > 0,
    );
  }
  if (location.slopes) {
    forestTypes = forestTypes.filter(
      (ft) => intersection(ft.slope, location.slopes).length > 0,
    );
  }
  if (location.groups) {
    forestTypes = forestTypes.filter((ft) =>
      location.groups.some((g) => ft.group[g]),
    );
  }
  const allForestTypes = forestTypes.map((ft) => ft.code);
  const byForestTypes = (item) =>
    intersection(item.forestTypes, allForestTypes).length > 0;

  options.indicator = types.indicator.filter(byForestTypes).map((i) => i.code);
  options.treeType = types.treeType.filter(byForestTypes).map((tt) => tt.code);

  const forestTypesByGroup = (group) =>
    !location.groups || location.groups.includes(group)
      ? forestTypes.filter((ft) => ft.group[group]).map((ft) => ft.code)
      : [];

  forestTypes = {
    main: forestTypesByGroup('main'),
    pioneer: forestTypesByGroup('pioneer'),
    special: forestTypesByGroup('special'),
    volatile: forestTypesByGroup('volatile'),
    riverside: forestTypesByGroup('riverside'),
  };
  if (ecogram && (!location.groups || location.groups.includes('main'))) {
    ecogram = ecogram.map((e) => {
      const a = intersection(e.f, forestTypes.main).length > 0; // active
      return { ...e, a };
    });
  }

  return { ecogram, forestTypes, options };
}

export default locate;
