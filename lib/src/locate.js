import intersection from 'lodash.intersection';

import ecograms from '../data/ecograms.json';
import locations from '../data/locations.json';
import types from '../data/types.json';

function checkTreeLayerHeight(height) {
  return (ft) => ft.height && ft.height[0] <= height && ft.height[1] >= height;
}

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
  const { forestEcoregion, altitudinalZone } = location;
  let ecogram;
  if (locations[forestEcoregion]) {
    options.altitudinalZone = Object.keys(locations[forestEcoregion]);
    if (locations[forestEcoregion][altitudinalZone]) {
      const id = locations[forestEcoregion][altitudinalZone];
      ecogram = ecograms[id];
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
    const indicatorsFT = location.indicators
      .map((li) => types.indicator.find((it) => it.code === li).forestTypes)
      .reduce((ift, ft) => ift.concat(ft), []);
    forestTypes = forestTypes.filter((ft) => indicatorsFT.includes(ft.code));
  }
  if (location.treeTypes && location.treeTypes.length > 0) {
    const treeTypesFT = location.treeTypes
      .map((ltt) => types.treeType.find((ttt) => ttt.code === ltt).forestTypes)
      .reduce((ttft, ft) => ttft.concat(ft), []);
    forestTypes = forestTypes.filter((ft) => treeTypesFT.includes(ft.code));
  }
  if (location.treeLayerHeightMin) {
    forestTypes = forestTypes.filter(
      checkTreeLayerHeight(location.treeLayerHeightMin),
    );
  }
  if (location.treeLayerHeightMax) {
    forestTypes = forestTypes.filter(
      checkTreeLayerHeight(location.treeLayerHeightMax),
    );
  }
  if (location.coniferTreeHeightMax) {
    forestTypes = forestTypes.filter(
      (ft) => ft.height && ft.height[2] >= location.coniferTreeHeightMax,
    );
  }
  if (location.deciduousTreeHeightMax) {
    forestTypes = forestTypes.filter(
      (ft) => ft.height && ft.height[3] >= location.deciduousTreeHeightMax,
    );
  }
  if (location.carbonateFine) {
    forestTypes = forestTypes.filter((ft) => ft.carbonate[0] === true);
  }
  if (location.carbonateRock) {
    forestTypes = forestTypes.filter((ft) => ft.carbonate[1] === true);
  }
  if (location.geomorphologyRockBand) {
    forestTypes = forestTypes.filter((ft) => ft.geomorphology[0] === true);
  }
  if (location.geomorphologyBlockyRockyStrong) {
    forestTypes = forestTypes.filter((ft) => ft.geomorphology[1] === true);
  }
  if (location.geomorphologyBlockyRockyLittle) {
    forestTypes = forestTypes.filter((ft) => ft.geomorphology[2] === true);
  }
  if (location.geomorphologyLimestonePavement) {
    forestTypes = forestTypes.filter((ft) => ft.geomorphology[3] === true);
  }
  if (location.geomorphologyRocksModeratelyMoved) {
    forestTypes = forestTypes.filter((ft) => ft.geomorphology[4] === true);
  }
  if (location.geomorphologyRocksStronglyMoved) {
    forestTypes = forestTypes.filter((ft) => ft.geomorphology[5] === true);
  }
  if (location.geomorphologyRocksStabilised) {
    forestTypes = forestTypes.filter((ft) => ft.geomorphology[6] === true);
  }
  if (location.reliefTypeCentralSlope) {
    forestTypes = forestTypes.filter((ft) => ft.reliefType[0] === true);
  }
  if (location.reliefTypeHollow) {
    forestTypes = forestTypes.filter((ft) => ft.reliefType[1] === true);
  }
  if (location.reliefTypeDome) {
    forestTypes = forestTypes.filter((ft) => ft.reliefType[2] === true);
  }
  if (location.reliefTypePlateau) {
    forestTypes = forestTypes.filter((ft) => ft.reliefType[3] === true);
  }
  if (location.reliefTypeSteep) {
    forestTypes = forestTypes.filter((ft) => ft.reliefType[4] === true);
  }
  const allForestTypes = forestTypes.map((ft) => ft.code);
  const byForestTypes = (item) =>
    intersection(item.forestTypes, allForestTypes).length > 0;

  options.indicator = types.indicator.filter(byForestTypes).map((i) => i.code);
  options.treeType = types.treeType.filter(byForestTypes).map((tt) => tt.code);

  forestTypes = {
    main: forestTypes.filter((ft) => ft.group.main).map((ft) => ft.code),
    pioneer: forestTypes.filter((ft) => ft.group.pioneer).map((ft) => ft.code),
    special: forestTypes.filter((ft) => ft.group.special).map((ft) => ft.code),
    volatile: forestTypes.filter((ft) => ft.group.volatile).map((f) => f.code),
    riverside: forestTypes.filter((f) => f.group.riverside).map((f) => f.code),
  };
  if (ecogram) {
    ecogram = ecogram.map((e) => {
      const a = intersection(e.f, forestTypes.main).length > 0; // active
      return { ...e, a };
    });
  }

  return { ecogram, forestTypes, options };
}

export default locate;
