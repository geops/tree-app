/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');

const types = require('../types.json');

console.log(`
  This script reads all geojson files in /data/ecogram/ and aggregate them
  into two files: /data/ecograms.json & /data/locations.json
`);

function validate(type, list, profile = 'ch', fallback = false) {
  if (!list) {
    throw new Error(`List for ${type} missing!`);
  }

  list.forEach((code) => {
    if (
      (!fallback && !types[profile][type].find((t) => t.code === code)) ||
      (fallback &&
        !types[profile][type].find((t) => t.code === code) &&
        !types.ch[type].find((t) => t.code === code))
    ) {
      throw new Error(`Code ${code} for ${profile}.${type} not valid!`);
    }
  });
}

function writeJSON(filename, data) {
  const filepath = path.join(__dirname, '../', filename);
  fs.writeFileSync(filepath, JSON.stringify(data));
}

const aggregateEcograms = (profile) => {
  const dir = `data/ecogram/${profile}`;
  locations[profile] = locations[profile] || {};
  ecograms[profile] = ecograms[profile] || {};

  fs.readdirSync(dir).forEach((filename) => {
    console.log(`  Start aggregating ${filename} for profile ${profile}`);
    const id = parseInt(path.parse(filename).name, 10);
    const filepath = path.resolve(dir, filename);
    const rawdata = fs.readFileSync(filepath);
    const ecogram = JSON.parse(rawdata);

    const { forestEcoregions, altitudinalZones, silverFirAreas } = {
      silverFirAreas: ['unknown'],
      ...ecogram.properties,
    };

    validate('forestEcoregion', forestEcoregions);
    validate('altitudinalZone', altitudinalZones);
    validate('silverFirArea', silverFirAreas);

    forestEcoregions.forEach((region) => {
      locations[profile][region] = locations[profile][region] || {};
      altitudinalZones.forEach((zone) => {
        locations[profile][region][zone] =
          locations[profile][region][zone] || {};
        silverFirAreas.forEach((silverFirArea) => {
          locations[profile][region][zone][silverFirArea] = id;
        });
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
      validate('forestType', ft, profile, true);

      boxes.push({
        x: Math.round(x1 * 1000),
        y: Math.round(1000 - y1 * 1000 - height),
        w: Math.round(x2 * 1000 - x1 * 1000), // width
        h: Math.round(height),
        r: parseInt(f.properties.rows, 10),
        ox: parseFloat(f.properties.offsetX),
        oy: parseFloat(f.properties.offsetY),
        z: parseInt(f.properties.z, 10), // z-index
        f: ft,
      });
    });

    ecograms[profile][id] = boxes;
  });
};

const ecograms = {};
const locations = {};
aggregateEcograms('ch');
aggregateEcograms('lu');

writeJSON('ecograms.json', ecograms);
writeJSON('locations.json', locations);
