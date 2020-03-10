import ecograms from '../data/ecograms.json';
import locations from '../data/locations.json';

/**
 * This function tries to locate the forest type for a given location.
 *
 * @param {object} location The current location.´
 * @returns {object} ...
 */
function locate(location = {}) {
  const { forestEcoregion, altitudinalZone } = location;
  let ecogram;
  if (
    locations[forestEcoregion] &&
    locations[forestEcoregion][altitudinalZone]
  ) {
    const id = locations[forestEcoregion][altitudinalZone];
    ecogram = ecograms[id];
  }
  return { ecogram };
}

export default locate;
