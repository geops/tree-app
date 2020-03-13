import ecograms from '../data/ecograms.json';
import locations from '../data/locations.json';

/**
 * This function tries to locate the forest type for a given location.
 *
 * @param {object} location The current location.´
 * @returns {object} ...
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
  return { ecogram, options };
}

export default locate;
