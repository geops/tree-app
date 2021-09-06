import get from 'lodash.get';
import intersection from 'lodash.intersection';

import ecograms from '../data/ecograms.json';
import locations from '../data/locations.json';
import types from '../data/types.json';

const by12 = (value) => [1, 2].includes(value);

function byYesNoUnknown(value, condition) {
  if (condition === 'yes') {
    return by12(value);
  }
  if (condition === 'no') {
    return value === 0;
  }
  if (condition === 'unknown') {
    return value === 9;
  }

  return false;
}

const altitudinalZoneForestEcoregionLookup = {
  J: {
    20: '0.0',
    40: '0.1',
    50: '0.2',
    60: '0.3',
    80: '0.4',
  },
  M: {
    20: '1.0',
    40: '1.1',
    50: '1.2',
    60: '1.3',
    80: '1.4',
  },
  1: {
    20: '2.0',
    40: '2.1',
    50: '2.2',
    60: '2.3',
    80: '2.4',
    90: '2.5',
    100: '2.6',
  },
  '2a': {
    20: '3.0',
    40: '3.1',
    50: '3.2',
    60: '3.3',
    80: '3.4',
    90: '3.5',
    100: '3.6',
  },
  '2b': {
    20: '4.0',
    80: '4.1',
    90: '4.4',
    100: '4.5',
  },
  3: {
    80: '5.0',
    90: '5.1',
    100: '5.2',
  },
  4: {
    40: '6.0',
    80: '6.1',
    90: '6.2',
    100: '6.3',
  },
  '5a': {
    10: '7.0',
    20: '7.1',
    30: '7.2',
    70: '7.3',
    80: '7.4',
    90: '7.5',
    100: '7.6',
  },
  '5b': {
    10: '8.0',
    30: '8.1',
    70: '8.2',
    90: '8.3',
  },
  Me: {
    10: '9.0',
    30: '9.1',
  },
};
const aspectLookup = [
  '001-025',
  '026-050',
  '051-075',
  '076-100',
  '101-125',
  '126-150',
  '151-175',
  '176-200',
  '201-225',
  '226-250',
  '251-275',
  '276-300',
  '301-325',
  '326-350',
  '351-375',
  '376-400',
];
const slopeLookup = [
  '000-010',
  '010-025',
  '025-050',
  '050-075',
  '075-100',
  '100',
];

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
  if (forestEcoregion && altitudinalZone) {
    forestTypes = forestTypes.filter((ft) => {
      const altitudinalZoneForestEcoregion = get(
        ft.altitudinalZoneForestEcoregion,
        altitudinalZoneForestEcoregionLookup[forestEcoregion][altitudinalZone],
      );
      return by12(altitudinalZoneForestEcoregion);
    });
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
    forestTypes = forestTypes.filter((ft) =>
      byYesNoUnknown(ft.carbonate[0], location.carbonateFine),
    );
  }
  if (location.carbonateRock) {
    forestTypes = forestTypes.filter((ft) =>
      byYesNoUnknown(ft.carbonate[1], location.carbonateRock),
    );
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
    forestTypes = forestTypes.filter((ft) =>
      location.aspects.some((la) =>
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
      location.slopes.some((ls) =>
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
