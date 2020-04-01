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
  let indicators = types.indicator;
  if (location.forestEcoregion) {
    indicators = indicators.filter(
      (i) => i.forestEcoregions && i.forestEcoregions.includes(forestEcoregion),
    );
    if (location.altitudinalZone) {
      forestTypes = forestTypes.filter(
        (ft) =>
          ft.altitudinalZoneForestEcoregion &&
          ft.altitudinalZoneForestEcoregion.filter(
            ([az, fe]) => az === altitudinalZone && fe === forestEcoregion,
          ).length > 0,
      );
    }
  }
  if (location.altitudinalZone) {
    indicators = indicators.filter(
      (i) => i.altitudinalZones && i.altitudinalZones.includes(altitudinalZone),
    );
  }
  if (location.indicators && location.indicators.length > 0) {
    const indicatorForestTypes = location.indicators
      .map((i) => types.indicator.find((it) => it.code === i).forestTypes)
      .reduce((ift, ft) => ift.concat(ft), []);
    forestTypes = forestTypes.filter((ft) =>
      indicatorForestTypes.includes(ft.code),
    );
  }
  if (location.forestTypeGroup) {
    forestTypes = forestTypes.filter(
      (ft) => ft.group[location.forestTypeGroup] === true,
    );
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
  forestTypes = forestTypes.map((ft) => ft.code);
  options.indicator = indicators.map((i) => i.code);

  if (ecogram) {
    ecogram = ecogram.map((e) => {
      const a = intersection(e.f, forestTypes).length > 0; // active
      return { ...e, a };
    });
  }

  return { ecogram, forestTypes, options };
}

export default locate;
