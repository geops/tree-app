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
  const options = { forestEcoregion: Object.keys(locations) };
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
  forestTypes = forestTypes.map((ft) => ft.code);

  if (ecogram) {
    ecogram = ecogram.map((e) => {
      const a = intersection(e.f, forestTypes).length > 0; // active
      return { ...e, a };
    });
  }

  return { ecogram, forestTypes, options };
}

export default locate;
