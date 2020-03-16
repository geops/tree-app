/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');

const types = require('../types.json');

console.log(`
  This script reads all geojson files in /data/nais/geojson/ and aggregate them
  into two files: /data/nais/ecograms.json & /data/nais/locations.json
`);

const abortScript = alert => {
  console.log(alert);
  process.exit(1);
};

const getCoords = (coordinates, coordIdx, index) => {
  const filteredCoords = coordinates.map(c => c[coordIdx].toFixed(3));

  const coordsArray = [];
  filteredCoords.forEach(f => {
    if (!coordsArray.includes(f)) {
      coordsArray.push(f);
    }
  });

  return coordsArray[index] < 0 ? 0 : coordsArray[index];
};

const aggregateGeojson = (dir, geojsonFiles) => {
  const newEcogramsJson = {};
  const newLocationsJson = {};

  geojsonFiles.forEach((filename, gIdx) => {
    const geojsonIdx = gIdx + 1;
    const { ext, name } = path.parse(filename);
    const filepath = path.resolve(dir, filename);
    console.log(`  Start formating ${name}${ext}`);
    const rawdata = fs.readFileSync(filepath);
    const geojson = JSON.parse(rawdata);

    const { forestEcoR, altZones } = geojson.features[0].properties;

    if (!altZones) {
      abortScript(`
      /!\\ 'altZones' property not present or badly formated
      in at least the first feature, to be converted to 'altitudinalZones' !
      `);
    }
    const altitudinalZones = {};
    altZones.split(',').forEach(zone => {
      const type = types.altitudinalZone.find(t => t.code === zone);
      if (!type) {
        console.log(`Altitudinal zone ${zone} not found! Skipping ...`);
        return;
      }
      altitudinalZones[zone] = geojsonIdx;
    });

    if (!forestEcoR) {
      abortScript(`
      /!\\ 'forestEcoR' property not present or badly formated
      in at least the first feature, to be converted to 'forestEcoregions' !
      `);
    }
    forestEcoR.split(',').forEach(region => {
      const type = types.forestEcoregion.find(t => t.code === region);
      if (!type) {
        console.log(`Forest ecoregion ${region} not found! Skipping ...`);
        return;
      }

      if (!newLocationsJson[region]) {
        newLocationsJson[region] = altitudinalZones;
      } else {
        const keys = Object.keys(altitudinalZones);
        keys.forEach(k => {
          newLocationsJson[region][k] = altitudinalZones[k];
        });
      }
    });

    const features = [];
    geojson.features.forEach(f => {
      const { z, forTypes, otforTypes } = f.properties;
      const { coordinates } = f.geometry;
      const [coords] = coordinates[0];
      // Remove last coord, which is the same as the first one.
      coords.splice(coords.length - 1, coords.length);

      const x1 = getCoords(coords, 0, 0);
      const x2 = getCoords(coords, 0, 1);
      const y1 = getCoords(coords, 1, 0);
      const y2 = getCoords(coords, 1, 1);

      const fT = forTypes ? forTypes.split(',') : [];
      const oT = otforTypes ? otforTypes.split(',') : [];

      features.push({
        x: x1 * 1000,
        y: 1000 - y1 * 1000 - (1000 - y1 * 1000 - (1000 - y2 * 1000)),
        w: x2 * 1000 - x1 * 1000,
        h: 1000 - y1 * 1000 - (1000 - y2 * 1000),
        z,
        f: [...fT, ...oT],
      });
    });

    newEcogramsJson[geojsonIdx] = features;
  });
  const outputDirectory = path.join(__dirname, `../`);
  // If no outputs folder, create it.
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  fs.writeFileSync(
    `${outputDirectory}/ecograms.json`,
    JSON.stringify(newEcogramsJson),
  );
  fs.writeFileSync(
    `${outputDirectory}/locations.json`,
    JSON.stringify(newLocationsJson),
  );

  console.log(`
  Building ecograms.json & locations.json successfuly!
  `);
};

const geojsonFiles = fs
  .readdirSync('data/nais/geojson/')
  .filter(fileName => /.geojson/.test(fileName));
aggregateGeojson('data/nais/geojson/', geojsonFiles);
