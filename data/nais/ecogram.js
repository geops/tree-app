/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');

const types = require('../types.json');

console.log(`
  This script reads all geojson files in /data/nais/geojson/ and aggregate them
  into two files: /data/nais/ecograms.json & /data/nais/locations.json
`);

const abortScript = (alert) => {
  console.log(alert);
  process.exit(1);
};

function validate(type, list, abort = true) {
  if (!list) {
    abortScript(`List for ${type} missing!`);
  }

  list.forEach((code) => {
    if (!types[type].find((t) => t.code === code)) {
      const message = `Code ${code} for ${type} not valid!`;
      if (abort) {
        abortScript(message);
      } else {
        console.log(message);
      }
    }
  });
}

function writeJSON(filename, data) {
  const filepath = path.join(__dirname, '../', filename);
  fs.writeFileSync(filepath, JSON.stringify(data));
}

const aggregateEcograms = () => {
  const dir = 'data/nais/ecogram/';
  const ecograms = {};
  const locations = {};

  fs.readdirSync(dir).forEach((filename) => {
    console.log(`  Start aggregating ${filename}`);
    const id = parseInt(path.parse(filename).name, 10);
    const filepath = path.resolve(dir, filename);
    const rawdata = fs.readFileSync(filepath);
    const ecogram = JSON.parse(rawdata);

    const { forestEcoregions, altitudinalZones } = ecogram.properties || {};
    // TODO: remove the following variable once branch "hochmontan" is merged!
    const filteredAltitudinalZones = altitudinalZones.includes('80')
      ? [...altitudinalZones.filter((z) => z !== '80'), '81', '82', '83']
      : altitudinalZones;

    validate('forestEcoregion', forestEcoregions);
    validate('altitudinalZone', filteredAltitudinalZones);

    forestEcoregions.forEach((region) => {
      locations[region] = locations[region] || {};
      filteredAltitudinalZones.forEach((zone) => {
        locations[region][zone] = id;
      });
    });

    const boxes = [];
    ecogram.features.forEach((f) => {
      const forestTypes = f.properties.forestTypes.split(',') || [];
      const otherForestTypes = f.properties.otherForestTypes
        ? f.properties.otherForestTypes.split(',')
        : [];
      const [[x1, y1], , [x2, y2]] = f.geometry.coordinates[0][0];
      const height = 1000 - y1 * 1000 - (1000 - y2 * 1000);
      const ft = [...new Set([...forestTypes, ...otherForestTypes])];
      // TODO: abort in validation once all forestTypes are fixed!
      validate('forestType', ft, false);

      boxes.push({
        x: Math.round(x1 * 1000),
        y: Math.round(1000 - y1 * 1000 - height),
        w: Math.round(x2 * 1000 - x1 * 1000), // width
        h: Math.round(height),
        r: parseInt(f.properties.rows, 10),
        z: parseInt(f.properties.z, 10), // z-index
        f: ft,
      });
    });

    ecograms[id] = boxes;
  });

  writeJSON('ecograms.json', ecograms);
  writeJSON('locations.json', locations);
};

aggregateEcograms();
